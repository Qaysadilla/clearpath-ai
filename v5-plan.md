# ClearPath AI — Version 5 Implementation Plan

## Top-Level Overview

**Goal**: Elevate ClearPath AI from a functional V4 prototype to a premium, polished product that feels trustworthy, intentional, and human — Apple-like clarity with warm editorial identity.

**Scope**: UI polish across all views (hero, guided flow, results, dashboard), replacement of all emoji icons with Lucide, a real product-preview section, PDF client-side text extraction, and design system refinements. No breaking changes to watsonx.ai integration, localStorage system, API routes, or protected lib files.

**Approach**: Modular, phase-by-phase. Each phase targets a named set of files. Protected files (`lib/watsonx.ts`, `lib/prompts.ts`, `app/api/analyze/route.ts`, `.env.local`) are never touched. The watsonx analysis flow is preserved end-to-end.

**Phase 3 (PDF Upload) is deferred.** No new dependencies will be installed. Upload PDF remains a polished "coming soon" tab. PDF extraction will be a separate future task.

---

## Phase 1 — Hero + Product Preview + Navigation Polish

### Sub-Task 1.1 — Hero Rewrite

**Intent**: Replace the current generic centered headline + three equal cards with a premium product-focused hero that immediately communicates what ClearPath does, who it's for, and why it's trustworthy.

**Expected Outcomes**:
- New headline: "Understand the document. Know the deadline. Take the next step."
- New subheading describing the product purpose and audiences
- Trust labels: "Powered by IBM watsonx.ai", "Saved locally in your browser", "Built for students and newcomers"
- No emoji in hero
- Lucide icons only
- Less empty space, more intentional layout

**Todo List**:
1. Open `components/Hero.tsx` and read current implementation fully
2. Replace headline text with the approved copy
3. Replace subheading with the approved copy
4. Remove any emoji from trust badges, replace with appropriate Lucide icons (ShieldCheck, LayoutDashboard, Sparkles)
5. Tighten vertical spacing — reduce padding that creates awkward empty space
6. Keep the existing CTA button and sample document flow intact

**Relevant Context**:
- File: `components/Hero.tsx`
- Current trust badges: "Powered by IBM watsonx.ai" (Sparkles), "Private & Secure" (Shield), "Results in Seconds" (Clock)
- Keep `IBMBadge` usage or inline equivalent
- Color: use `text-foreground` and `text-muted-foreground` from design system
- Font: section-label utility class for audience label row

**Status**: [ ] pending

---

### Sub-Task 1.2 — Three Value Cards → Process Flow

**Intent**: Transform the three equal value cards into a numbered 1–2–3 process flow (Understand → Organize → Respond) with connecting visual cue, refined copy, and Lucide icons. Makes the product story clear at a glance.

**Expected Outcomes**:
- Three cards numbered 1, 2, 3
- Labels: Understand, Organize, Respond
- Revised copy per card (see requirements)
- Lucide icons: FileText (Understand), FolderCheck (Organize), MessageSquareText (Respond)
- Subtle connecting line or step connector between cards on desktop
- Subtle hover state (lift shadow only, no color flash)
- No emoji anywhere

**Todo List**:
1. In `components/Hero.tsx`, locate the three value/feature cards section
2. Replace card content with numbered step layout
3. Add step number (01, 02, 03) as small uppercase tracked label above icon
4. Add refined copy per spec
5. Add subtle connecting line between cards using a pseudo-divider (a thin horizontal rule visible only on md+ screens)
6. Apply `hover-lift` utility class from globals.css for hover state
7. Remove any remaining emoji

**Relevant Context**:
- File: `components/Hero.tsx`
- Utility: `hover-lift` exists in `app/globals.css`
- Typography: `section-label` class for numbered labels
- Lucide icons available: `FileText`, `FolderCheck`, `MessageSquareText` — all already in `lucide-react` package

**Status**: [ ] pending

---

### Sub-Task 1.3 — Product Preview Section (Static)

**Intent**: Add a new static visual section below the hero that shows a realistic "mini result card" preview. This lets users and judges immediately understand ClearPath's output before they use it. It is purely visual — no AI call.

