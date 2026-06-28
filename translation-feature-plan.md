# Translation Feature Plan — ClearPath AI

## Overview

Add a real AI-powered translation feature that allows users to translate an already-generated
`AnalysisResult` action plan into Arabic, French, or Spanish via a new server-side API route
(`app/api/translate/route.ts`) that calls IBM watsonx.ai. The UI will be a `TranslationPanel`
component added near the top of `ResultsDisplay`. English remains the default and always
reflects the original untranslated result. If translation fails, the original English result
is preserved and a calm error message is shown.

**No new packages. No database. No auth. No schema changes. Deployable on Vercel.**

---

## Sub-Tasks

---

### Sub-Task 1 — Create `app/api/translate/route.ts`

**Intent**
Create a new POST-only API route that accepts an `AnalysisResult` and a target language,
builds a safe translation prompt, calls IBM watsonx.ai, parses the translated JSON back
into an `AnalysisResult` shape, and returns it. Mirrors the pattern of the existing
`app/api/analyze/route.ts` exactly.

**Expected Outcomes**
- `POST /api/translate` accepts `{ analysisResult: AnalysisResult, targetLanguage: 'ar' | 'fr' | 'es' }`
- Returns `{ success: true, translatedResult: AnalysisResult, language: string }` on success
- Returns `{ success: false, error: string }` on failure (client gracefully falls back)
- Uses the same `WATSONX_URL`, `WATSONX_API_KEY`, `WATSONX_PROJECT_ID`, `WATSONX_MODEL_ID`
  env vars already in `.env.local` — no new env vars
- Uses the same `isWatsonxConfigured()` helper from `lib/watsonx.ts`
- If watsonx is not configured, returns a graceful error (no mock translation — there is no
  meaningful fallback for translation)
- Does not import from `lib/mockData.ts` (mock fallback is not applicable to translation)

**Todo List**
1. Create `app/api/translate/route.ts`
2. Read `{ analysisResult, targetLanguage }` from request body; validate both are present
3. Reject `targetLanguage === 'en'` with a 400 (no-op translation)
4. Build the translation prompt (see Prompt Design below)
5. Call watsonx.ai directly using `fetch` against the same generation endpoint used in
   `lib/watsonx.ts` — reuse `WATSONX_CONFIG` pattern, do NOT duplicate credentials inline
6. Parse the JSON response, strip markdown fences if present (same defensive parse as
   `lib/watsonx.ts`)
7. Preserve non-translatable fields verbatim: `riskLevel`, `draftReply.tone`,
   `deadlines[].date`, `deadlines[].daysUntil`, `deadlines[].importance`,
   `actions[].priority`, `actions[].deadline`, `actions[].estimatedTime`,
   `checklist[].completed`
8. Return `{ success: true, translatedResult, language }`
9. Add a `GET` handler that returns 405 (matches existing route convention)

**Prompt Design**

System prompt:
```
You are a professional translator assisting immigrants, students, and families in
understanding important documents. Your job is to translate an existing action plan
faithfully into the target language.

Rules you must follow:
- Translate faithfully. Do not add new facts, warnings, deadlines, or advice.
- Do not add legal, immigration, medical, or financial advice.
- Preserve all dates, numbers, names, risk labels, and proper nouns exactly.
- Do not change the meaning or intent of any item.
- Return valid JSON matching the exact structure provided. Do not add or remove keys.
- Do not wrap the JSON in markdown code fences.
```

User prompt (constructed at runtime):
```
Translate the following JSON action plan into {language_name}.

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

Return the full JSON object with the same structure, same keys, only the above string
fields translated into {language_name}.

JSON to translate:
{JSON.stringify(analysisResult)}
```

**Relevant Context**
- `lib/watsonx.ts` — shows how the watsonx endpoint is called; reuse the same URL + token
  pattern (`/ml/v1/text/generation?version=2023-05-29`)
- `app/api/analyze/route.ts` — template for route structure, validation, error handling
- `lib/types.ts` — `AnalysisResult`, `Language` types

**Status** — `[ ] pending`

---

### Sub-Task 2 — Add Translation Types to `lib/types.ts`

**Intent**
Add minimal types for the translation API request and response. No changes to
`AnalysisResult` shape — only new types for the translate endpoint contract.

