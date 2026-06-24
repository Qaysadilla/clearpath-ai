# ClearPath AI - Safe watsonx Integration Plan

**Status**: Ready for Implementation  
**Date**: 2026-06-24  
**Purpose**: Complete safety plan for integrating IBM watsonx.ai

---

## ✅ CONFIRMED DECISIONS

### 1. Environment Variable Names

```bash
# .env.local (NOT committed to git)
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_PROJECT_ID=your-project-id-here
WATSONX_API_KEY=your-api-key-here
WATSONX_MODEL_ID=llama-3-3-70b-instruct
ENABLE_AI_MODE=true
ENABLE_MOCK_FALLBACK=true
MAX_DOCUMENT_LENGTH=5000
```

**Security Verified:**
- ✅ `.env.local` is in `.gitignore` (line 69-71)
- ✅ Variables are server-only (no `NEXT_PUBLIC_` prefix)
- ✅ `.env.example` will be created as safe template
- ✅ No secrets will be exposed to frontend

---

### 2. Files to Create or Edit

#### **NEW FILES (3):**

1. **`app/api/analyze/route.ts`** (~150 lines)
   - POST endpoint for document analysis
   - Server-side only (API keys never exposed)
   - Automatic fallback to mock data on error

2. **`lib/watsonx.ts`** (~100 lines)
   - watsonx.ai client with retry logic
   - JSON parsing with fallback strategies
   - Error handling and logging

3. **`lib/prompts.ts`** (~200 lines)
   - System prompt with safety rules
   - User prompt template with JSON schema
   - Safety disclaimers for sensitive topics

#### **MODIFIED FILES (2):**

1. **`app/page.tsx`** (Lines 159-172 only)
   - Replace `getMockResult()` with API call
   - Add error handling with mock fallback
   - ~15 lines changed

2. **`lib/types.ts`** (Add at end)
   - Add `ApiRequest`, `ApiResponse`, `ApiError` types
   - ~20 lines added
   - No existing code changed

#### **UNCHANGED FILES:**
- ✅ All UI components (no changes needed)
- ✅ `lib/mockData.ts` (preserved as fallback)
- ✅ All styling files
- ✅ `components/Disclaimer.tsx` (already has safety notice)

---

### 3. Exact JSON Schema

The watsonx API **must return this exact structure** (matches existing `AnalysisResult` type):

```json
{
  "summary": "2-3 sentence plain-language summary",
  "deadlines": [
    {
      "date": "2026-07-08",
      "description": "What is due",
      "daysUntil": 14,
      "importance": "critical"
    }
  ],
  "actions": [
    {
      "action": "Specific action to take",
      "priority": "high",
      "deadline": "July 8, 2026",
      "estimatedTime": "30 minutes"
    }
  ],
  "documentsNeeded": ["Health Card", "Photo ID"],
  "riskLevel": "medium",
  "riskExplanation": "Why this risk level",
  "checklist": [
    {
      "step": "Actionable step",
      "completed": false,
      "notes": "Optional context"
    }
  ],
  "draftReply": {
    "subject": "Email subject",
    "body": "Professional email body (PLAIN TEXT, not code-formatted)",
    "tone": "professional"
  },
  "simplerExplanation": "Very simple explanation",
  "ultraSimpleExplanation": "Bullet points with essentials"
}
```

**Critical Fix for Code-Formatted Draft Reply:**
The prompt will explicitly state: **"Return the draftReply.body as plain text, NOT in code formatting or markdown. Write it as a normal email body."**

---

### 4. API Route Architecture