**Expected Outcomes**:
- New section between hero and document input
- Shows a mock document title: "Workshop registration incomplete"
- Shows: summary text, a deadline card (Aug 12 — Submit consent form and student ID photo), a short task list (2–3 items), a risk badge (medium), a greyed-out "Save to Dashboard" button, and a small "Analyzed with IBM watsonx.ai" badge
- Clearly labeled as a preview ("See what ClearPath produces" or similar section label)
- Warm card styling, no interactivity
- Mobile responsive (stacks gracefully)

**Todo List**:
1. Create new file: `components/ProductPreview.tsx`
2. Build static layout using existing Card, Badge, and Button components from `components/ui/`
3. Use `IBMBadge` component for the badge at the bottom
4. Use `RiskBadge` component or inline equivalent for risk indicator
5. Add a section label using `.section-label` utility
6. Import and render `ProductPreview` in `app/page.tsx` between Hero and DocumentInput (only when view === 'analyze' and no results yet)
7. Ensure the section does not appear on results or dashboard views

**Relevant Context**:
- File to create: `components/ProductPreview.tsx`
- File to edit: `app/page.tsx` (one import + one render)
- Existing: `components/IBMBadge.tsx`, `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/RiskBadge.tsx`
- Design: warm ivory background, soft shadow, editorial spacing

**Status**: [ ] pending

---

### Sub-Task 1.4 — Header Polish

**Intent**: Make the header feel clean, sticky, and product-grade. Currently adequate but can be tighter and more intentional.

**Expected Outcomes**:
- Frosted/blurred sticky header (backdrop-blur with semi-transparent background)
- Better horizontal spacing and padding
- Navigation tabs (Analyze / Dashboard) feel like clean pill tabs, not just links
- IBM watsonx badge present and legible
- Language selector still works
- Mobile-responsive (hamburger not needed — just ensure no overflow)

**Todo List**:
1. Open `components/Header.tsx` and read current implementation
2. Add `backdrop-blur-sm` and semi-transparent `bg-background/80` to header wrapper
3. Tighten inner padding and spacing
4. Style nav tabs as a subtle pill container with active state using primary color
5. Verify IBM badge is visible without crowding
6. Test at mobile width — ensure no horizontal overflow

**Relevant Context**:
- File: `components/Header.tsx`
- File: `components/Navigation.tsx` (tab rendering)
- Tailwind: `backdrop-blur-sm`, `bg-background/80` supported in Tailwind 4
- Keep all existing props and callbacks intact

**Status**: [ ] pending

---

## Phase 2 — Guided Flow Polish + Icon Cleanup

### Sub-Task 2.1 — Remove All Emoji from Components

**Intent**: Replace every emoji character in the main UI components with Lucide React icons. Emoji feel inconsistent with the premium editorial direction. Lucide icons are already installed and used in 23 places.

**Expected Outcomes**:
- Zero emoji in any rendered UI text
- Every former emoji replaced with an appropriate thin Lucide icon
- Visual hierarchy maintained or improved

**Todo List**:
1. Grep the codebase for emoji characters: `📄`, `✅`, `💬`, `📅`, `🏠`, `🎓`, `💡`
2. For each occurrence, identify the component file and context
3. Replace with Lucide equivalents:
   - 📄 → `FileText`
   - ✅ → `CheckCircle2`
   - 💬 → `MessageSquareText`
   - 📅 → `CalendarDays`
   - 🏠 → `Home`
   - 🎓 → `GraduationCap` (already used in `DocumentTypeSelector`)
   - 💡 → `Sparkles` or `Lightbulb`
4. Size icons consistently: `h-4 w-4` for inline, `h-5 w-5` for section headers
5. Wrap icons in `aria-hidden="true"` where purely decorative

**Relevant Context**:
- Files likely containing emoji: `components/DocumentsSection.tsx`, `components/Hero.tsx`, `components/UserTypeSelector.tsx`, `components/DocumentTypeSelector.tsx`
- Lucide React version: 1.21.0 — all listed icons are available

**Status**: [ ] pending

---

### Sub-Task 2.2 — User Type Selector Polish

**Intent**: The user type selector in Step 1 currently uses gradient backgrounds per card. Make it feel more refined and premium — clear selection states, calm hover, and better typography.