**Expected Outcomes**
- `TranslateRequest` type exported from `lib/types.ts`
- `TranslateResponse` type exported from `lib/types.ts`
- `AnalysisResult` is unchanged

**Todo List**
1. Open `lib/types.ts`
2. Append two new exported interfaces at the bottom:
   ```
   TranslateRequest { analysisResult: AnalysisResult; targetLanguage: Language }
   TranslateResponse { success: true; translatedResult: AnalysisResult; language: string }
                    | { success: false; error: string }
   ```

**Relevant Context**
- `lib/types.ts` lines 1–60 — existing `AnalysisResult`, `Language`, `ApiRequest/Response`

**Status** — `[ ] pending`

---

### Sub-Task 3 — Create `components/TranslationPanel.tsx`

**Intent**
Create a self-contained component that renders a language selector, manages the
translation API call, owns the translation loading/error state, and notifies the
parent (`ResultsDisplay`) of the translated result via a callback. This keeps
`ResultsDisplay` clean.

**Expected Outcomes**
- Renders four language buttons/tabs: English (default), Arabic, French, Spanish
- Clicking English resets to original result immediately (no API call)
- Clicking a non-English language triggers a `POST /api/translate` call
- Shows `"Translating action plan…"` with a `Loader2` spinner during the call
- On success: calls `onTranslated(translatedResult)` prop
- On error: calls `onTranslated(originalResult)` (keeps original) and shows an
  inline calm error message
- Displays the translation disclaimer note:
  `"AI translation may contain errors. Verify important documents with a qualified person."`
  — visible only when a non-English language is active
- Matches the existing warm editorial design: uses existing Tailwind classes,
  `text-muted-foreground`, `bg-muted/60`, `border-border`, `text-primary` etc.
- Uses `Loader2` from `lucide-react` (already installed)
- No new packages

**Props**
```typescript
interface TranslationPanelProps {
  originalResult: AnalysisResult;
  onTranslated: (result: AnalysisResult) => void;
  onLanguageChange: (lang: Language) => void;
}
```

**Relevant Context**
- `components/LanguageSelector.tsx` — existing language selector pattern, reuse the
  `languages` array and `Language` type; however `TranslationPanel` replaces its
  functionality in the results view (LanguageSelector stays in the Header for UI state only)
- `components/LoadingState.tsx` — spinner pattern to mirror
- `lib/types.ts` — `Language`, `AnalysisResult`

**Status** — `[ ] pending`

---

### Sub-Task 4 — Update `ResultsDisplay.tsx` to integrate `TranslationPanel`

**Intent**
Wire `TranslationPanel` into `ResultsDisplay` so the displayed result switches between
the original and translated version, and Arabic RTL is applied when needed.

**Expected Outcomes**
- `TranslationPanel` renders just above the "Understand / Act / Prepare / Reply / Simplify"
  sections (after the results header and rule-line)
- `ResultsDisplay` holds a `displayedResult` local state (initially `results` prop)
- When `TranslationPanel` calls `onTranslated`, `displayedResult` updates
- When `TranslationPanel` calls `onLanguageChange`, `activeLanguage` state updates
- All section components (`SummarySection`, `DeadlinesSection`, etc.) receive
  `displayedResult` fields — no changes needed in those child components
- When `activeLanguage === 'ar'`, the results content wrapper gets `dir="rtl"` and
  `text-right` so Arabic flows correctly
- When `activeLanguage !== 'ar'`, no dir attribute (defaults to LTR)
- `riskLevel` badge is never translated (already handled in prompt design)
- The existing disclaimer at the bottom is NOT changed

**Todo List**
1. Add `useState` for `displayedResult` (init: `results` prop) and `activeLanguage`
   (init: `'en'`)
2. Import `TranslationPanel`
3. Place `<TranslationPanel>` between the rule-line divider and the "Understand" section
4. Add `dir` prop to the results content `<div>` based on `activeLanguage`
5. Replace `results.xxx` with `displayedResult.xxx` in all section component props
6. When `onLanguageChange('en')` is called, reset `displayedResult` to `results`

**Relevant Context**
- `components/ResultsDisplay.tsx` — full file read by subagent; key areas:
  - `div className="rule-line mb-10"` — insert `TranslationPanel` after this line
  - The grid sections that receive `results.xxx` props — all need to use `displayedResult`
