// ClearPath AI - Translation API Route
// Translates an existing AnalysisResult into a target language using IBM watsonx.ai.
// Does NOT re-analyze the document. Only translates already-generated text fields.

import { NextRequest, NextResponse } from 'next/server';
import { isWatsonxConfigured } from '@/lib/watsonx';
import { AnalysisResult, Language } from '@/lib/types';

// ---------------------------------------------------------------------------
// Configuration — same env vars as the analyze route, no new secrets
// ---------------------------------------------------------------------------
const WATSONX_CONFIG = {
  url: process.env.WATSONX_URL || '',
  projectId: process.env.WATSONX_PROJECT_ID || '',
  apiKey: process.env.WATSONX_API_KEY || '',
  modelId: process.env.WATSONX_MODEL_ID || 'llama-3-3-70b-instruct',
};

const LANGUAGE_NAMES: Record<Exclude<Language, 'en'>, string> = {
  ar: 'Arabic',
  fr: 'French',
  es: 'Spanish',
};

// ---------------------------------------------------------------------------
// IAM token helper — mirrors lib/watsonx.ts pattern exactly
// ---------------------------------------------------------------------------
async function getIAMToken(): Promise<string> {
  const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${WATSONX_CONFIG.apiKey}`,
  });

  if (!response.ok) {
    throw new Error(`Failed to get IAM token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// ---------------------------------------------------------------------------
// JSON parser — same balanced-brace extraction used in lib/watsonx.ts
// ---------------------------------------------------------------------------
function parseJSON(text: string): unknown {
  let cleaned = text.trim();

  if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.substring(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // fall through to brace extraction
  }

  const firstBrace = cleaned.indexOf('{');
  if (firstBrace === -1) throw new Error('No JSON object found in translation response');

  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let jsonEnd = -1;

  for (let i = firstBrace; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (char === '\\') { escapeNext = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (!inString) {
      if (char === '{') braceCount++;
      else if (char === '}') {
        braceCount--;
        if (braceCount === 0) { jsonEnd = i + 1; break; }
      }
    }
  }

  if (jsonEnd === -1) throw new Error('Incomplete JSON object in translation response');
  return JSON.parse(cleaned.substring(firstBrace, jsonEnd));
}

// ---------------------------------------------------------------------------
// Build prompts
// ---------------------------------------------------------------------------
const TRANSLATION_SYSTEM_PROMPT = `You are a professional translator assisting immigrants, students, and families in understanding important documents. Your job is to translate an existing action plan faithfully into the target language.

Rules you must follow:
- Translate faithfully. Do not add new facts, warnings, deadlines, or advice.
- Do not add legal, immigration, medical, or financial advice.
- Preserve all dates, numbers, names, risk labels, and proper nouns exactly.
- Do not change the meaning or intent of any item.
- Return valid JSON matching the exact structure provided. Do not add or remove keys.
- Do not wrap the JSON in markdown code fences.`;

function buildTranslationPrompt(analysisResult: AnalysisResult, languageName: string): string {
  return `Translate the following JSON action plan into ${languageName}.

Translate ONLY these string fields:
- summary
- deadlines[].description
- actions[].action
- documentsNeeded[] (each string)
- checklist[].step
- checklist[].notes (if present)
- draftReply.subject
- draftReply.body
- simplerExplanation
- ultraSimpleExplanation (if present)
- riskExplanation

Do NOT translate or modify:
- riskLevel (keep the exact English value: "low", "medium", or "high")
- draftReply.tone
- deadlines[].date
- deadlines[].daysUntil
- deadlines[].importance
- actions[].priority
- actions[].deadline
- actions[].estimatedTime
- checklist[].completed
- language field

Return the full JSON object with the same structure, same keys, only the above string fields translated into ${languageName}.

JSON to translate:
${JSON.stringify(analysisResult)}`;
}

// ---------------------------------------------------------------------------
// watsonx API call
// ---------------------------------------------------------------------------
async function callWatsonxTranslate(prompt: string): Promise<string> {
  const token = await getIAMToken();

  const modelId = WATSONX_CONFIG.modelId.includes('/')
    ? WATSONX_CONFIG.modelId
    : `meta-llama/${WATSONX_CONFIG.modelId}`;

  const requestBody = {
    input: `${TRANSLATION_SYSTEM_PROMPT}\n\n${prompt}`,
    parameters: {
      decoding_method: 'greedy',
      max_new_tokens: 3000,
      min_new_tokens: 0,
      stop_sequences: [],
      repetition_penalty: 1.0,
    },
    model_id: modelId,
    project_id: WATSONX_CONFIG.projectId,
  };

  const response = await fetch(
    `${WATSONX_CONFIG.url}/ml/v1/text/generation?version=2023-05-29`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`watsonx API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.results[0].generated_text;
}

// ---------------------------------------------------------------------------
// Validate the translated result preserves required AnalysisResult shape.
// Non-translatable fields are restored from the original to be safe.
// ---------------------------------------------------------------------------
function mergeTranslated(original: AnalysisResult, translated: any): AnalysisResult {
  // Always restore non-translatable scalar fields from original
  translated.riskLevel = original.riskLevel;
  translated.language = original.language;

  // Restore non-translatable deadline fields
  if (Array.isArray(translated.deadlines) && Array.isArray(original.deadlines)) {
    translated.deadlines = translated.deadlines.map((d: any, i: number) => ({
      ...d,
      date: original.deadlines[i]?.date ?? d.date,
      daysUntil: original.deadlines[i]?.daysUntil ?? d.daysUntil,
      importance: original.deadlines[i]?.importance ?? d.importance,
    }));
  } else {
    translated.deadlines = original.deadlines;
  }

  // Restore non-translatable action fields
  if (Array.isArray(translated.actions) && Array.isArray(original.actions)) {
    translated.actions = translated.actions.map((a: any, i: number) => ({
      ...a,
      priority: original.actions[i]?.priority ?? a.priority,
      deadline: original.actions[i]?.deadline ?? a.deadline,
      estimatedTime: original.actions[i]?.estimatedTime ?? a.estimatedTime,
    }));
  } else {
    translated.actions = original.actions;
  }

  // Restore non-translatable checklist fields
  if (Array.isArray(translated.checklist) && Array.isArray(original.checklist)) {
    translated.checklist = translated.checklist.map((c: any, i: number) => ({
      ...c,
      completed: original.checklist[i]?.completed ?? c.completed,
    }));
  } else {
    translated.checklist = original.checklist;
  }

  // Restore draftReply.tone
  if (translated.draftReply && typeof translated.draftReply === 'object') {
    translated.draftReply.tone = original.draftReply.tone;
  } else {
    translated.draftReply = original.draftReply;
  }

  // Ensure required string fields exist
  if (!translated.summary) translated.summary = original.summary;
  if (!translated.riskExplanation) translated.riskExplanation = original.riskExplanation;
  if (!translated.simplerExplanation) translated.simplerExplanation = original.simplerExplanation;
  if (!Array.isArray(translated.documentsNeeded)) translated.documentsNeeded = original.documentsNeeded;

  return translated as AnalysisResult;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analysisResult, targetLanguage } = body;

    // Validate inputs
    if (!analysisResult || typeof analysisResult !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid input: analysisResult is required.' },
        { status: 400 }
      );
    }

    if (!targetLanguage || typeof targetLanguage !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid input: targetLanguage is required.' },
        { status: 400 }
      );
    }

    // Reject English — it's a no-op
    if (targetLanguage === 'en') {
      return NextResponse.json(
        { success: false, error: 'targetLanguage "en" is not valid for translation.' },
        { status: 400 }
      );
    }

    // Validate language is supported
    if (!['ar', 'fr', 'es'].includes(targetLanguage)) {
      return NextResponse.json(
        { success: false, error: `Unsupported targetLanguage: ${targetLanguage}` },
        { status: 400 }
      );
    }

    // Check watsonx is configured
    if (!isWatsonxConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Translation is not available — AI is not configured.' },
        { status: 503 }
      );
    }

    const languageName = LANGUAGE_NAMES[targetLanguage as Exclude<Language, 'en'>];

    console.log(`Translating action plan into ${languageName}...`);

    const prompt = buildTranslationPrompt(analysisResult as AnalysisResult, languageName);
    const rawResponse = await callWatsonxTranslate(prompt);

    console.log('Translation response preview:', rawResponse.substring(0, 500));

    const parsed = parseJSON(rawResponse);
    const translatedResult = mergeTranslated(analysisResult as AnalysisResult, parsed);

    return NextResponse.json({
      success: true,
      translatedResult,
      language: languageName,
    });
  } catch (error) {
    console.error('Translation failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Translation failed. Showing original English result.',
      },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Reject non-POST methods
// ---------------------------------------------------------------------------
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to translate.' },
    { status: 405 }
  );
}

// Made with Bob