**Expected Outcomes**:
- Cards feel elegant, not garish
- Selected state uses a clean border + background tint (sage green family), not a loud gradient
- Unselected cards use warm off-white with subtle border
- Hover uses the `hover-lift` shadow
- Icons are Lucide only (check existing — if any emoji, replace)
- Typography: user type name in `font-serif`, description in small `text-muted-foreground`

**Todo List**:
1. Open `components/UserTypeSelector.tsx` and read fully
2. Remove gradient background classes from card variants
3. Apply selected state: `border-primary bg-primary/5` with a small check icon in corner
4. Apply unselected state: `border-border bg-card hover:shadow-soft-md`
5. Verify icons are Lucide, not emoji
6. Adjust typography per design system

**Relevant Context**:
- File: `components/UserTypeSelector.tsx`
- Design tokens: `border-primary`, `bg-primary/5`, `bg-card`, `text-muted-foreground`
- Utility: `hover-lift` in globals.css

**Status**: [ ] pending

---

### Sub-Task 2.3 — Document Type Selector Polish

**Intent**: Make the document type grid in Step 2 visually clean and easy to scan. Currently functional but can be more refined.

**Expected Outcomes**:
- Same clean selection state as user type selector (consistent visual language)
- Icons are Lucide only (already uses Lucide per inventory)
- Document type examples text is legible in muted color
- Mobile: 2-column grid

**Todo List**:
1. Open `components/DocumentTypeSelector.tsx` and read fully
2. Apply same selection state pattern as Sub-Task 2.2
3. Verify all icons are Lucide (already confirmed in inventory)
4. Ensure mobile grid works at 2-col

**Relevant Context**:
- File: `components/DocumentTypeSelector.tsx`
- Already uses Lucide icons per inventory

**Status**: [ ] pending

---

### Sub-Task 2.4 — Input Method Tabs Polish

**Intent**: Make the Paste Text / Upload PDF / Scan Image tabs feel like a real product feature tab bar, even when two are "coming soon." The tab bar is the visual bridge into Step 3.

**Expected Outcomes**:
- Active tab (Paste Text) has a clean underline or pill indicator
- Upload PDF tab shows as tappable with a "Coming Soon" badge that will be removed in Phase 3
- Scan Image tab shows with a "Future Roadmap" label
- Tabs do not look disabled/broken — they look like intentional product states
- No emoji in tab labels

**Todo List**:
1. Open `components/InputMethodTabs.tsx` and read fully
2. Style active tab with clean indicator (underline or filled pill in primary color)
3. Update Upload PDF badge text to "Available in Phase 3" or remove/change — for now show as a clean "coming soon" state
4. Update Scan Image to show "OCR — Planned next" as the label
5. Add note below tabs: "Image scanning and OCR are planned next."

**Relevant Context**:
- File: `components/InputMethodTabs.tsx`
- This tab will be updated again in Phase 3 when PDF upload is wired up

**Status**: [ ] pending

---

### Sub-Task 2.5 — Step Indicator Improvement

**Intent**: The 3-step flow currently lacks a clear visual step indicator. Adding a simple numbered step indicator (1 → 2 → 3) at the top of `DocumentInput.tsx` makes the flow legible and premium-feeling.

**Expected Outcomes**:
- A small horizontal step row: "1 Who are you?" → "2 Document type" → "3 Your document"
- Completed steps show check, active step is highlighted, future steps are muted
- Does not change any logic — purely visual

**Todo List**:
1. Open `components/DocumentInput.tsx` and read the current step-conditional rendering logic
2. Derive current step number from existing state (userType set = step ≥ 2, documentType set = step ≥ 3)
3. Add a `StepIndicator` inline (no new file needed if simple enough — inline in DocumentInput)
4. Use Lucide `Check` icon for completed steps
5. Style: step circles with `bg-primary text-white` for active/done, `bg-muted text-muted-foreground` for future

**Relevant Context**:
- File: `components/DocumentInput.tsx`
- State: `userType` and `documentType` already tracked as props or internal state
- Typography: `section-label` class for step labels

**Status**: [ ] pending

---

## Phase 3 — PDF Upload (Client-Side Text Extraction)

### Sub-Task 3.1 — PDF Extraction Utility

**Intent**: Create a clean, isolated helper that extracts text from a PDF file using `pdfjs-dist`. This runs 100% in the browser. No file is uploaded to any server. The extracted text flows into the existing textarea exactly as if the user typed it.

