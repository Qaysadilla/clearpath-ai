# ClearPath AI - Version 3 Architecture Diagrams

## System Architecture Overview

```mermaid
graph TB
    subgraph "User Layer"
        A[Web Browser]
    end
    
    subgraph "Next.js Application"
        B[React UI Components]
        C[app/page.tsx]
        D[API Route: /api/analyze]
    end
    
    subgraph "AI Integration Layer"
        E[lib/watsonx.ts]
        F[lib/prompts.ts]
        G[lib/mockData.ts]
    end
    
    subgraph "IBM Cloud"
        H[watsonx.ai API]
        I[Granite Model]
    end
    
    A -->|Paste Document| B
    B -->|User Action| C
    C -->|POST Request| D
    D -->|Call AI| E
    E -->|Use Prompts| F
    E -->|API Request| H
    H -->|Inference| I
    I -->|JSON Response| H
    H -->|Structured Data| E
    E -->|Parse & Validate| D
    D -->|Error?| G
    G -->|Fallback Data| D
    D -->|AnalysisResult| C
    C -->|Update State| B
    B -->|Render Results| A
```

## Data Flow Sequence

```mermaid
sequenceDiagram
    participant User
    participant UI as React UI
    participant API as API Route
    participant Client as watsonx Client
    participant IBM as IBM watsonx.ai
    participant Mock as Mock Data

    User->>UI: Paste document text
    User->>UI: Click "Analyze"
    UI->>UI: Show loading state
    UI->>API: POST /api/analyze
    
    API->>API: Validate input
    API->>Client: analyzeDocument()
    Client->>Client: Build prompt
    Client->>IBM: POST with document
    
    alt Success
        IBM->>Client: JSON response
        Client->>API: Parsed result
        API->>UI: AnalysisResult
        UI->>User: Display results
    else API Error
        IBM-->>Client: Error
        Client->>Mock: Get fallback
        Mock->>API: Mock result
        API->>UI: AnalysisResult (mock)
        UI->>User: Display results + warning
    else Network Error
        Client-->>API: Error
        API->>Mock: Get fallback
        Mock->>API: Mock result
        API->>UI: AnalysisResult (mock)
        UI->>User: Display results + warning
    end
```

## Component Architecture

```mermaid
graph LR
    subgraph "Frontend Components - No Changes"
        A[DocumentInput]
        B[ResultsDisplay]
        C[SummarySection]
        D[DeadlinesSection]
        E[ActionsSection]
        F[ChecklistSection]
        G[DraftReplySection]
        H[SimplerExplanation]
    end
    
    subgraph "New Backend Components"
        I[API Route]
        J[watsonx Client]
        K[Prompt Templates]
    end
    
    subgraph "Existing Backend - Preserved"
        L[Mock Data]
        M[Types]
    end
    
    A -->|Submit| I
    I --> J
    J --> K
    I -->|Fallback| L
    I -->|Return| B
    B --> C
    B --> D
    B --> E
    B --> F
    B --> G
    B --> H
```

## File Structure Changes

```
clearpath-ai/
├── app/
│   ├── page.tsx                    [MODIFIED] - API call instead of mock
│   ├── layout.tsx                  [NO CHANGE]
│   ├── globals.css                 [NO CHANGE]
│   └── api/
│       └── analyze/
│           └── route.ts            [NEW] - Main API endpoint
│
├── components/                     [NO CHANGES TO ANY COMPONENTS]
│   ├── ui/
│   ├── Header.tsx
│   ├── DocumentInput.tsx
│   ├── ResultsDisplay.tsx
│   └── [all other components]
│
├── lib/
│   ├── watsonx.ts                  [NEW] - IBM AI client
│   ├── prompts.ts                  [NEW] - Prompt templates
│   ├── mockData.ts                 [NO CHANGE] - Keep as fallback
│   ├── types.ts                    [MINOR] - Add API types
│   └── utils.ts                    [NO CHANGE]
│
├── .env.local                      [NEW] - API credentials
├── .env.example                    [NEW] - Template
└── package.json                    [OPTIONAL] - Add zod
```

## API Request/Response Flow

