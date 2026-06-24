# ClearPath AI - Version 1 Mock Prototype Plan

## Version 1 Goal

Create a polished local web app that demonstrates the ClearPath AI user flow using **mock AI output only**. No real AI integration, no authentication, no database, no file upload.

---

## What Version 1 Includes

✅ Homepage with problem/solution explanation  
✅ Text area for pasting documents  
✅ Three sample document quick-load buttons  
✅ "Analyze Document" button  
✅ Mock results with all 8 sections  
✅ Clean, responsive styling  
✅ Legal disclaimer  

❌ NO IBM watsonx.ai integration  
❌ NO OpenAI integration  
❌ NO API credentials needed  
❌ NO authentication  
❌ NO database  
❌ NO file upload  

---

## Terminal Commands (In Order)

### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**Prompts you'll see:**
- ✔ Would you like to use TypeScript? → **Yes**
- ✔ Would you like to use ESLint? → **Yes**
- ✔ Would you like to use Tailwind CSS? → **Yes**
- ✔ Would you like to use `src/` directory? → **No**
- ✔ Would you like to use App Router? → **Yes**
- ✔ Would you like to customize the default import alias? → **No**

### Step 2: Install Additional Dependencies
```bash
npm install lucide-react class-variance-authority clsx tailwind-merge
```

**What these do:**
- `lucide-react` - Icon library
- `class-variance-authority` - For component variants
- `clsx` + `tailwind-merge` - For conditional Tailwind classes

### Step 3: Install shadcn/ui CLI (Optional but Recommended)
```bash
npx shadcn-ui@latest init
```

**Prompts:**
- ✔ Which style would you like to use? → **Default**
- ✔ Which color would you like to use as base color? → **Slate**
- ✔ Would you like to use CSS variables for colors? → **Yes**

### Step 4: Install shadcn/ui Components
```bash
npx shadcn-ui@latest add button card textarea badge alert
```

### Step 5: Start Development Server
```bash
npm run dev
```

**Access at:** http://localhost:3000

---

## Files to Create/Edit

### Configuration Files (Auto-generated, may need tweaks)

1. **`package.json`** - Already created by create-next-app
2. **`tsconfig.json`** - Already created by create-next-app
3. **`tailwind.config.ts`** - Already created, may customize colors
4. **`next.config.js`** - Already created
5. **`.gitignore`** - Already exists, ensure `.env.local` is included

### Core Application Files (We'll Create)

6. **`app/layout.tsx`** - Root layout with metadata
   - Sets up HTML structure
   - Adds global fonts
   - Includes metadata for SEO

7. **`app/page.tsx`** - Main application page
   - Homepage with hero section
   - Document input area
   - Results display
   - Handles mock analysis logic

8. **`app/globals.css`** - Global styles
   - Tailwind directives
   - Custom CSS variables
   - Base styles

### Component Files (We'll Create)

9. **`components/Header.tsx`**
   - App logo/title
   - Tagline
   - Navigation (if needed)

10. **`components/Hero.tsx`**
    - Problem statement
    - Solution explanation
    - Call-to-action

11. **`components/DocumentInput.tsx`**
    - Large textarea for document text
    - Character counter
    - Sample document buttons
    - "Analyze Document" button

12. **`components/ResultsDisplay.tsx`**
    - Container for all result sections
    - Conditional rendering (only show after analysis)

13. **`components/SummarySection.tsx`**
    - Plain-language summary display
    - Icon + heading + content

14. **`components/DeadlinesSection.tsx`**
    - List of deadlines with dates
    - Days until deadline
    - Importance indicators

15. **`components/ActionsSection.tsx`**
    - Prioritized action list
    - Priority badges (high/medium/low)

16. **`components/DocumentsSection.tsx`**
    - List of required documents
    - Checkable items

17. **`components/RiskBadge.tsx`**
    - Color-coded risk indicator
    - Risk explanation

18. **`components/ChecklistSection.tsx`**
    - Interactive checklist
    - Checkboxes for each step

19. **`components/DraftReplySection.tsx`**
    - Email subject and body
    - Copy-to-clipboard button

20. **`components/SimplerExplanation.tsx`**
    - ESL-friendly version
    - Collapsible section

21. **`components/LoadingState.tsx`**
    - Loading animation
    - Shows while "analyzing"

22. **`components/Disclaimer.tsx`**
    - Legal disclaimer
    - Positioned at bottom

### Utility Files (We'll Create)

23. **`lib/types.ts`**
    - TypeScript interfaces for all data structures
    - AnalysisResult, Deadline, Action, etc.

24. **`lib/mockData.ts`**
    - Mock analysis results for 3 sample documents
    - Pre-written responses for demo

25. **`lib/utils.ts`**
    - Utility functions (cn for classnames)
    - Date formatting helpers

### Sample Document Files (We'll Create)

26. **`sample-documents/sample-appointment-letter.txt`**
    - Medical appointment confirmation

27. **`sample-documents/sample-housing-notice.txt`**
    - Housing eviction notice

28. **`sample-documents/sample-school-email.txt`**
    - University financial aid email

### shadcn/ui Component Files (Auto-generated)