```typescript
// app/api/analyze/route.ts

export async function POST(request: Request) {
  try {
    // 1. Validate input
    const { documentText } = await request.json();
    
    if (!documentText || documentText.length > 5000) {
      return Response.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    // 2. Check if AI mode is enabled
    if (!process.env.WATSONX_API_KEY) {
      return useMockFallback(documentText);
    }

    // 3. Call watsonx.ai
    const aiResult = await analyzeWithWatsonx(documentText);
    
    // 4. Parse and validate JSON
    const parsed = parseWatsonxResponse(aiResult);
    const validated = validateAnalysisResult(parsed);
    
    // 5. Add safety disclaimers
    const safe = addSafetyDisclaimer(validated, documentText);
    
    return Response.json({
      success: true,
      data: safe,
      metadata: {
        model: process.env.WATSONX_MODEL_ID,
        mode: 'ai'
      }
    });
    
  } catch (error) {
    console.error('AI analysis failed:', error);
    return useMockFallback(documentText);
  }
}

function useMockFallback(documentText: string) {
  const mockResult = getMockResult(documentText);
  return Response.json({
    success: true,
    data: mockResult,
    metadata: {
      model: 'mock',
      mode: 'mock',
      warning: 'Using demo data - AI unavailable'
    }
  });
}
```

**Error Handling Strategy:**

| Error Type | Action | Fallback |
|------------|--------|----------|
| Invalid input | Return 400 | None |
| Missing API key | Use mock | ✅ |
| Network error | Retry 2x, then mock | ✅ |
| Rate limit (429) | Use mock | ✅ |
| Invalid JSON | Parse & fix, or mock | ✅ |
| Timeout (>30s) | Use mock | ✅ |

---

### 5. Frontend Integration

**Current code** (app/page.tsx:159-172):
```typescript
const handleAnalyze = async () => {
  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 2500));
  const mockResult = getMockResult(documentText);
  setResults(mockResult);
  setIsLoading(false);
};
```

**New code** (with API integration + fallback):
```typescript
const handleAnalyze = async () => {
  if (!documentText.trim()) return;
  
  setIsLoading(true);
  setResults(null);
  
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setResults(data.data);
    } else {
      console.warn('API error, using mock:', data.error);
      const mockResult = getMockResult(documentText);
      setResults(mockResult);
    }
  } catch (error) {
    console.error('Network error, using mock:', error);
    const mockResult = getMockResult(documentText);
    setResults(mockResult);
  } finally {
    setIsLoading(false);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }
};
```

**Mock Fallback Always Available:**
- ✅ Network errors → Mock data
- ✅ API errors → Mock data
- ✅ Invalid responses → Mock data
- ✅ User never sees broken state

---

### 6. Safety Guardrails

#### **Layer 1: Prompt-Level Safety**

```typescript
// lib/prompts.ts

const SAFETY_RULES = `
CRITICAL SAFETY RULES - YOU MUST FOLLOW THESE:

1. LEGAL DOCUMENTS (eviction, lawsuit, court, legal action)
   ❌ DO NOT: Provide legal advice, interpret laws, suggest legal strategies
   ✅ DO: Explain what the document says, list deadlines, recommend consulting a lawyer
   ✅ ALWAYS ADD: "⚠️ This is not legal advice. Consult with a qualified lawyer."

2. MEDICAL DOCUMENTS (diagnosis, treatment, medication, health)
   ❌ DO NOT: Provide medical advice, diagnose conditions, recommend treatments
   ✅ DO: Summarize medical information, list appointments, recommend consulting doctor
   ✅ ALWAYS ADD: "⚠️ This is not medical advice. Consult with your healthcare provider."

3. IMMIGRATION DOCUMENTS (visa, deportation, citizenship, status)
   ❌ DO NOT: Provide immigration advice, interpret immigration law
   ✅ DO: Explain requirements stated in document, list deadlines
   ✅ ALWAYS ADD: "⚠️ This is not immigration advice. Consult with an immigration lawyer."

4. FINANCIAL DOCUMENTS (loan, debt, investment, tax)
   ❌ DO NOT: Provide financial advice, recommend investments
   ✅ DO: Explain financial obligations, list payment deadlines
   ✅ ALWAYS ADD: "⚠️ This is not financial advice. Consult with a financial advisor."

5. DRAFT REPLY FORMATTING
   ❌ DO NOT: Format the draft reply body in code blocks or markdown
   ✅ DO: Write the email body as plain text, as if typing a real email
   ✅ EXAMPLE: Write "Dear [Name],\n\nThank you for..." NOT "```Dear [Name]...```"
