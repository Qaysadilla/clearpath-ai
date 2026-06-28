# ClearPath AI — Document-to-Action Command Center

> **Hackathon Submission — Wildcard Challenge: Build Intelligent Systems for the Future of Work**

ClearPath AI helps students, newcomers, immigrants, workers, and families turn confusing documents into plain-language summaries, deadlines, tasks, checklists, draft replies, and multilingual action plans.

## Live Demo

[Try ClearPath AI](https://clearpath-ai-weld.vercel.app)

---

## The Problem

Many people receive important school, housing, government, medical, work, or billing documents that are confusing, stressful, or easy to miss. A missed deadline or a missing required document can have real consequences — a lost apartment application, a lapsed visa, an unpaid bill, or a missed appointment.

Most people don't have a lawyer, a case worker, or an expert on call. They navigate these documents alone, often in a second language, under pressure.

---

## The Solution

ClearPath AI uses **IBM watsonx.ai** to analyze pasted document text and return a fully structured action plan. In seconds, the app extracts:

- A plain-language summary
- Key deadlines
- Required actions
- Documents needed
- Risk level assessment
- Step-by-step checklist
- A draft reply
- A simpler / ESL-friendly explanation
- AI-powered translation into Arabic, French, and Spanish

Users can save analyses locally and track all upcoming deadlines and open tasks in a unified **Dashboard Command Center**.

---

## Challenge Theme

**Wildcard Challenge — Build Intelligent Systems for the Future of Work**

ClearPath AI is an intelligent system that removes the friction of navigating complex documents — enabling people to act confidently, meet deadlines, and stay organized regardless of their background, language, or access to professional support.

---

## Key Features

| Feature | Description |
|---|---|
| Guided flow | User type and document type selection before analysis |
| AI-powered analysis | IBM watsonx.ai converts document text into a structured action plan |
| Structured output | Summary, deadlines, actions, documents needed, risk level |
| Checklist | Step-by-step task list generated from the document |
| Draft reply | AI-generated draft response letter or reply |
| Simpler explanation | Plain-language and ESL-friendly restatement of the document |
| AI translation | Translate the generated action plan into Arabic, French, or Spanish |
| Save to dashboard | Analyses saved to localStorage for later review |
| Dashboard command center | View all saved plans, upcoming deadlines, and open tasks |
| Mock fallback mode | Demo stays functional even if AI is unavailable |
| Safety disclaimers | Clear messaging that the app is not professional advice |
| Responsive UI | Warm, premium design that works on all screen sizes |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Icons | Lucide React |
| AI Provider | IBM watsonx.ai |
| AI Model | Llama 3.3 70B Instruct via IBM watsonx.ai |
| Storage | localStorage (browser) |

---

## AI Architecture

```
User pastes document text
        │
        ▼
Next.js frontend collects text + user/document type
        │
        ▼
API route (/api/analyze) receives the request
        │
        ▼
Server-side code calls IBM watsonx.ai with a structured prompt
        │
        ▼
watsonx.ai returns structured JSON (summary, deadlines, actions, etc.)
        │
        ▼
App validates and parses the AI response
        │
        ▼
UI renders: summary · deadlines · actions · documents · risk
            checklist · draft reply · simpler explanation
            translated action plan when requested
        │
        ▼ (if AI unavailable)
Mock fallback keeps the demo running with realistic sample data
```
A separate `/api/translate` route translates the generated action plan into Arabic, French, or Spanish while preserving dates, deadlines, names, risk labels, and task structure.

**Security:** All API keys and secrets are stored in `.env.local` and are never committed to the repository.

---

## How IBM watsonx.ai Is Used

IBM watsonx.ai is the core intelligence engine of ClearPath AI. The app sends unstructured document text to watsonx.ai with a carefully engineered prompt that instructs the model to return a structured JSON object. That JSON is then validated and rendered directly into the app's UI as a full action plan. Watsonx.ai also powers the translation feature. After an action plan is generated, users can translate the structured result into Arabic, French, or Spanish. The translation prompt is designed to preserve dates, names, deadlines, risk labels, and task meaning while making the plan more accessible to multilingual users.

watsonx.ai transforms a raw, confusing document into something immediately actionable — no manual parsing, no guesswork.

---

## How IBM Bob Was Used

IBM Bob was used throughout the full development lifecycle of ClearPath AI:

- **Project planning** — defining the problem, solution architecture, and feature scope
- **Next.js setup** — scaffolding the App Router project structure
- **Component scaffolding** — building UI components including the analysis form, results view, and dashboard
- **watsonx.ai integration** — planning the API route, prompt engineering, and JSON response parsing
- **UI polish** — refining layouts, spacing, color, and responsive behavior
- **Accessibility pass** — reviewing components for screen reader and keyboard accessibility
- **Dashboard and localStorage** — implementing save/load logic and the command center view
- **Debugging** — resolving JSON parsing edge cases and date display inconsistencies

All generated outputs were reviewed, tested, and manually adjusted throughout development.

---

## Safety & Limitations

> ⚠️ **ClearPath AI is not legal, immigration, medical, or financial advice.**
> Always consult a qualified professional for decisions that affect your rights, status, health, or finances.

- Saved analyses are stored in **browser localStorage only** — they are not synced or backed up
- The current prototype requires **pasted text** — PDF and image upload is on the roadmap
- **Do not paste highly sensitive personal documents** in the demo version
- This is a prototype; outputs may contain errors and should be verified

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Create a file named `.env.local` in the project root with the following variables:

```env
WATSONX_URL=
WATSONX_PROJECT_ID=
WATSONX_API_KEY=
WATSONX_MODEL_ID=
ENABLE_AI_MODE=true
ENABLE_MOCK_FALLBACK=true
MAX_DOCUMENT_LENGTH=5000
```

> **Never commit `.env.local` to version control.** It is listed in `.gitignore`.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Demo Flow

1. **Select your user type** — student, newcomer, worker, family, etc.
2. **Select document type** — school, housing, government, medical, billing, etc.
3. **Paste your document** — copy and paste the text you received
4. **Analyze with IBM watsonx.ai** — click Analyze and wait a few seconds
5. **Review your action plan** — summary, deadlines, checklist, draft reply, and more
6. **Translate the action plan** — view the generated plan in Arabic, French, or Spanish
7. **Save this plan** — store the analysis to your local dashboard
8. **Open the dashboard** — view all saved plans, upcoming deadlines, and open tasks

---

## Screenshots

### Homepage
<img width="2940" height="1846" alt="image" src="https://github.com/user-attachments/assets/534e09dd-e08e-41fe-94a6-429a911e0e95" />


### Guided Analysis Flow
<img width="1470" height="923" alt="image" src="https://github.com/user-attachments/assets/e7382633-6739-4650-bcb2-63f2eba7140f" />

### AI Results
<img width="1470" height="923" alt="image" src="https://github.com/user-attachments/assets/5f2fa168-43f2-48fe-a521-4fbe7003ae34" />
<img width="1470" height="923" alt="image" src="https://github.com/user-attachments/assets/9a6c6b35-e584-48fc-ba2f-d1ad82a97c14" />

### Dashboard Command Center
<img width="1470" height="923" alt="image" src="https://github.com/user-attachments/assets/c18c929a-ef9a-44b8-8021-4d2690e143cb" />

---

## Roadmap

- [ ] PDF text extraction
- [ ] OCR support for scanned documents and images
- [ ] Secure user accounts
- [ ] Encrypted database storage
- [ ] Calendar export and sync (Google Calendar, iCal)
- [ ] Expanded translation coverage across the full app UI
- [ ] Deadline reminders and notifications
- [ ] Multi-document folders and organization

---

## License

This project was built for a hackathon. All rights reserved by the authors.

---

<p align="center">Built with IBM watsonx.ai · IBM Bob · Next.js</p>
