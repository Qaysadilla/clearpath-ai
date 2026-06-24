// ClearPath AI - IBM watsonx.ai Integration
// This file handles all communication with watsonx.ai API

import { AnalysisResult } from './types';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE, detectSensitiveTopics, SAFETY_DISCLAIMERS } from './prompts';

// watsonx.ai configuration from environment variables
const WATSONX_CONFIG = {
  url: process.env.WATSONX_URL || '',
  projectId: process.env.WATSONX_PROJECT_ID || '',
  apiKey: process.env.WATSONX_API_KEY || '',
  modelId: process.env.WATSONX_MODEL_ID || 'llama-3-3-70b-instruct'
};

// Check if watsonx is configured
export function isWatsonxConfigured(): boolean {
  return !!(WATSONX_CONFIG.url && WATSONX_CONFIG.projectId && WATSONX_CONFIG.apiKey);
}

// Get IBM Cloud IAM token
async function getIAMToken(): Promise<string> {
  const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${WATSONX_CONFIG.apiKey}`
  });

  if (!response.ok) {
    throw new Error(`Failed to get IAM token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Call watsonx.ai API with retry logic
async function callWatsonxAPI(prompt: string, retries = 2): Promise<string> {
  const token = await getIAMToken();
  
  // Add meta-llama/ prefix if not already present
  const modelId = WATSONX_CONFIG.modelId.includes('/')
    ? WATSONX_CONFIG.modelId
    : `meta-llama/${WATSONX_CONFIG.modelId}`;
  
  const requestBody = {
    input: `${SYSTEM_PROMPT}\n\n${prompt}`,
    parameters: {
      decoding_method: 'greedy',
      max_new_tokens: 2000,
      min_new_tokens: 0,
      stop_sequences: [],
      repetition_penalty: 1.0
    },
    model_id: modelId,
    project_id: WATSONX_CONFIG.projectId
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${WATSONX_CONFIG.url}/ml/v1/text/generation?version=2023-05-29`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`watsonx API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const rawResponse = data.results[0].generated_text;
      
      // Safe debug logging (first 500 chars only, no secrets)
      console.log('watsonx raw response preview:', rawResponse.substring(0, 500));
      
      return rawResponse;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }

  throw new Error('Failed after all retries');
}

// Parse JSON from watsonx response with balanced-brace extraction
function parseWatsonxJSON(text: string): any {
  let cleaned = text.trim();
  
  // Step 1: Remove markdown code fences if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  cleaned = cleaned.trim();
  
  // Step 2: Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch (directError) {
    // Continue to extraction
  }
  
  // Step 3: Extract first complete JSON object using balanced braces
  const firstBrace = cleaned.indexOf('{');
  if (firstBrace === -1) {
    console.error('No opening brace found. First 500 chars:', cleaned.substring(0, 500));
    throw new Error('No JSON object found in response');
  }
  
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let jsonEnd = -1;
  
  for (let i = firstBrace; i < cleaned.length; i++) {
    const char = cleaned[i];
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    if (char === '"') {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          jsonEnd = i + 1;
          break;
        }
      }
    }
  }
  
  if (jsonEnd === -1) {
    console.error('No complete JSON object found. First 500 chars:', cleaned.substring(0, 500));
    throw new Error('Incomplete JSON object in response');
  }
  
  const jsonCandidate = cleaned.substring(firstBrace, jsonEnd);
  console.log('Extracted JSON candidate (first 500 chars):', jsonCandidate.substring(0, 500));
  
  // Step 4: Parse the extracted JSON
  try {
    return JSON.parse(jsonCandidate);
  } catch (parseError) {
    console.error('JSON parse failed. Candidate (first 500 chars):', jsonCandidate.substring(0, 500));
    throw new Error('Could not parse extracted JSON from watsonx response');
  }
}

// Validate that the response matches AnalysisResult structure
function validateAnalysisResult(data: any): AnalysisResult {
  // Check required fields
  if (!data.summary || typeof data.summary !== 'string') {
    throw new Error('Invalid or missing summary');
  }
  
  if (!Array.isArray(data.deadlines)) {
    data.deadlines = [];
  }
  
  if (!Array.isArray(data.actions)) {
    data.actions = [];
  }
  
  if (!Array.isArray(data.documentsNeeded)) {
    data.documentsNeeded = [];
  }
  
  if (!['low', 'medium', 'high'].includes(data.riskLevel)) {
    data.riskLevel = 'medium';
  }
  
  if (!data.riskExplanation) {
    data.riskExplanation = 'Risk level assessment based on document content.';
  }
  
  if (!Array.isArray(data.checklist)) {
    data.checklist = [];
  }
  
  if (!data.draftReply || typeof data.draftReply !== 'object') {
    data.draftReply = {
      subject: 'Response',
      body: 'Please review the document and respond accordingly.',
      tone: 'professional'
    };
  }
  
  if (!data.simplerExplanation) {
    data.simplerExplanation = data.summary;
  }
  
  return data as AnalysisResult;
}

// Add safety disclaimers based on document content
export function addSafetyDisclaimer(
  result: AnalysisResult,
  documentText: string
): AnalysisResult {
  const topics = detectSensitiveTopics(documentText);
  
  // Add disclaimers to summary and simpler explanation
  topics.forEach(topic => {
    const disclaimer = SAFETY_DISCLAIMERS[topic as keyof typeof SAFETY_DISCLAIMERS];
    if (disclaimer) {
      result.summary += disclaimer;
      result.simplerExplanation += disclaimer;
      if (result.ultraSimpleExplanation) {
        result.ultraSimpleExplanation += disclaimer;
      }
    }
  });
  
  return result;
}

// Main function to analyze document with watsonx.ai
export async function analyzeWithWatsonx(documentText: string): Promise<AnalysisResult> {
  if (!isWatsonxConfigured()) {
    throw new Error('watsonx.ai is not configured');
  }
  
  // Truncate document if too long
  const maxLength = parseInt(process.env.MAX_DOCUMENT_LENGTH || '5000');
  const truncatedText = documentText.length > maxLength 
    ? documentText.substring(0, maxLength) + '...[truncated]'
    : documentText;
  
  // Generate prompt
  const userPrompt = USER_PROMPT_TEMPLATE(truncatedText);
  
  // Call watsonx API
  const rawResponse = await callWatsonxAPI(userPrompt);
  
  // Parse JSON
  const parsed = parseWatsonxJSON(rawResponse);
  
  // Validate structure
  const validated = validateAnalysisResult(parsed);
  
  // Add safety disclaimers
  const safe = addSafetyDisclaimer(validated, documentText);
  
  return safe;
}

// Made with Bob