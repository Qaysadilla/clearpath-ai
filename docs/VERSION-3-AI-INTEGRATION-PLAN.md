# ClearPath AI - Version 3: Real AI Integration Plan

**Status**: Planning Phase  
**Target**: Replace mock analysis with IBM watsonx.ai  
**Priority**: Keep UI intact, maintain demo mode, add safety rules

---

## 1. RECOMMENDED AI INTEGRATION APPROACH

### Primary Strategy: IBM watsonx.ai with Granite Model

**Why IBM watsonx.ai?**
- ✅ Enterprise-grade AI platform
- ✅ IBM Granite models optimized for business tasks
- ✅ Strong JSON output capabilities
- ✅ Built-in safety and governance features
- ✅ Excellent for structured data extraction
- ✅ Aligns with hackathon sponsor requirements

**Model Selection**:
- **Primary**: `ibm/granite-3-8b-instruct` (newer, faster, better structured output)
- **Fallback**: `ibm/granite-13b-chat-v2` (more capable for complex documents)
- **Alternative**: `meta-llama/llama-3-70b-instruct` (if Granite unavailable)

**Architecture Pattern**:
```
User Input → Next.js API Route → watsonx.ai API → Structured JSON → UI Display
                ↓ (if error)
            Mock Data Fallback
```

---

## 2. REQUIRED ACCOUNTS & CREDENTIALS

### IBM Cloud Setup (Free Tier Available)

**Step 1: Create IBM Cloud Account**
- URL: https://cloud.ibm.com/registration
- Free tier includes: 25,000 tokens/month for watsonx.ai
- No credit card required for trial

**Step 2: Create watsonx.ai Instance**
1. Log into IBM Cloud Console
2. Navigate to Catalog → AI/Machine Learning
3. Select "watsonx.ai"
4. Choose "Lite" plan (free)
5. Create instance in Dallas region (recommended)

**Step 3: Get API Credentials**
1. Open watsonx.ai instance
2. Go to "Credentials" or "Service Credentials"
3. Create new credential
4. Copy these values:
   - **API Key**: `your-api-key-here`
   - **Project ID**: `your-project-id-here`
   - **Region**: `us-south` (or your chosen region)

**Step 4: Get Model Access**
1. In watsonx.ai, go to "Foundation Models"
2. Request access to Granite models
3. Wait for approval (usually instant for free tier)

### Environment Variables Needed

Create `.env.local` file:
```bash
# IBM watsonx.ai Configuration
WATSONX_API_KEY=your-api-key-here
WATSONX_PROJECT_ID=your-project-id-here
WATSONX_REGION=us-south

# Optional: Feature Flags
ENABLE_AI_MODE=true
ENABLE_MOCK_FALLBACK=true
MAX_DOCUMENT_LENGTH=5000
```

**Security Notes**:
- ✅ `.env.local` is already in `.gitignore`
- ✅ Never commit API keys to repository
- ✅ Use Vercel environment variables for production
- ✅ Rotate keys if accidentally exposed

---

## 3. FILES THAT NEED TO CHANGE

### New Files to Create

**`lib/watsonx.ts`** - IBM watsonx.ai client
```typescript
// Purpose: Handle all watsonx.ai API communication
// Exports: analyzeDocument(), testConnection()
// Dependencies: fetch API, environment variables
```

**`lib/prompts.ts`** - AI prompt templates
```typescript
// Purpose: Store structured prompts with safety rules
// Exports: buildAnalysisPrompt(), safetyRules
// Features: JSON schema, safety guidelines, examples
```

**`app/api/analyze/route.ts`** - API endpoint
```typescript
// Purpose: Handle document analysis requests
// Method: POST
// Input: { documentText: string, useMock?: boolean }
// Output: AnalysisResult JSON
```

**`.env.local`** - Environment configuration
```bash
# Purpose: Store API credentials locally
# Note: Not committed to git
```

**`.env.example`** - Template for environment variables
```bash
# Purpose: Show required environment variables
# Note: Committed to git (no actual values)
```

