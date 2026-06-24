# ClearPath AI - Version 3 Quick Start Guide

**Goal**: Get AI integration running in 30 minutes

---

## Prerequisites

- ✅ Version 2 (mock prototype) is working
- ✅ Node.js and npm installed
- ✅ Code editor (VS Code recommended)
- ✅ Internet connection

---

## Step 1: Get IBM Credentials (10 minutes)

### 1.1 Create IBM Cloud Account
1. Go to: https://cloud.ibm.com/registration
2. Sign up with email (free tier, no credit card needed)
3. Verify your email

### 1.2 Create watsonx.ai Instance
1. Log into IBM Cloud Console
2. Click **Catalog** in top menu
3. Search for "watsonx.ai"
4. Click **watsonx.ai** tile
5. Select **Lite** plan (free)
6. Choose **Dallas (us-south)** region
7. Click **Create**
8. Wait for instance to provision (~2 minutes)

### 1.3 Get Your Credentials
1. Open your watsonx.ai instance
2. Click **Manage** tab
3. Click **Access (IAM)** or **Service Credentials**
4. Click **New Credential** button
5. Copy these values:
   - **API Key**: Starts with "apikey-..."
   - **URL**: Usually "https://us-south.ml.cloud.ibm.com"

### 1.4 Create a Project
1. In watsonx.ai, click **Projects**
2. Click **New Project**
3. Name it "ClearPath AI"
4. Click **Create**
5. Copy the **Project ID** (found in project settings)

---

## Step 2: Configure Environment (5 minutes)

### 2.1 Create Environment File
In your project root, create `.env.local`:

```bash
# IBM watsonx.ai Configuration
WATSONX_API_KEY=your-api-key-here
WATSONX_PROJECT_ID=your-project-id-here
WATSONX_REGION=us-south

# Feature Flags
ENABLE_AI_MODE=true
ENABLE_MOCK_FALLBACK=true
```

### 2.2 Replace Placeholder Values
- Replace `your-api-key-here` with your actual API key
- Replace `your-project-id-here` with your actual project ID
- Keep `us-south` if you chose Dallas region

### 2.3 Verify File
```bash
# Check file exists
ls -la .env.local

# Should NOT be in git
git status  # Should not show .env.local
```

---

## Step 3: Install Dependencies (2 minutes)

### Optional: Add Validation Library
```bash
npm install zod
```

This is optional but recommended for better error handling.

---

## Step 4: Create Core Files (10 minutes)

### 4.1 Create watsonx Client
Create `lib/watsonx.ts`:

```typescript
// Basic structure - full implementation in main plan
export async function analyzeDocument(documentText: string) {
  const apiKey = process.env.WATSONX_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  
  if (!apiKey || !projectId) {
    throw new Error('Missing IBM credentials');
  }
  
  // Call watsonx.ai API
  // Parse response
  // Return structured data
}
```

### 4.2 Create Prompt Templates
Create `lib/prompts.ts`:

```typescript
export const SYSTEM_PROMPT = `You are ClearPath AI...`;
export const USER_PROMPT_TEMPLATE = `Analyze this document...`;
```

### 4.3 Create API Route
Create `app/api/analyze/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocument } from '@/lib/watsonx';
import { getMockResult } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const { documentText } = await request.json();
    
    // Try AI first
    const result = await analyzeDocument(documentText);
    return NextResponse.json({ success: true, data: result });
    
  } catch (error) {
    // Fallback to mock
    const mockResult = getMockResult(documentText);
    return NextResponse.json({ 
      success: true, 
      data: mockResult,
      mode: 'mock'
    });
  }
}
```

---

## Step 5: Update Frontend (3 minutes)

### 5.1 Modify app/page.tsx
Replace the `handleAnalyze` function:

```typescript
const handleAnalyze = async () => {
  if (!documentText.trim()) return;

  setIsLoading(true);
  setResults(null);

  try {
    // Call API instead of mock
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText })
    });
    
    const data = await response.json();
    setResults(data.data);
    
  } catch (error) {
    console.error('Analysis failed:', error);
    // Fallback to mock
    const mockResult = getMockResult(documentText);
    setResults(mockResult);
  } finally {
    setIsLoading(false);
  }

  // Scroll to results
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 100);
};
```

---

## Step 6: Test It! (5 minutes)

### 6.1 Restart Dev Server
```bash
# Stop current server (Ctrl+C)
# Start again to load new env vars
npm run dev
```

### 6.2 Test with Sample Document
1. Open http://localhost:3000
2. Click "Medical Appointment" sample
3. Click "Analyze Document"
4. Wait for results (~3-5 seconds)
5. Verify results look good

### 6.3 Check Console
Look for:
- ✅ No errors in browser console
- ✅ No errors in terminal
- ✅ Results display correctly

### 6.4 Test Fallback
1. Temporarily break API key in `.env.local`
2. Try analyzing again
3. Should still work (using mock data)
4. Fix API key

---

## Troubleshooting

### "Missing IBM credentials"
- Check `.env.local` exists in project root
- Verify API key and project ID are correct
- Restart dev server after changing `.env.local`

### "401 Unauthorized"
- API key might be wrong or expired
- Regenerate key in IBM Cloud console
- Check region matches (us-south, eu-gb, etc.)

### "Model not found"
- Request access to Granite models in watsonx.ai
- Try alternative model name
- Use mock fallback temporarily

### "Slow response"
- Normal for first request (cold start)
- Should be faster on subsequent requests
- Consider using smaller model

### "Invalid JSON"
- Check prompt template
- Lower temperature parameter
- Add better JSON parsing

---

## Next Steps

Once basic integration works:

1. **Refine Prompts** - Improve output quality
2. **Add Safety Rules** - Implement disclaimers
3. **Enhance Error Handling** - Better user messages
4. **Add Mode Toggle** - Let users choose AI vs Demo
5. **Test Edge Cases** - Various document types
6. **Deploy to Vercel** - Share with others

---

## Full Implementation

For complete code examples, see:
- [`docs/VERSION-3-AI-INTEGRATION-PLAN.md`](VERSION-3-AI-INTEGRATION-PLAN.md) - Detailed plan
- [`docs/VERSION-3-ARCHITECTURE-DIAGRAM.md`](VERSION-3-ARCHITECTURE-DIAGRAM.md) - Visual diagrams

---

## Getting Help

**IBM watsonx.ai Documentation**:
- https://cloud.ibm.com/docs/watsonx

**Common Issues**:
- Check environment variables are loaded
- Verify API key has correct permissions
- Ensure project ID is from correct instance
- Test with curl first to isolate issues

**Test API Directly**:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"documentText": "Test document"}'
```

---

**Quick Start Version**: 1.0  
**Estimated Time**: 30 minutes  
**Difficulty**: Beginner-friendly