`;

const SYSTEM_PROMPT = `You are ClearPath AI, an assistant that helps people understand confusing documents.

${SAFETY_RULES}

OUTPUT REQUIREMENTS:
- Return ONLY valid JSON, no markdown code blocks around the JSON
- The draftReply.body field must be plain text, not code-formatted
- Follow the exact schema provided
- Use plain, simple language (8th grade reading level)
- Be specific and actionable
- Include all deadlines found in the document
- Assess risk realistically (low/medium/high)
`;
```

#### **Layer 2: Content Detection**

```typescript
// lib/watsonx.ts

function detectSensitiveTopics(documentText: string): string[] {
  const patterns = {
    legal: /\b(eviction|lawsuit|court|legal action|attorney|lawyer|n4|n12)\b/i,
    medical: /\b(diagnosis|treatment|medication|doctor|hospital|health|appointment)\b/i,
    immigration: /\b(visa|deportation|immigration|citizenship|green card|work permit)\b/i,
    financial: /\b(loan|debt|bankruptcy|investment|tax|irs|cra|payment)\b/i
  };
  
  const detected: string[] = [];
  for (const [topic, pattern] of Object.entries(patterns)) {
    if (pattern.test(documentText)) {
      detected.push(topic);
    }
  }
  return detected;
}
```

#### **Layer 3: Response-Level Disclaimers**

```typescript
// lib/watsonx.ts

function addSafetyDisclaimer(
  result: AnalysisResult,
  documentText: string
): AnalysisResult {
  const topics = detectSensitiveTopics(documentText);
  
  const disclaimers = {
    legal: "\n\n⚠️ IMPORTANT: This is not legal advice. Please consult with a qualified lawyer for legal guidance.",
    medical: "\n\n⚠️ IMPORTANT: This is not medical advice. Please consult with your healthcare provider.",
    immigration: "\n\n⚠️ IMPORTANT: This is not immigration advice. Please consult with an immigration lawyer or accredited representative.",
    financial: "\n\n⚠️ IMPORTANT: This is not financial advice. Please consult with a qualified financial advisor."
  };
  
  // Add disclaimers to summary and simpler explanation
  topics.forEach(topic => {
    if (disclaimers[topic]) {
      result.summary += disclaimers[topic];
      result.simplerExplanation += disclaimers[topic];
    }
  });
  
  return result;
}
```

#### **Layer 4: UI-Level Safety**

The existing `components/Disclaimer.tsx` already provides:
- ✅ Prominent disclaimer at bottom of page
- ✅ Clear statement: "does not provide legal, immigration, financial, or medical advice"
- ✅ Recommendation to consult professionals
- ✅ Note that samples are fictional

**No changes needed to Disclaimer component.**

---

### 7. Step-by-Step Implementation Order

#### **Phase 1: Setup (15 minutes)**

1. Create `.env.local` file with your credentials
2. Create `.env.example` template (safe to commit)
3. Verify `.gitignore` includes `.env.local`
4. Test environment variables load: `console.log(process.env.WATSONX_API_KEY?.substring(0, 10))`

#### **Phase 2: Backend (90 minutes)**

5. Create `lib/prompts.ts` with safety rules and templates
6. Create `lib/watsonx.ts` with API client
7. Test watsonx connection with simple prompt
8. Create `app/api/analyze/route.ts` with full logic
9. Test API route with curl/Postman
10. Verify mock fallback works when API key is removed

#### **Phase 3: Frontend (30 minutes)**

11. Update `app/page.tsx` handleAnalyze function
12. Test with sample documents
13. Verify error handling and fallback
14. Test loading states and scrolling

#### **Phase 4: Safety & Testing (45 minutes)**

15. Test with legal document (housing notice)
16. Test with medical document (appointment letter)
17. Verify safety disclaimers appear
18. Test draft reply is NOT code-formatted
19. Test all error scenarios
20. Verify mock fallback always works

#### **Phase 5: Documentation (15 minutes)**

21. Update README with setup instructions
22. Document environment variables
23. Add troubleshooting section
24. Create deployment guide