### Files to Modify

**`app/page.tsx`** (Lines 159-172)
- **Current**: Calls `getMockResult()` directly
- **Change**: Call API route `/api/analyze` instead
- **Fallback**: Keep mock mode as option
- **Impact**: Minimal - just change the analysis function

**`package.json`** (Dependencies section)
- **Add**: No new dependencies needed! (using native fetch)
- **Optional**: Add `zod` for validation (recommended)

**`lib/types.ts`** (Add new types)
- **Add**: `ApiRequest`, `ApiResponse`, `ApiError` types
- **Impact**: Minimal - just type definitions

**`components/DocumentInput.tsx`** (Optional)
- **Add**: Toggle for "Demo Mode" vs "AI Mode"
- **Impact**: Optional enhancement for testing

**`README.md`**
- **Add**: Setup instructions for IBM credentials
- **Add**: Environment variable documentation

### Files That Stay the Same

✅ **All UI Components** - No changes needed!
- `components/ResultsDisplay.tsx`
- `components/SummarySection.tsx`
- `components/DeadlinesSection.tsx`
- `components/ActionsSection.tsx`
- `components/DocumentsSection.tsx`
- `components/RiskBadge.tsx`
- `components/ChecklistSection.tsx`
- `components/DraftReplySection.tsx`
- `components/SimplerExplanation.tsx`

✅ **`lib/mockData.ts`** - Keep as fallback
✅ **`lib/types.ts`** - Core types unchanged
✅ **All styling files** - No changes needed

---

## 4. API ROUTE DESIGN

### Endpoint: POST /api/analyze

**Request Schema**:
```typescript
{
  documentText: string;        // Required, max 5000 chars
  useMock?: boolean;           // Optional, force mock mode
  language?: 'en' | 'ar' | 'fr' | 'es';  // Optional, future use
}
```

**Response Schema** (Success):
```typescript
{
  success: true;
  data: AnalysisResult;        // Same structure as mock data
  metadata: {
    processingTime: number;    // Milliseconds
    model: string;             // e.g., "granite-3-8b-instruct"
    tokensUsed: number;        // For monitoring
    mode: 'ai' | 'mock';       // Which mode was used
  }
}
```

**Response Schema** (Error):
```typescript
{
  success: false;
  error: {
    code: string;              // e.g., "RATE_LIMIT_EXCEEDED"
    message: string;           // User-friendly message
    details?: any;             // Technical details (dev only)
  },
  fallbackData?: AnalysisResult;  // Mock data if available
}
```

### Error Handling Strategy

**Error Types**:
1. **Input Validation** → Return 400 with clear message
2. **API Key Missing** → Return 500, use mock fallback
3. **Rate Limit** → Return 429, use mock fallback
4. **Network Error** → Retry 2x, then use mock fallback
5. **Invalid JSON** → Parse with fallback, log error
6. **Timeout** → Return 504, use mock fallback

**Fallback Chain**:
```
1. Try watsonx.ai API
   ↓ (if fails)
2. Try alternative model
   ↓ (if fails)
3. Use mock data based on document type
   ↓ (if fails)
4. Return generic mock result
```

---

## 5. PROMPT DESIGN

### Master Prompt Template

```typescript
const SYSTEM_PROMPT = `You are ClearPath AI, an assistant that helps people understand confusing documents.

Your task is to analyze documents and extract actionable information in a structured format.

CRITICAL SAFETY RULES:
1. NEVER provide legal advice - only explain what the document says
2. NEVER provide medical advice - only summarize medical information
3. NEVER provide immigration advice - only explain requirements
4. NEVER provide financial advice - only explain financial information
5. Always recommend consulting professionals for legal/medical/financial matters
6. If document contains sensitive topics, acknowledge limitations clearly

OUTPUT REQUIREMENTS:
- Return ONLY valid JSON, no markdown or extra text
- Follow the exact schema provided
- Use plain, simple language (8th grade reading level)
- Be specific and actionable
- Include all deadlines found in the document
- Assess risk realistically (low/medium/high)
- Provide helpful but not prescriptive guidance