29. **`components/ui/button.tsx`** - Button component
30. **`components/ui/card.tsx`** - Card component
31. **`components/ui/textarea.tsx`** - Textarea component
32. **`components/ui/badge.tsx`** - Badge component
33. **`components/ui/alert.tsx`** - Alert component

---

## File Creation Order

### Phase 1: Project Setup (5 minutes)
1. Run `npx create-next-app@latest`
2. Run `npm install` for additional dependencies
3. Run `npx shadcn-ui@latest init`
4. Run `npx shadcn-ui@latest add button card textarea badge alert`

### Phase 2: Foundation (10 minutes)
5. Create [`lib/types.ts`](lib/types.ts) - TypeScript interfaces
6. Create [`lib/utils.ts`](lib/utils.ts) - Utility functions
7. Create [`lib/mockData.ts`](lib/mockData.ts) - Mock analysis results
8. Update [`app/globals.css`](app/globals.css) - Custom styles

### Phase 3: Sample Documents (5 minutes)
9. Create [`sample-documents/sample-appointment-letter.txt`](sample-documents/sample-appointment-letter.txt)
10. Create [`sample-documents/sample-housing-notice.txt`](sample-documents/sample-housing-notice.txt)
11. Create [`sample-documents/sample-school-email.txt`](sample-documents/sample-school-email.txt)

### Phase 4: Layout Components (15 minutes)
12. Update [`app/layout.tsx`](app/layout.tsx) - Root layout
13. Create [`components/Header.tsx`](components/Header.tsx) - App header
14. Create [`components/Hero.tsx`](components/Hero.tsx) - Hero section
15. Create [`components/Disclaimer.tsx`](components/Disclaimer.tsx) - Legal disclaimer

### Phase 5: Input Components (15 minutes)
16. Create [`components/DocumentInput.tsx`](components/DocumentInput.tsx) - Input area
17. Create [`components/LoadingState.tsx`](components/LoadingState.tsx) - Loading animation

### Phase 6: Result Components (30 minutes)
18. Create [`components/ResultsDisplay.tsx`](components/ResultsDisplay.tsx) - Container
19. Create [`components/SummarySection.tsx`](components/SummarySection.tsx)
20. Create [`components/DeadlinesSection.tsx`](components/DeadlinesSection.tsx)
21. Create [`components/ActionsSection.tsx`](components/ActionsSection.tsx)
22. Create [`components/DocumentsSection.tsx`](components/DocumentsSection.tsx)
23. Create [`components/RiskBadge.tsx`](components/RiskBadge.tsx)
24. Create [`components/ChecklistSection.tsx`](components/ChecklistSection.tsx)
25. Create [`components/DraftReplySection.tsx`](components/DraftReplySection.tsx)
26. Create [`components/SimplerExplanation.tsx`](components/SimplerExplanation.tsx)

### Phase 7: Main Page Integration (20 minutes)
27. Update [`app/page.tsx`](app/page.tsx) - Main application logic
28. Connect all components
29. Implement mock analysis logic
30. Add state management

### Phase 8: Polish & Testing (20 minutes)
31. Responsive design adjustments
32. Color scheme refinement
33. Typography improvements
34. Test all interactions
35. Fix any bugs

**Total Time: ~2 hours**

---

## What Each File Does

### Core Files

**`app/layout.tsx`**
- Wraps entire application
- Sets up fonts (Inter, etc.)
- Includes metadata (title, description)
- Provides consistent layout

**`app/page.tsx`**
- Main application logic
- State management (document text, results, loading)
- Handles "Analyze" button click
- Simulates 2-3 second delay
- Returns mock results based on document type
- Renders all components

**`app/globals.css`**
- Tailwind CSS directives
- Custom CSS variables for colors
- Base styles for typography
- Utility classes

### Component Files

**`components/Header.tsx`**
- ClearPath AI logo/title
- Tagline: "Turn confusion into clarity"
- Simple, clean design

**`components/Hero.tsx`**
- Problem statement (2-3 sentences)
- Solution explanation (2-3 sentences)
- Visual appeal with icons

**`components/DocumentInput.tsx`**
- Large textarea (10+ rows)
- Placeholder text
- Character counter (e.g., "0 / 5000")
- Three sample document buttons
- "Analyze Document" button (primary CTA)
- Disabled state when empty

**`components/LoadingState.tsx`**
- Animated spinner or skeleton
- "Analyzing your document..." text
- Shows for 2-3 seconds

**`components/ResultsDisplay.tsx`**
- Container with padding
- Grid layout for sections
- Only renders when results exist

**`components/SummarySection.tsx`**
- Icon (📋 or FileText)
- Heading: "Summary"
- Plain-language text
- Card with border

**`components/DeadlinesSection.tsx`**
- Icon (⏰ or Clock)
- Heading: "Important Deadlines"
- List of deadlines with:
  - Date (formatted)
  - Description
  - Days until (calculated)
  - Importance badge

**`components/ActionsSection.tsx`**
- Icon (✅ or CheckSquare)
- Heading: "Required Actions"
- Ordered list with:
  - Action description
  - Priority badge (high/medium/low)
  - Estimated time