**Dependency**: `pdfjs-dist`
- Package: `pdfjs-dist`
- Why: Mozilla's PDF.js library — the only reliable, widely-used Apache-2.0 PDF text extraction library that works client-side in a browser environment
- Bundle size: ~300KB gzipped (loaded only when user selects a PDF)
- Risk: Low — well-maintained, no server calls, no privacy concerns
- Files affected: `lib/pdfExtract.ts` (new), `components/InputMethodTabs.tsx` (updated)
- Runs: Client-side only
- **Must be approved before this phase runs**

**Expected Outcomes**:
- `lib/pdfExtract.ts` exports `extractTextFromPDF(file: File): Promise<string>`
- Function validates file type (PDF only) and size (≤ 5MB)
- Extracts text from all pages and concatenates
- Throws a user-friendly error if no text is found (likely a scanned/image PDF)
- Never stores the file or the full extracted text in localStorage (the existing 500-char truncation in `storage.ts` handles the save side)

**Todo List**:
1. Install `pdfjs-dist` (approve first)
2. Create `lib/pdfExtract.ts`
3. Import pdfjs-dist with worker configured for Next.js (use `pdfjs-dist/build/pdf.worker.mjs` as worker src via URL pattern)
4. Implement `extractTextFromPDF(file: File): Promise<string>` that reads all pages
5. Add validation: reject non-PDF MIME types, reject files > 5MB
6. Add a note constant: `SCANNED_PDF_NOTE = "Scanned PDFs may not extract text. OCR is a future roadmap feature."`
7. Export both

**Relevant Context**:
- File to create: `lib/pdfExtract.ts`
- Pattern: async, throws descriptive Error objects for UI to catch
- Do NOT import in any server-side file — keep client-only

**Status**: [ ] pending

---

### Sub-Task 3.2 — Wire PDF Upload into Input Flow

**Intent**: Connect the PDF extraction utility to the Upload PDF tab in `InputMethodTabs.tsx`. The user selects a PDF, sees a loading state, then sees the extracted text appear in the textarea — ready to analyze with watsonx.

**Expected Outcomes**:
- Upload PDF tab is now active (not "coming soon")
- File input appears when tab is selected — accepts PDF only, max 5MB
- Loading spinner shows during extraction
- On success: extracted text appears in textarea, user can review and edit before clicking Analyze
- On error: accessible error message shown (no text found, wrong file type, too large)
- Note shown below input: "Scanned PDFs may not extract text. OCR is a future roadmap feature."
- Scan Image tab remains "coming soon / planned next"
- Full PDF file is never saved to localStorage (existing storage.ts truncation handles this)
- Analyze button and watsonx flow unchanged

**Todo List**:
1. Open `components/InputMethodTabs.tsx`
2. Add internal state: `pdfLoading`, `pdfError`
3. Add file input (hidden, triggered by a styled button) that accepts `.pdf` only
4. On file select, call `extractTextFromPDF(file)` from `lib/pdfExtract.ts`
5. Pass extracted text up via `onTextChange` callback (already exists as prop)
6. Show `Loader2` spinner during extraction
7. Show error in a styled error message below the input
8. Show scanned PDF note as muted text under the upload button
9. Remove "Coming Soon" badge from Upload PDF tab

**Relevant Context**:
- File: `components/InputMethodTabs.tsx`
- Callback: `onTextChange` prop already connects to parent `DocumentInput.tsx` → `app/page.tsx` → textarea
- Lucide: `Loader2`, `Upload`, `AlertCircle` all available

**Status**: [ ] pending

---

## Phase 4 — Results + Dashboard Polish

### Sub-Task 4.1 — Results Visual Hierarchy

**Intent**: Improve the results page so sections feel grouped, labeled, and easy to scan. The AI data structure is unchanged — only the presentation layer is polished.

**Expected Outcomes**:
- Clear section group labels: UNDERSTAND, ACT, PREPARE, REPLY, SIMPLIFY (already present — make them more prominent)
- "Analyzed with IBM watsonx.ai" indicator at top of results (not just in badge)
- If `metadata.mode === 'demo'`, show a visible "Demo fallback mode" banner at top
- Save CTA copy: "Save this plan" (primary) + "View Dashboard" (secondary)
- Disclaimer present but less visually loud — reduce to a small muted note at bottom, not a blue alert box at top