```mermaid
graph TD
    A[User Input] -->|Document Text| B{Input Valid?}
    B -->|No| C[Return 400 Error]
    B -->|Yes| D[Build AI Prompt]
    D --> E{API Key Set?}
    E -->|No| F[Use Mock Data]
    E -->|Yes| G[Call watsonx.ai]
    G --> H{Response OK?}
    H -->|Yes| I[Parse JSON]
    H -->|No| J[Retry Once]
    J --> K{Retry OK?}
    K -->|Yes| I
    K -->|No| F
    I --> L{Valid JSON?}
    L -->|Yes| M[Validate Schema]
    L -->|No| F
    M --> N{Schema Valid?}
    N -->|Yes| O[Add Safety Disclaimers]
    N -->|No| P[Use Defaults]
    P --> O
    O --> Q[Return Result]
    F --> Q
    C --> R[End]
    Q --> R
```

## Safety Layer Architecture

```mermaid
graph TB
    subgraph "Input Layer"
        A[Document Text]
    end
    
    subgraph "Detection Layer"
        B[Detect Legal Content]
        C[Detect Medical Content]
        D[Detect Immigration Content]
        E[Detect Financial Content]
    end
    
    subgraph "Prompt Layer"
        F[Safety Instructions]
        G[Analysis Prompt]
    end
    
    subgraph "Processing Layer"
        H[watsonx.ai]
    end
    
    subgraph "Validation Layer"
        I[Check for Advice]
        J[Validate Disclaimers]
    end
    
    subgraph "Output Layer"
        K[Add Disclaimers]
        L[Final Result]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    B --> F
    C --> F
    D --> F
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
```

## Error Handling Flow

```mermaid
graph TD
    A[API Request] --> B{Input Valid?}
    B -->|No| C[400 Bad Request]
    B -->|Yes| D[Try watsonx.ai]
    D --> E{Success?}
    E -->|Yes| F[Parse Response]
    E -->|No| G{Retry?}
    G -->|Yes| D
    G -->|No| H[Log Error]
    F --> I{Valid JSON?}
    I -->|Yes| J[Return Result]
    I -->|No| H
    H --> K[Use Mock Fallback]
    K --> L[Add Warning Flag]
    L --> J
    C --> M[End]
    J --> M
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        A[Local Machine]
        B[.env.local]
        C[npm run dev]
    end
    
    subgraph "Version Control"
        D[GitHub Repository]
        E[.env.example]
    end
    
    subgraph "Vercel Platform"
        F[Build Process]
        G[Environment Variables]
        H[Production Deployment]
    end
    
    subgraph "IBM Cloud"
        I[watsonx.ai API]
        J[Granite Model]
    end
    
    A --> D
    B -.->|Not committed| D
    E -->|Committed| D
    D --> F
    G --> F
    F --> H
    H -->|API Calls| I
    I --> J
```

## Mode Toggle Architecture

```mermaid
graph LR
    A[User Interface] --> B{Mode Selection}
    B -->|AI Mode| C[Call API Route]
    B -->|Demo Mode| D[Use Mock Data]
    C --> E{API Available?}
    E -->|Yes| F[watsonx.ai]
    E -->|No| D
    F --> G[AI Result]
    D --> H[Mock Result]
    G --> I[Display Results]
    H --> I
```

## Token Flow & Cost Management

```mermaid
graph TD
    A[Document Input] --> B[Calculate Length]
    B --> C{Within Limit?}
    C -->|No| D[Truncate/Reject]
    C -->|Yes| E[Build Prompt]
    E --> F[Estimate Tokens]
    F --> G{Under Budget?}
    G -->|No| H[Use Smaller Model]
    G -->|Yes| I[Call watsonx.ai]
    H --> I
    I --> J[Track Usage]
    J --> K{Near Limit?}
    K -->|Yes| L[Enable Mock Mode]
    K -->|No| M[Continue]
    D --> N[Return Error]
    L --> O[Notify User]
    M --> P[Return Result]
    O --> P
    N --> Q[End]
    P --> Q
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-24  
**Purpose**: Visual reference for Version 3 architecture