TONE:
- Helpful and supportive
- Clear and direct
- Non-judgmental
- Empowering (not patronizing)
`;

const USER_PROMPT_TEMPLATE = `
DOCUMENT TO ANALYZE:
"""
{documentText}
"""

Analyze this document and return a JSON object with this EXACT structure:

{
  "summary": "2-3 sentence plain-language summary of what this document is about and what it requires",
  "deadlines": [
    {
      "date": "YYYY-MM-DD format",
      "description": "what is due on this date",
      "daysUntil": number (calculate from today),
      "importance": "critical" | "important" | "normal"
    }
  ],
  "actions": [
    {
      "action": "specific action to take",
      "priority": "high" | "medium" | "low",
      "deadline": "when to do it (human readable)",
      "estimatedTime": "how long it takes"
    }
  ],
  "documentsNeeded": ["list of documents or items required"],
  "riskLevel": "low" | "medium" | "high",
  "riskExplanation": "explain why this risk level and what could happen",
  "checklist": [
    {
      "step": "actionable step to complete",
      "completed": false,
      "notes": "helpful context or tips"
    }
  ],
  "draftReply": {
    "subject": "appropriate email subject line",
    "body": "professional email body that acknowledges receipt and asks clarifying questions if needed",
    "tone": "formal" | "professional" | "friendly"
  },
  "simplerExplanation": "explain the document in very simple terms, as if to someone learning English",
  "ultraSimpleExplanation": "bullet points with the absolute essentials"
}

IMPORTANT REMINDERS:
- If this is a legal document, include disclaimer about seeking legal advice
- If this is a medical document, include disclaimer about consulting healthcare provider
- If deadlines are unclear, estimate conservatively
- If risk is high, explain consequences clearly
- Make the draft reply professional but not overly formal
- Keep language simple and accessible
`;
```

### Prompt Engineering Best Practices