**Todo List**:
1. Open `components/ResultsDisplay.tsx` and read fully
2. Add a results header row: "Your Document Analysis" + IBM badge inline
3. Add conditional demo mode banner (check metadata prop if passed down, or derive from a prop)
4. Update Save button copy to "Save this plan"
5. Move `Disclaimer` component to bottom of results, reduce visual weight (use inline text instead of Alert box, or use a smaller bordered note)
6. Ensure section labels (UNDERSTAND, ACT, etc.) are clearly visible using `section-label` class

**Relevant Context**:
- File: `components/ResultsDisplay.tsx`
- File: `components/Disclaimer.tsx`
- File: `components/SaveAnalysisButton.tsx`
- File: `components/IBMBadge.tsx`
- The metadata (mode: 'ai' | 'demo') is returned in the API response and available in `app/page.tsx` state

**Status**: [ ] pending

---

### Sub-Task 4.2 — Dashboard Polish

**Intent**: Make the dashboard feel like a command center — not just a list. Priority: upcoming deadlines, open tasks, then document history.

**Expected Outcomes**:
- Stats cards are visually refined (clear number + label, good icon)
- Saved document cards show document type, date, risk badge, and a clear "View" CTA
- Deadline cards show: date, title, source document, risk/importance, days remaining
- Task checklist interactions are smooth (checkbox, strikethrough on complete)
- Empty states are polished (e.g., "No saved analyses yet. Start by analyzing a document.")
- Privacy note added: "Analyses are saved locally in your browser. Nothing is sent to a server."
- Filter bar is clean and functional

**Todo List**:
1. Open `components/Dashboard.tsx` and read fully
2. Open `components/DashboardStats.tsx` and read fully
3. Open `components/SavedDocumentsList.tsx` and read fully
4. Open `components/MiniCalendar.tsx` and read fully
5. Open `components/TaskListView.tsx` and read fully
6. Polish stats cards: larger number, smaller muted label, Lucide icon
7. Polish saved document cards: show type badge + risk badge, clear date, "View" button with right arrow
8. Polish deadline cards in `MiniCalendar`: show days-remaining badge, color by importance
9. Polish task list: smooth checkbox toggle, strikethrough on complete, grouped clearly
10. Add polished empty states to `SavedDocumentsList` and `TaskListView`
11. Add privacy note to `Dashboard.tsx` footer
12. Verify filter bar (`FilterBar.tsx`) is clean

**Relevant Context**:
- Files: `components/Dashboard.tsx`, `components/DashboardStats.tsx`, `components/SavedDocumentsList.tsx`, `components/MiniCalendar.tsx`, `components/TaskListView.tsx`, `components/FilterBar.tsx`
- Data: all from `lib/storage.ts` functions — do not change storage logic

**Status**: [ ] pending

---

## Phase 5 — QA, Responsiveness, Accessibility, Privacy

### Sub-Task 5.1 — Responsive Audit

**Intent**: Verify the entire app works cleanly on mobile (375px) and tablet (768px) without horizontal overflow, cramped tap targets, or broken layouts.

**Expected Outcomes**:
- No horizontal overflow at any breakpoint
- All buttons have minimum 44px touch target
- Hero, product preview, value cards, step flow, results, dashboard all stack gracefully
- PDF upload error messages are readable at small sizes

**Todo List**:
1. Review Hero, ProductPreview, and value cards at small breakpoints
2. Review DocumentInput step flow on mobile
3. Review ResultsDisplay on mobile — sections stack, no truncation
4. Review Dashboard on mobile — two columns collapse to one
5. Fix any overflow or spacing issues found

**Relevant Context**:
- Tailwind breakpoints: `sm` = 640px, `md` = 768px, `lg` = 1024px
- Mobile-first approach: fix sm then scale up

**Status**: [ ] pending

---

### Sub-Task 5.2 — Accessibility Pass

**Intent**: Ensure keyboard navigation, focus states, ARIA labels, and color contrast meet WCAG AA minimums.

**Expected Outcomes**:
- All interactive elements have visible focus rings (already defined in globals.css)
- File input for PDF upload has accessible label
- Error messages for PDF use `role="alert"`
- Demo fallback banner has appropriate role
- No content relies solely on color to convey meaning