**`components/DocumentsSection.tsx`**
- Icon (📄 or FileText)
- Heading: "Documents Needed"
- Bulleted list
- Checkboxes (optional)

**`components/RiskBadge.tsx`**
- Icon (⚠️ or AlertTriangle)
- Heading: "Risk Level"
- Large badge (LOW/MEDIUM/HIGH)
- Color-coded:
  - Low: Green
  - Medium: Yellow
  - High: Red
- Explanation text

**`components/ChecklistSection.tsx`**
- Icon (☑️ or ListChecks)
- Heading: "Step-by-Step Checklist"
- Interactive checkboxes
- Each step has:
  - Checkbox
  - Description
  - Optional notes

**`components/DraftReplySection.tsx`**
- Icon (✉️ or Mail)
- Heading: "Draft Reply"
- Email subject (bold)
- Email body (formatted)
- "Copy to Clipboard" button

**`components/SimplerExplanation.tsx`**
- Icon (🌐 or Globe)
- Heading: "Simpler Explanation"
- Collapsible section
- Simple vocabulary
- Shorter sentences

**`components/Disclaimer.tsx`**
- Alert component
- Warning icon
- Text: "ClearPath AI does not provide legal, immigration, financial, or medical advice. This tool helps you understand documents and organize next steps. Consult professionals for specific guidance."

### Utility Files

**`lib/types.ts`**
```typescript
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
}

export interface Deadline {
  date: string;
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
```

**`lib/utils.ts`**
- `cn()` function for merging Tailwind classes
- Date formatting helpers
- Text truncation utilities

**`lib/mockData.ts`**
- Three pre-written mock results
- One for each sample document
- Realistic, detailed responses
- Demonstrates all 8 sections

### Sample Documents

**`sample-documents/sample-appointment-letter.txt`**
- Medical appointment confirmation
- Low risk
- Simple actions

**`sample-documents/sample-housing-notice.txt`**
- Eviction notice
- High risk
- Urgent deadlines

**`sample-documents/sample-school-email.txt`**
- Financial aid verification
- Medium risk
- Multiple documents needed

---

## Mock Analysis Logic

In [`app/page.tsx`](app/page.tsx):

```typescript
const handleAnalyze = async () => {
  setIsLoading(true);
  setResults(null);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Determine which mock result to use
  let mockResult;
  if (documentText.includes('appointment') || documentText.includes('medical')) {
    mockResult = mockData.appointmentResult;
  } else if (documentText.includes('eviction') || documentText.includes('vacate')) {
    mockResult = mockData.housingResult;
  } else if (documentText.includes('financial aid') || documentText.includes('verification')) {
    mockResult = mockData.schoolResult;
  } else {
    // Default generic result
    mockResult = mockData.genericResult;
  }
  
  setResults(mockResult);
  setIsLoading(false);
};
```

---

## Color Scheme

### Primary Colors
- **Primary**: Blue (#3B82F6) - Trust, clarity
- **Success**: Green (#10B981) - Low risk, completed
- **Warning**: Yellow (#F59E0B) - Medium risk, attention
- **Danger**: Red (#EF4444) - High risk, urgent

### Neutral Colors
- **Background**: White (#FFFFFF)
- **Surface**: Gray-50 (#F9FAFB)
- **Border**: Gray-200 (#E5E7EB)
- **Text**: Gray-900 (#111827)
- **Muted**: Gray-500 (#6B7280)

---

## Responsive Design

### Breakpoints
- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns for results)
- **Desktop**: > 1024px (3 columns for results)

### Layout
- Mobile: Stack all sections vertically
- Tablet: 2-column grid for result sections
- Desktop: 3-column grid for result sections

---

## User Flow

1. **Landing**: User sees hero section with problem/solution
2. **Input**: User pastes document or clicks sample button
3. **Analyze**: User clicks "Analyze Document" button
4. **Loading**: 2-3 second loading animation
5. **Results**: All 8 sections appear with mock data
6. **Interact**: User can check checklist items, copy draft reply
7. **New Document**: User can clear and analyze another document

---

## Success Criteria for Version 1

✅ Clean, professional design  
✅ Responsive on mobile, tablet, desktop  
✅ All 8 sections display correctly  
✅ Sample documents load instantly  
✅ Loading state shows for 2-3 seconds  
✅ Mock results are realistic and detailed  
✅ Disclaimer is clearly visible  
✅ No console errors  
✅ Fast page load (< 2 seconds)  
✅ Ready for demo  

---

## What's NOT in Version 1

❌ Real AI integration  
❌ API routes  
❌ Database  
❌ Authentication  
❌ File upload  
❌ Multi-language support  
❌ User accounts  
❌ Save/export functionality  
❌ Email integration  

These will come in Version 2 after the mock prototype is approved.

---

## Next Steps After Version 1

1. **Demo the prototype** to stakeholders
2. **Gather feedback** on UI/UX
3. **Refine design** based on feedback
4. **Plan Version 2** with real AI integration
5. **Get IBM watsonx.ai credentials**
6. **Implement real API** in Version 2

---

**Ready to proceed?** Once you approve this plan, I'll start creating the files in the order specified above.