**For Better JSON Output**:
1. Explicitly request JSON format
2. Provide exact schema with examples
3. Use structured delimiters (""" for document text)
4. Set temperature low (0.3-0.5) for consistency
5. Use max_tokens appropriate for response size

**For Better Content**:
1. Emphasize plain language and simplicity
2. Request specific, actionable items
3. Ask for realistic risk assessment
4. Require professional but accessible tone
5. Include safety disclaimers in prompt

**For Better Reliability**:
1. Test with diverse document types
2. Handle edge cases (no deadlines, unclear actions)
3. Validate JSON structure before returning
4. Provide fallback values for missing fields
5. Log failures for improvement

---

## 6. JSON SCHEMA

### Complete TypeScript Schema

```typescript
// Already defined in lib/types.ts - no changes needed!

export interface AnalysisResult {
  summary: string;
  deadlines: Deadline[];
  actions: Action[];
  documentsNeeded: string[];
  riskLevel: 'low' | 'medium' | 'high';
  riskExplanation: string;
  checklist: ChecklistItem[];
  draftReply: DraftEmail;
  simplerExplanation: string;
  ultraSimpleExplanation?: string;
  language?: Language;
}

export interface Deadline {
  date: string;                    // ISO 8601 format
  description: string;
  daysUntil: number;
  importance: 'critical' | 'important' | 'normal';
}

export interface Action {
  action: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  estimatedTime?: string;
}

export interface ChecklistItem {
  step: string;
  completed: boolean;
  notes?: string;
}

export interface DraftEmail {
  subject: string;
  body: string;
  tone: 'formal' | 'professional' | 'friendly';
}

export type Language = 'en' | 'ar' | 'fr' | 'es';
```

### Validation Strategy

**Option 1: Manual Validation** (Simpler for hackathon)
```typescript
function validateAnalysisResult(data: any): AnalysisResult {
  // Check required fields
  if (!data.summary || typeof data.summary !== 'string') {
    throw new Error('Invalid summary');
  }
  
  // Provide defaults for missing fields
  return {
    summary: data.summary,
    deadlines: Array.isArray(data.deadlines) ? data.deadlines : [],
    actions: Array.isArray(data.actions) ? data.actions : [],
    documentsNeeded: Array.isArray(data.documentsNeeded) ? data.documentsNeeded : [],
    riskLevel: ['low', 'medium', 'high'].includes(data.riskLevel) ? data.riskLevel : 'medium',
    riskExplanation: data.riskExplanation || 'Risk level could not be determined',
    checklist: Array.isArray(data.checklist) ? data.checklist : [],
    draftReply: data.draftReply || {
      subject: 'Response Required',
      body: 'Please review the document and respond accordingly.',
      tone: 'professional'
    },
    simplerExplanation: data.simplerExplanation || data.summary,
    ultraSimpleExplanation: data.ultraSimpleExplanation
  };
}
```

**Option 2: Zod Validation** (More robust, recommended)
```typescript
import { z } from 'zod';

const AnalysisResultSchema = z.object({
  summary: z.string().min(10),
  deadlines: z.array(z.object({
    date: z.string(),
    description: z.string(),
    daysUntil: z.number(),
    importance: z.enum(['critical', 'important', 'normal'])
  })),
  actions: z.array(z.object({
    action: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
    deadline: z.string().optional(),
    estimatedTime: z.string().optional()
  })),
  // ... rest of schema
});

// Usage
const validated = AnalysisResultSchema.parse(aiResponse);
```

---

## 7. SAFETY RULES

### Built-in Safety Mechanisms

**1. Prompt-Level Safety**
```typescript
const SAFETY_INSTRUCTIONS = `
CRITICAL: You must follow these safety rules:

1. LEGAL MATTERS
   - DO NOT provide legal advice or interpretations
   - DO explain what the document says in plain language
   - DO recommend consulting a lawyer for legal questions
   - Example: "This appears to be a legal notice. You should consult with a lawyer to understand your rights and options."

2. MEDICAL MATTERS
   - DO NOT provide medical advice or diagnoses
   - DO summarize medical information from the document
   - DO recommend consulting healthcare providers
   - Example: "This is medical information. Please discuss this with your doctor to understand what it means for your health."

3. IMMIGRATION MATTERS
   - DO NOT provide immigration advice or legal guidance
   - DO explain visa/immigration requirements stated in document
   - DO recommend consulting immigration lawyer or advisor
   - Example: "This relates to immigration status. Consult with an immigration lawyer or accredited representative."

4. FINANCIAL MATTERS
   - DO NOT provide financial advice or investment guidance
   - DO explain financial obligations stated in document
   - DO recommend consulting financial advisor
   - Example: "This involves financial decisions. Consider consulting a financial advisor."

5. GENERAL SAFETY
   - Always acknowledge limitations
   - Encourage professional consultation
   - Be clear about what you can and cannot do
   - Never guarantee outcomes
`;
```

**2. Response-Level Safety**

Add disclaimers to responses based on document type:

```typescript
function addSafetyDisclaimer(result: AnalysisResult, documentType: string): AnalysisResult {
  const disclaimers = {
    legal: "\n\n⚠️ IMPORTANT: This is not legal advice. Please consult with a qualified lawyer for legal guidance.",
    medical: "\n\n⚠️ IMPORTANT: This is not medical advice. Please consult with your healthcare provider.",
    immigration: "\n\n⚠️ IMPORTANT: This is not immigration advice. Please consult with an immigration lawyer or accredited representative.",
    financial: "\n\n⚠️ IMPORTANT: This is not financial advice. Please consult with a qualified financial advisor."
  };
  
  if (disclaimers[documentType]) {
    result.summary += disclaimers[documentType];
    result.simplerExplanation += disclaimers[documentType];
  }
  
  return result;
}
```

**3. Content Filtering**

Detect sensitive topics and add appropriate warnings:

```typescript
function detectSensitiveTopics(documentText: string): string[] {
  const sensitivePatterns = {
    legal: /\b(eviction|lawsuit|court|legal action|attorney|lawyer)\b/i,
    medical: /\b(diagnosis|treatment|medication|doctor|hospital|health)\b/i,
    immigration: /\b(visa|deportation|immigration|citizenship|green card)\b/i,
    financial: /\b(loan|debt|bankruptcy|investment|tax|irs)\b/i
  };
  
  const detected: string[] = [];
  for (const [topic, pattern] of Object.entries(sensitivePatterns)) {
    if (pattern.test(documentText)) {
      detected.push(topic);
    }
  }
  
  return detected;
}
```

**4. UI-Level Safety**

Add prominent disclaimer component:

```typescript
// In components/Disclaimer.tsx (already exists, enhance it)
<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Important Notice</AlertTitle>
  <AlertDescription>
    ClearPath AI provides information only, not professional advice. 
    For legal, medical, immigration, or financial matters, please 
    consult with qualified professionals.
  </AlertDescription>
</Alert>
```

---

## 8. STEP-BY-STEP BUILD ORDER

### Phase 1: Setup & Configuration (30 minutes)

**Step 1.1: Create IBM Cloud Account**
- [ ] Sign up at cloud.ibm.com
- [ ] Verify email
- [ ] Create watsonx.ai instance (Lite plan)
- [ ] Get API credentials

**Step 1.2: Configure Environment**
- [ ] Create `.env.local` file
- [ ] Add `WATSONX_API_KEY`
- [ ] Add `WATSONX_PROJECT_ID`
- [ ] Add `WATSONX_REGION`
- [ ] Create `.env.example` template
- [ ] Test environment variables load

**Step 1.3: Update Dependencies** (Optional)
- [ ] Add `zod` for validation: `npm install zod`
- [ ] Update `package.json`

### Phase 2: Core AI Integration (2 hours)

**Step 2.1: Create watsonx Client** (`lib/watsonx.ts`)
- [ ] Create file structure
- [ ] Implement authentication
- [ ] Create `analyzeDocument()` function
- [ ] Add error handling
- [ ] Add retry logic
- [ ] Test connection with simple prompt

**Step 2.2: Create Prompt Templates** (`lib/prompts.ts`)
- [ ] Define system prompt with safety rules
- [ ] Create user prompt template
- [ ] Add JSON schema in prompt
- [ ] Test prompt with sample documents
- [ ] Refine based on output quality

**Step 2.3: Create API Route** (`app/api/analyze/route.ts`)
- [ ] Create route file
- [ ] Implement POST handler
- [ ] Add input validation
- [ ] Call watsonx client
- [ ] Parse and validate response
- [ ] Add fallback to mock data
- [ ] Test with Postman/curl

### Phase 3: Frontend Integration (1 hour)

**Step 3.1: Update Main Page** (`app/page.tsx`)
- [ ] Replace mock call with API call
- [ ] Add loading states
- [ ] Handle errors gracefully
- [ ] Add retry button
- [ ] Test with sample documents

**Step 3.2: Add Mode Toggle** (Optional)
- [ ] Add "Demo Mode" toggle in UI
- [ ] Allow switching between AI and mock
- [ ] Persist preference in localStorage
- [ ] Update UI to show current mode

**Step 3.3: Enhance Error Display**
- [ ] Create error component
- [ ] Show user-friendly messages
- [ ] Add "Try Demo Mode" fallback
- [ ] Test error scenarios

### Phase 4: Safety & Polish (1 hour)

**Step 4.1: Implement Safety Rules**
- [ ] Add safety instructions to prompts
- [ ] Detect sensitive topics
- [ ] Add appropriate disclaimers
- [ ] Test with legal/medical documents
- [ ] Verify safety warnings appear

**Step 4.2: Add Validation**
- [ ] Validate API responses
- [ ] Handle malformed JSON
- [ ] Provide sensible defaults
- [ ] Test edge cases

**Step 4.3: Documentation**
- [ ] Update README with setup instructions
- [ ] Document environment variables
- [ ] Add troubleshooting guide
- [ ] Create deployment guide

### Phase 5: Testing & Refinement (1 hour)

**Step 5.1: Test All Document Types**
- [ ] Test with appointment letter
- [ ] Test with housing notice
- [ ] Test with school email
- [ ] Test with generic document
- [ ] Verify output quality

**Step 5.2: Test Error Scenarios**
- [ ] Test with invalid API key
- [ ] Test with network error
- [ ] Test with rate limit
- [ ] Test with malformed response
- [ ] Verify fallback works

**Step 5.3: Performance Testing**
- [ ] Measure response times
- [ ] Test with long documents
- [ ] Test with multiple requests
- [ ] Optimize if needed

**Step 5.4: Final Polish**
- [ ] Review all safety disclaimers
- [ ] Check UI consistency
- [ ] Test on mobile
- [ ] Fix any bugs found

---

## 9. WHAT COULD GO WRONG & HOW TO AVOID IT

### Common Issues & Solutions

**Issue 1: API Key Not Working**
- **Symptom**: 401 Unauthorized errors
- **Causes**: Wrong key, expired key, wrong region
- **Solution**: 
  - Verify key in IBM Cloud console
  - Check region matches (us-south, eu-gb, etc.)
  - Regenerate key if needed
  - Test with curl first

**Issue 2: Model Not Available**
- **Symptom**: 404 or model not found errors
- **Causes**: Model name wrong, no access to model
- **Solution**:
  - Check exact model name in watsonx.ai console
  - Request access to Granite models
  - Use alternative model as fallback
  - Keep mock mode as ultimate fallback

**Issue 3: Inconsistent JSON Output**
- **Symptom**: Parsing errors, missing fields
- **Causes**: Model returns markdown, extra text, malformed JSON
- **Solution**:
  - Set temperature low (0.3)
  - Explicitly request JSON only
  - Parse with try-catch
  - Extract JSON from markdown code blocks
  - Validate and provide defaults

**Issue 4: Rate Limiting**
- **Symptom**: 429 Too Many Requests
- **Causes**: Free tier limits exceeded
- **Solution**:
  - Implement request queuing
  - Add rate limit detection
  - Fall back to mock mode
  - Cache common document types
  - Upgrade to paid tier if needed

**Issue 5: Slow Response Times**
- **Symptom**: Takes >10 seconds to respond
- **Causes**: Large documents, complex prompts, model latency
- **Solution**:
  - Limit document length (5000 chars)
  - Optimize prompt length
  - Use faster model (granite-3-8b)
  - Add timeout (30 seconds)
  - Show progress indicator

**Issue 6: Poor Quality Analysis**
- **Symptom**: Vague summaries, missed deadlines, wrong risk level
- **Causes**: Unclear prompts, wrong model, insufficient examples
- **Solution**:
  - Refine prompt with specific instructions
  - Add few-shot examples
  - Test with diverse documents
  - Adjust temperature and parameters
  - Try different model

**Issue 7: Safety Violations**
- **Symptom**: AI gives legal/medical advice
- **Causes**: Insufficient safety instructions
- **Solution**:
  - Strengthen safety rules in prompt
  - Add post-processing checks
  - Detect sensitive topics
  - Add disclaimers automatically
  - Review outputs manually initially

**Issue 8: Environment Variables Not Loading**
- **Symptom**: Undefined API key errors
- **Causes**: Wrong file name, not in root, not restarted server
- **Solution**:
  - Verify file is `.env.local` (not `.env`)
  - Place in project root
  - Restart Next.js dev server
  - Check with `console.log(process.env.WATSONX_API_KEY)`

**Issue 9: CORS Errors**
- **Symptom**: Network errors in browser
- **Causes**: Calling watsonx.ai from frontend
- **Solution**:
  - Always call from API route (server-side)
  - Never expose API key to frontend
  - Use Next.js API routes as proxy

**Issue 10: Deployment Issues**
- **Symptom**: Works locally, fails in production
- **Causes**: Environment variables not set, wrong region
- **Solution**:
  - Set env vars in Vercel dashboard
  - Test in preview deployment first
  - Check logs for errors
  - Verify API key works from production IP

### Prevention Checklist

Before going live:
- [ ] Test with all sample documents
- [ ] Test error scenarios
- [ ] Verify safety disclaimers appear
- [ ] Check mobile responsiveness
- [ ] Test with slow network
- [ ] Verify fallback to mock works
- [ ] Review API usage limits
- [ ] Set up monitoring/logging
- [ ] Document setup process
- [ ] Create troubleshooting guide

---

## 10. SUCCESS METRICS

### Technical Metrics
- ✅ API response time < 5 seconds (95th percentile)
- ✅ Success rate > 95% (with fallback)
- ✅ JSON parsing success > 98%
- ✅ Zero API key exposures
- ✅ Fallback triggers < 5% of requests

### Quality Metrics
- ✅ All deadlines extracted correctly
- ✅ Risk level matches document severity
- ✅ Actions are specific and actionable
- ✅ Draft replies are professional
- ✅ Simple explanations are clear

### Safety Metrics
- ✅ Zero instances of legal advice
- ✅ Zero instances of medical advice
- ✅ All sensitive documents have disclaimers
- ✅ Safety warnings visible and clear

### User Experience Metrics
- ✅ UI remains unchanged (no breaking changes)
- ✅ Loading states are clear
- ✅ Errors are user-friendly
- ✅ Demo mode always available
- ✅ Works on mobile devices

---

## 11. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables documented
- [ ] README updated with setup instructions
- [ ] Safety rules tested
- [ ] Mock fallback working
- [ ] Error handling tested

### Vercel Deployment
- [ ] Push code to GitHub
- [ ] Connect repository to Vercel
- [ ] Set environment variables in Vercel dashboard:
  - `WATSONX_API_KEY`
  - `WATSONX_PROJECT_ID`
  - `WATSONX_REGION`
  - `ENABLE_AI_MODE=true`
  - `ENABLE_MOCK_FALLBACK=true`
- [ ] Deploy to preview environment
- [ ] Test preview deployment
- [ ] Deploy to production

### Post-Deployment
- [ ] Test production deployment
- [ ] Monitor error logs
- [ ] Check API usage
- [ ] Verify all features work
- [ ] Test from different devices
- [ ] Share with test users

---

## 12. TIMELINE ESTIMATE

**Total Time: 5-6 hours** (for experienced developer)

- Setup & Configuration: 30 minutes
- Core AI Integration: 2 hours
- Frontend Integration: 1 hour
- Safety & Polish: 1 hour
- Testing & Refinement: 1 hour
- Documentation: 30 minutes

**For Hackathon**: Can be completed in one focused session

---

## 13. NEXT STEPS

1. **Review this plan** with your team
2. **Create IBM Cloud account** and get credentials
3. **Set up environment** variables locally
4. **Start with Phase 1** (Setup & Configuration)
5. **Build incrementally** following the step-by-step guide
6. **Test frequently** with sample documents
7. **Keep mock mode** as fallback throughout
8. **Document issues** and solutions as you go

---

## APPENDIX A: Quick Reference

### Essential URLs
- IBM Cloud: https://cloud.ibm.com
- watsonx.ai Docs: https://cloud.ibm.com/docs/watsonx
- Granite Models: https://www.ibm.com/granite

### Key Files
- API Route: `app/api/analyze/route.ts`
- watsonx Client: `lib/watsonx.ts`
- Prompts: `lib/prompts.ts`
- Types: `lib/types.ts` (no changes)
- Main Page: `app/page.tsx` (minimal changes)

### Environment Variables
```bash
WATSONX_API_KEY=your-key-here
WATSONX_PROJECT_ID=your-project-id
WATSONX_REGION=us-south
ENABLE_AI_MODE=true
ENABLE_MOCK_FALLBACK=true
```

### Test Commands
```bash
# Start dev server
npm run dev

# Test API endpoint
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"documentText": "test document"}'

# Build for production
npm run build
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-24  
**Status**: Ready for Implementation  
**Estimated Effort**: 5-6 hours