- `lib/types.ts` — `Language` type

**Status** — `[ ] pending`

---

### Sub-Task 5 — Remove "Full translation coming soon" note from `LanguageSelector`

**Intent**
The `LanguageSelector` component in the `Header` currently shows a "Full translation
coming soon" placeholder. Now that translation is real, remove that note. The Header's
`LanguageSelector` will continue to manage `currentLanguage` state in `page.tsx` (for
possible future use), but the actual translation action is owned by `TranslationPanel`
in the results view.

**Expected Outcomes**
- The "Full translation coming soon" line is removed from `LanguageSelector.tsx`
- The dropdown still opens, shows four languages, and calls `onLanguageChange`
- No other changes to `LanguageSelector.tsx`

**Todo List**
1. Open `components/LanguageSelector.tsx`
2. Remove the `<div>` block containing `"Full translation coming soon"` (the last item
   before the closing dropdown `</div>`)

**Relevant Context**
- `components/LanguageSelector.tsx` — the note is in a `border-t border-border` div
  at the bottom of the dropdown

**Status** — `[ ] pending`

---

## Files Created / Modified

| File | Action | Protected? |
|---|---|---|
| `app/api/translate/route.ts` | **Create new** | No |
| `lib/types.ts` | **Edit** — append 2 types | No |
| `components/TranslationPanel.tsx` | **Create new** | No |
| `components/ResultsDisplay.tsx` | **Edit** — add state + panel | No |
| `components/LanguageSelector.tsx` | **Edit** — remove placeholder note | No |

### Files explicitly NOT touched

| File | Reason |
|---|---|
| `.env.local` | Protected — no edits |
| `app/api/analyze/route.ts` | Analysis route is stable — no changes |
| `lib/watsonx.ts` | Reuse as-is; translate route calls the API directly |
| `lib/mockData.ts` | Mock fallback for analysis is untouched |
| `lib/prompts.ts` | Analysis prompts are untouched |
| `app/page.tsx` | Language state already exists; only `ResultsDisplay` receives translated results |
| `lib/storage.ts` | Saved analyses store original English result only |
| All section sub-components | `SummarySection`, `DeadlinesSection`, etc. receive data via props — no changes needed |
| `package.json` | No new packages |
| `tailwind.config` / `globals.css` | No style system changes |

---

## RTL Handling

When `activeLanguage === 'ar'`, `ResultsDisplay` adds `dir="rtl"` to the content
wrapper `<div>` that wraps all section groups (Understand / Act / Prepare / Reply /
Simplify). Tailwind's responsive utility classes handle text alignment; `text-right`
is added to the same wrapper. No new CSS is needed.

The Header, navigation, and disclaimer sections remain unaffected by the `dir`
attribute because they sit outside the results content wrapper.

---

## Testing Plan

1. **Happy path — French**: Paste a sample document → Analyze → Click French in
   `TranslationPanel` → Verify `summary`, `checklist`, `draftReply` body appear in French.
   Verify `riskLevel` value is still `"low"/"medium"/"high"` (English).

2. **Happy path — Arabic**: Repeat above with Arabic → Verify text is translated and
   `dir="rtl"` is present on the content wrapper in DevTools.

3. **English reset**: After translating to Spanish → Click English → Verify original
   English result is shown (no API call).

4. **Loading state**: Click Arabic → Verify "Translating action plan…" spinner appears
   before result renders.

5. **Graceful error**: Temporarily break watsonx credentials in a local test →
   Verify original English result stays visible and error message appears in the panel.

6. **Mock fallback preserved**: Set `ENABLE_AI_MODE=false` → Analyze document → Verify
   demo mode banner appears → Click French → Translation API correctly returns error
   (watsonx not configured) and English result is retained.

7. **No schema breakage**: Verify translated `AnalysisResult` passes TypeScript
   type check (all required fields present).

---

## What Will Not Be Touched

- Authentication, database, storage schema
- The main document analysis flow
- IBM watsonx.ai analyze route
- Mock data fallback for analysis
- Legal/medical/financial advice language in existing disclaimers
- Any component not listed in "Files Created / Modified"
- Environment variables or `.env.local`
- Deployment configuration (Vercel-compatible by default)