**Todo List**:
1. Add `aria-label` or `<label>` to PDF file input
2. Add `role="alert"` to PDF error messages
3. Verify step indicator has `aria-current="step"` on active step
4. Verify dashboard empty states are announced correctly
5. Spot-check contrast of muted text colors (already using design system — low risk)

**Relevant Context**:
- Globals: focus ring defined with `ring-2 ring-primary/50` on `:focus-visible`
- WCAG: contrast for `text-muted-foreground` (#6B7566 on #F9F8F4) should be checked

**Status**: [ ] pending

---

### Sub-Task 5.3 — Privacy and Trust Notes

**Intent**: Add small, calm privacy and trust notes in the appropriate places throughout the app without being alarming.

**Expected Outcomes**:
- Hero: "Saved locally in your browser" (already planned in 1.1)
- Dashboard footer: "Saved analyses are stored locally in your browser for this demo. Nothing is sent to a server."
- PDF upload area: "Do not upload highly sensitive personal documents in this demo."
- Results page: disclaimer moved and softened (covered in 4.1)
- Tone: calm, informative, not scary

**Todo List**:
1. Confirm privacy note in Dashboard footer (from Sub-Task 4.2)
2. Add PDF privacy note in `InputMethodTabs.tsx` upload section (from Sub-Task 3.2)
3. Confirm hero trust label (from Sub-Task 1.1)
4. Confirm results disclaimer is softened (from Sub-Task 4.1)

**Relevant Context**:
- All notes are static strings, no new components needed
- This sub-task is largely verification that prior sub-tasks included the notes

**Status**: [ ] pending

---

### Sub-Task 5.4 — Final Watsonx Verification Checklist

**Intent**: Confirm that after all V5 changes, the IBM watsonx.ai analysis flow still works end-to-end. This is a verification pass, not a code change.

**Expected Outcomes**:
- POST to `/api/analyze` still works
- Mock fallback still works when watsonx is disabled
- `metadata.mode` is correctly passed through to ResultsDisplay for the demo banner
- PDF-extracted text passes through the same flow as pasted text
- No changes to `lib/watsonx.ts`, `lib/prompts.ts`, or `app/api/analyze/route.ts`
- `.env.local` is untouched

**Todo List**:
1. Trace the `handleAnalyze` flow in `app/page.tsx` from text input → API call → result rendering
2. Verify `extractTextFromPDF` output is assigned to `documentText` state before calling analyze
3. Confirm `app/api/analyze/route.ts` is unchanged
4. Confirm `.env.local` is unchanged
5. Run the app locally and test: paste text → analyze → save → view dashboard
6. Run the app locally and test: upload PDF → extract → analyze → save → view dashboard (after Phase 3)

**Relevant Context**:
- Protected files: `lib/watsonx.ts`, `lib/prompts.ts`, `app/api/analyze/route.ts`, `.env.local`
- Key function: `handleAnalyze` in `app/page.tsx`
- Mock mode: `ENABLE_AI_MODE=false` in `.env.local` triggers mock fallback

**Status**: [ ] pending

---

## File Change Summary

### Files to Edit
| File | Phase | What Changes |
|------|-------|--------------|
| `components/Hero.tsx` | 1 | Headline, subheading, trust badges, value cards → process flow |
| `components/Header.tsx` | 1 | Frosted sticky, spacing, nav pill styles |
| `components/Navigation.tsx` | 1 | Tab active state styling |
| `components/DocumentInput.tsx` | 2 | Add step indicator |
| `components/UserTypeSelector.tsx` | 2 | Remove gradients, refine selection state |
| `components/DocumentTypeSelector.tsx` | 2 | Consistent selection state |
| `components/InputMethodTabs.tsx` | 2+3 | Tab polish in Phase 2; PDF upload wired in Phase 3 |
| `components/DocumentsSection.tsx` | 2 | Replace 📄 emoji with FileText icon |
| `components/ResultsDisplay.tsx` | 4 | Section labels, IBM badge, demo banner, save CTA copy |
| `components/Disclaimer.tsx` | 4 | Reduce visual weight |
| `components/SaveAnalysisButton.tsx` | 4 | Update CTA copy |
| `components/Dashboard.tsx` | 4 | Layout polish, privacy note |
| `components/DashboardStats.tsx` | 4 | Stats card polish |
| `components/SavedDocumentsList.tsx` | 4 | Card polish, empty state |
| `components/MiniCalendar.tsx` | 4 | Deadline card polish |
| `components/TaskListView.tsx` | 4 | Task interaction polish, empty state |
| `app/page.tsx` | 1 | Import + render ProductPreview |

### Files to Create
| File | Phase | Purpose |
|------|-------|---------|
| `components/ProductPreview.tsx` | 1 | Static product mockup section |
| `lib/pdfExtract.ts` | 3 | Client-side PDF text extraction utility |

### Files NOT Touched
| File | Reason |
|------|--------|
| `.env.local` | Protected — no changes ever |
| `lib/watsonx.ts` | Protected — AI integration unchanged |
| `lib/prompts.ts` | Protected — prompt logic unchanged |
| `app/api/analyze/route.ts` | Protected — API route unchanged |
| `lib/storage.ts` | No changes needed |
| `lib/types.ts` | No changes needed |
| `lib/mockData.ts` | No changes needed |
| `lib/utils.ts` | No changes needed |
| `app/globals.css` | No changes needed — existing utilities sufficient |
| `tailwind.config.ts` | No changes needed — design tokens sufficient |
| `app/layout.tsx` | No changes needed |
| `components/ui/*` | No changes needed |

### Dependency to Install (Phase 3 only, requires approval)
| Package | Reason | Size | Side Effects |
|---------|--------|------|--------------|
| `pdfjs-dist` | Client-side PDF text extraction, no server needed | ~300KB gzipped | None — loaded only on PDF tab selection |

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Breaking watsonx flow | Very Low | Protected files untouched; only page.tsx render layer changes |
| PDF extraction fails on scanned PDFs | Expected | Error message + note about OCR roadmap already planned |
| pdfjs-dist worker config issues in Next.js | Low | Use dynamic import + public worker URL pattern, well-documented |
| localStorage data lost | None | storage.ts not touched |
| Design regression on mobile | Low | Responsive audit sub-task (5.1) catches this |
| Emoji missed in audit | Low | Grep pass in sub-task 2.1 catches all instances |
| Secret exposure | None | .env.local untouched, no new API calls, PDF is client-side only |

---

## PDF Upload: Real or Staged?

**Decision: Real PDF extraction (full implementation)**

Rationale: `pdfjs-dist` is a mature, well-supported library with clear Next.js integration patterns. The implementation is isolated to `lib/pdfExtract.ts` and `InputMethodTabs.tsx`. It runs 100% client-side. The risk is low and the user experience payoff is significant. There is no server-side risk, no file storage, and the existing analysis flow is unchanged after text extraction.

If `pdfjs-dist` causes any unexpected issues during Phase 3, the fallback is to render the Upload tab as a polished "coming soon" state while keeping Phase 1, 2, and 4 complete.

---

## How Watsonx Will Be Verified After Changes
1. Confirm `app/api/analyze/route.ts` diff shows no changes
2. Confirm `lib/watsonx.ts` diff shows no changes
3. Trace `handleAnalyze` in `app/page.tsx` — same function, same call
4. Test mock fallback (works when `ENABLE_AI_MODE=false`)
5. Verify PDF path: extracted text → same `documentText` state → same `handleAnalyze` call

## How PDF Upload Will Be Verified
1. Upload a text-based PDF → text appears in textarea → click Analyze → mock/watsonx result appears
2. Upload a scanned-only PDF → error message appears → note about OCR shown
3. Upload a non-PDF file → validation error appears
4. Upload a PDF > 5MB → size error appears

## How Dashboard/localStorage Will Be Verified
1. Analyze a document → save → view dashboard → verify it appears
2. Check localStorage in DevTools — no full PDF binary stored
3. Delete an item from dashboard → verify it's removed
4. Verify storage.ts is not modified

## How .env.local Will Be Verified
1. Check git diff — `.env.local` must show no changes
2. Grep codebase for any new references to env vars (should be zero)

## How Secrets Will Be Verified
1. `pdfjs-dist` is client-side only — no secrets needed
2. No new API routes added
3. No new environment variables
4. No console.log statements printing any config values