**Total Time: ~3 hours**

---

### 8. Testing & Validation Approach

#### **Unit Tests (Manual)**

**Test 1: Environment Variables**
```bash
# In terminal
node -e "console.log(process.env.WATSONX_API_KEY ? 'Loaded' : 'Missing')"
```

**Test 2: API Route**
```bash
# Test with curl
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"documentText": "This is a test appointment letter for July 8, 2026 at 2:30 PM."}'
```

**Test 3: Mock Fallback**
```bash
# Temporarily rename .env.local to test fallback
mv .env.local .env.local.backup
# Run app, verify mock data appears
mv .env.local.backup .env.local
```

#### **Integration Tests**

| Test Case | Input | Expected Output | Pass/Fail |
|-----------|-------|-----------------|-----------|
| Appointment letter | Sample appointment text | Deadlines extracted, no code formatting in draft | ☐ |
| Housing notice | Sample housing text | Legal disclaimer added | ☐ |
| School email | Sample school text | All actions listed | ☐ |
| Invalid input | Empty string | 400 error | ☐ |
| Network error | Disconnect internet | Mock fallback | ☐ |
| Invalid API key | Wrong key | Mock fallback | ☐ |

#### **Safety Tests**

| Test Case | Expected Behavior | Pass/Fail |
|-----------|-------------------|-----------|
| Legal document | Disclaimer: "not legal advice" | ☐ |
| Medical document | Disclaimer: "not medical advice" | ☐ |
| Immigration document | Disclaimer: "not immigration advice" | ☐ |
| Financial document | Disclaimer: "not financial advice" | ☐ |
| Draft reply | Plain text, NOT code-formatted | ☐ |

#### **Performance Tests**

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| API response time | < 5 seconds | ___ | ☐ |
| Mock fallback time | < 1 second | ___ | ☐ |
| JSON parse success | > 95% | ___ | ☐ |
| Overall success rate | > 95% | ___ | ☐ |

---

## 🚀 READY TO IMPLEMENT

### Pre-Implementation Checklist

- [ ] IBM watsonx.ai account created
- [ ] API credentials obtained (URL, Project ID, API Key, Model ID)
- [ ] `.env.local` file created with credentials
- [ ] `.env.example` template created
- [ ] Git status clean (no uncommitted changes)
- [ ] Development server running (`npm run dev`)

### Implementation Checklist

- [ ] Phase 1: Setup completed
- [ ] Phase 2: Backend completed
- [ ] Phase 3: Frontend completed
- [ ] Phase 4: Safety & Testing completed
- [ ] Phase 5: Documentation completed

### Post-Implementation Checklist

- [ ] All tests passing
- [ ] Safety disclaimers verified
- [ ] Mock fallback working
- [ ] No secrets in git
- [ ] README updated
- [ ] Ready for deployment

---

## 📋 QUICK REFERENCE

### Key Files
- API Route: `app/api/analyze/route.ts` (NEW)
- watsonx Client: `lib/watsonx.ts` (NEW)
- Prompts: `lib/prompts.ts` (NEW)
- Main Page: `app/page.tsx` (MODIFIED - 15 lines)
- Types: `lib/types.ts` (MODIFIED - add 3 interfaces)

### Environment Variables
```bash
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_PROJECT_ID=your-project-id-here
WATSONX_API_KEY=your-api-key-here
WATSONX_MODEL_ID=llama-3-3-70b-instruct
```

### Security Guarantees
- ✅ API keys never exposed to frontend
- ✅ `.env.local` in `.gitignore`
- ✅ Server-side only API calls
- ✅ Mock fallback always available
- ✅ Safety disclaimers automatic

### Critical Fixes
- ✅ Draft reply will be plain text (not code-formatted)
- ✅ JSON parsing handles markdown code blocks
- ✅ Safety disclaimers added automatically
- ✅ Mock fallback on any error

---

**Document Status**: Complete and Ready for Implementation  
**Next Step**: Switch to Code mode to implement this plan  
**Estimated Time**: 3 hours total