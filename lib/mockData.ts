import { AnalysisResult } from './types';

// Calculate days until a date
const calculateDaysUntil = (dateString: string): number => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// SAMPLE APPOINTMENT RESULT - All data is fictional for demonstration
export const appointmentResult: AnalysisResult = {
  summary: "SAMPLE ANALYSIS: This demonstrates how ClearPath AI analyzes a medical appointment letter. In this fictional example, you have an appointment with Dr. Jane Demo on July 8, 2026 at 2:30 PM at Demo Medical Center. You would need to fast for 12 hours before and bring specific documents. (This is sample data only)",
  
  deadlines: [
    {
      date: "2026-07-08",
      description: "Sample appointment with Dr. Demo (fictional)",
      daysUntil: calculateDaysUntil("2026-07-08"),
      importance: "critical"
    },
    {
      date: "2026-07-06",
      description: "Sample cancellation deadline (fictional)",
      daysUntil: calculateDaysUntil("2026-07-06"),
      importance: "important"
    },
    {
      date: "2026-07-05",
      description: "Sample accommodation request deadline (fictional)",
      daysUntil: calculateDaysUntil("2026-07-05"),
      importance: "normal"
    }
  ],
  
  actions: [
    {
      action: "SAMPLE: Fast for 12 hours before appointment (fictional example)",
      priority: "high",
      deadline: "July 8, 2026",
      estimatedTime: "12 hours"
    },
    {
      action: "SAMPLE: Gather required documents (fictional example)",
      priority: "high",
      deadline: "July 8, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "SAMPLE: Arrive 15 minutes early for registration (fictional example)",
      priority: "medium",
      deadline: "July 8, 2026",
      estimatedTime: "15 minutes"
    },
    {
      action: "SAMPLE: Prepare medication list (fictional example)",
      priority: "medium",
      deadline: "July 7, 2026",
      estimatedTime: "15 minutes"
    }
  ],
  
  documentsNeeded: [
    "Health Card (sample)",
    "Photo ID (sample)",
    "Medication list (sample)",
    "Referral letter (sample)",
    "Previous test results (sample)"
  ],
  
  riskLevel: "low",
  riskExplanation: "SAMPLE ANALYSIS: This demonstrates a low-risk scenario. In a real appointment situation, the main considerations would be: attending on time, following preparation instructions, and bringing required documents. This is fictional data for demonstration only.",
  
  checklist: [
    {
      step: "SAMPLE: Mark appointment date in calendar (fictional)",
      completed: false,
      notes: "This is a demonstration checklist item"
    },
    {
      step: "SAMPLE: Gather health card and ID (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Create medication list (fictional)",
      completed: false,
      notes: "Demonstration only"
    },
    {
      step: "SAMPLE: Collect previous test results (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Plan transportation (fictional)",
      completed: false,
      notes: "This is sample data"
    }
  ],
  
  draftReply: {
    subject: "SAMPLE: Appointment Confirmation (Fictional)",
    body: `SAMPLE EMAIL - FOR DEMONSTRATION ONLY

Dear [Recipient Name],

Thank you for the appointment confirmation. This is a sample response showing how you might confirm an appointment.

I understand that I need to:
- Attend on [date] at [time]
- Bring required documents
- Follow preparation instructions

I have a question about [specific concern].

Thank you for your assistance.

Best regards,
[Your Name]

NOTE: This is fictional sample text for demonstration purposes.`,
    tone: "professional"
  },
  
  simplerExplanation: "SAMPLE EXPLANATION: You have a doctor visit on July 8 at 2:30 PM. Don't eat or drink (except water) for 12 hours before. Bring your health card, ID, and medicine list. Come 15 minutes early. If you can't come, call 2 days before. (This is fictional sample data for demonstration only)",
  
  ultraSimpleExplanation: `SAMPLE - ULTRA SIMPLE VERSION:
• Doctor visit: July 8, 2:30 PM
• No food 12 hours before
• Bring: health card, ID, medicine list
• Come early: 2:15 PM
• Can't come? Call 2 days before

(This is fictional demonstration data)`
};

// SAMPLE HOUSING RESULT - All data is fictional and uses safer language
export const housingResult: AnalysisResult = {
  summary: "SAMPLE ANALYSIS: This demonstrates how ClearPath AI analyzes a rent notice. In this fictional example, there is an outstanding rent balance of $3,600 for May and June 2026. The notice shows a payment deadline of July 11, 2026, with options to pay in full, arrange a payment plan, or discuss the situation. (This is sample data only - not a real legal notice)",
  
  deadlines: [
    {
      date: "2026-07-11",
      description: "SAMPLE: Payment or discussion deadline (fictional)",
      daysUntil: calculateDaysUntil("2026-07-11"),
      importance: "critical"
    },
    {
      date: "2026-06-27",
      description: "SAMPLE: Recommended contact date (fictional)",
      daysUntil: calculateDaysUntil("2026-06-27"),
      importance: "important"
    },
    {
      date: "2026-06-24",
      description: "SAMPLE: Seek advice date (fictional)",
      daysUntil: calculateDaysUntil("2026-06-24"),
      importance: "important"
    }
  ],
  
  actions: [
    {
      action: "SAMPLE: Contact property management to discuss options (fictional)",
      priority: "high",
      deadline: "June 27, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "SAMPLE: Seek advice from community resources (fictional)",
      priority: "high",
      deadline: "June 24, 2026",
      estimatedTime: "1 hour"
    },
    {
      action: "SAMPLE: Gather financial documents (fictional)",
      priority: "high",
      deadline: "June 27, 2026",
      estimatedTime: "1 hour"
    },
    {
      action: "SAMPLE: Explore payment options (fictional)",
      priority: "medium",
      deadline: "July 1, 2026",
      estimatedTime: "Varies"
    }
  ],
  
  documentsNeeded: [
    "Copy of notice (sample)",
    "Lease agreement (sample)",
    "Payment records (sample)",
    "Income documentation (sample)",
    "Bank statements (sample)",
    "Communication records (sample)"
  ],
  
  riskLevel: "medium",
  riskExplanation: "SAMPLE ANALYSIS: This demonstrates a medium-risk scenario. In a real rent situation, it would be important to: communicate promptly with the landlord, understand your rights and options, seek professional advice, and explore payment arrangements. This is fictional data for demonstration only - always consult with legal professionals for real situations.",
  
  checklist: [
    {
      step: "SAMPLE: Contact property management (fictional)",
      completed: false,
      notes: "Demonstration checklist item"
    },
    {
      step: "SAMPLE: Seek community advice (fictional)",
      completed: false,
      notes: "This is sample data"
    },
    {
      step: "SAMPLE: Gather documents (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Calculate payment options (fictional)",
      completed: false,
      notes: "Demonstration only"
    },
    {
      step: "SAMPLE: Explore assistance programs (fictional)",
      completed: false
    }
  ],
  
  draftReply: {
    subject: "SAMPLE: Response to Rent Notice (Fictional)",
    body: `SAMPLE EMAIL - FOR DEMONSTRATION ONLY

Dear [Property Manager Name],

I am writing regarding the rent notice dated [date].

I acknowledge the outstanding balance and would like to discuss options for resolving this situation. I am experiencing [brief explanation] and am committed to finding a solution.

I would appreciate the opportunity to discuss:
- Payment arrangement options
- Timeline for resolution
- Any available assistance programs

I am available [days/times] and can be reached at [contact information].

Thank you for your consideration.

Sincerely,
[Your Name]

NOTE: This is fictional sample text for demonstration purposes.`,
    tone: "formal"
  },
  
  simplerExplanation: "SAMPLE EXPLANATION: You owe $3,600 for rent (May and June). You must pay by July 11 or talk to the landlord about a payment plan. Call them before June 27. Also get free advice from a community legal clinic. You have options - don't ignore this. (This is fictional sample data for demonstration only)",
  
  ultraSimpleExplanation: `SAMPLE - ULTRA SIMPLE VERSION:
• Rent owed: $3,600
• Pay by: July 11
• Or: Make payment plan
• Call landlord: Before June 27
• Get free help: Legal clinic
• Don't ignore this paper

(This is fictional demonstration data)`
};

// SAMPLE SCHOOL RESULT - All data is fictional
export const schoolResult: AnalysisResult = {
  summary: "SAMPLE ANALYSIS: This demonstrates how ClearPath AI analyzes a financial aid verification letter. In this fictional example, you need to submit verification documents by July 5, 2026 at 5:00 PM to maintain $13,500 in financial aid. Required documents include tax forms, ID, and household information. (This is sample data only)",
  
  deadlines: [
    {
      date: "2026-07-05",
      description: "SAMPLE: Document submission deadline (fictional)",
      daysUntil: calculateDaysUntil("2026-07-05"),
      importance: "critical"
    },
    {
      date: "2026-08-01",
      description: "SAMPLE: Other deadline (fictional)",
      daysUntil: calculateDaysUntil("2026-08-01"),
      importance: "important"
    },
    {
      date: "2026-08-15",
      description: "SAMPLE: Payment deadline (fictional)",
      daysUntil: calculateDaysUntil("2026-08-15"),
      importance: "important"
    }
  ],
  
  actions: [
    {
      action: "SAMPLE: Download and complete forms (fictional)",
      priority: "high",
      deadline: "June 30, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "SAMPLE: Request tax documents (fictional)",
      priority: "high",
      deadline: "June 28, 2026",
      estimatedTime: "1 hour"
    },
    {
      action: "SAMPLE: Gather required documents (fictional)",
      priority: "high",
      deadline: "June 30, 2026",
      estimatedTime: "Varies"
    },
    {
      action: "SAMPLE: Upload documents (fictional)",
      priority: "high",
      deadline: "July 5, 2026",
      estimatedTime: "30 minutes"
    }
  ],
  
  documentsNeeded: [
    "Verification form (sample)",
    "Tax documents (sample)",
    "Photo ID (sample)",
    "Citizenship proof (sample)",
    "Household form (sample)"
  ],
  
  riskLevel: "medium",
  riskExplanation: "SAMPLE ANALYSIS: This demonstrates a medium-risk scenario with a clear deadline. In a real financial aid situation, it would be important to: gather documents promptly, meet the deadline, contact the office with questions, and keep copies of submissions. This is fictional data for demonstration only.",
  
  checklist: [
    {
      step: "SAMPLE: Download verification form (fictional)",
      completed: false,
      notes: "Demonstration checklist"
    },
    {
      step: "SAMPLE: Complete form (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Request tax documents (fictional)",
      completed: false,
      notes: "This is sample data"
    },
    {
      step: "SAMPLE: Gather ID documents (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Upload all documents (fictional)",
      completed: false,
      notes: "Demonstration only"
    }
  ],
  
  draftReply: {
    subject: "SAMPLE: Financial Aid Verification Question (Fictional)",
    body: `SAMPLE EMAIL - FOR DEMONSTRATION ONLY

Dear Financial Aid Office,

Thank you for your notification regarding verification requirements.

I am working on gathering the required documents and have a few questions:

1. [Your first question]
2. [Your second question]
3. [Any other questions]

I want to ensure I submit everything correctly by the deadline. Please let me know if you need any additional information.

Thank you for your assistance.

Best regards,
[Your Name]
[Student ID]

NOTE: This is fictional sample text for demonstration purposes.`,
    tone: "professional"
  },
  
  simplerExplanation: "SAMPLE EXPLANATION: The school needs to check your financial aid papers. Send 5 types of documents by July 5 at 5 PM. If you don't send them, you won't get $13,500 for school. You need: tax papers, ID, citizenship paper, family form, and job papers. Upload on school website. Need help? Call the school office. (This is fictional sample data for demonstration only)",
  
  ultraSimpleExplanation: `SAMPLE - ULTRA SIMPLE VERSION:
• School needs papers by July 5, 5 PM
• Need 5 types of papers
• Don't send = lose $13,500
• Papers: taxes, ID, citizenship, family info, job info
• Upload on school website
• Need help? Call school

(This is fictional demonstration data)`
};

// GENERIC RESULT - For unknown document types
export const genericResult: AnalysisResult = {
  summary: "SAMPLE ANALYSIS: This is a generic analysis for demonstration purposes. ClearPath AI would analyze the document content and provide relevant information about deadlines, actions, and requirements. (This is sample data only)",
  
  deadlines: [
    {
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "SAMPLE: Estimated response deadline (fictional)",
      daysUntil: 14,
      importance: "important"
    }
  ],
  
  actions: [
    {
      action: "SAMPLE: Review document carefully (fictional)",
      priority: "high",
      estimatedTime: "15-30 minutes"
    },
    {
      action: "SAMPLE: Identify deadlines (fictional)",
      priority: "high",
      estimatedTime: "10 minutes"
    },
    {
      action: "SAMPLE: Contact sender if needed (fictional)",
      priority: "medium",
      estimatedTime: "30 minutes"
    }
  ],
  
  documentsNeeded: [
    "Documents mentioned in original (sample)",
    "Proof of identity if required (sample)",
    "Supporting documentation (sample)"
  ],
  
  riskLevel: "medium",
  riskExplanation: "SAMPLE ANALYSIS: This demonstrates how ClearPath AI would assess risk level. In a real situation, it would be important to: read carefully, note deadlines, gather required information, and contact the sender with questions. This is fictional data for demonstration only.",
  
  checklist: [
    {
      step: "SAMPLE: Read document thoroughly (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Note all dates and deadlines (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: List required actions (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Gather documents (fictional)",
      completed: false
    },
    {
      step: "SAMPLE: Contact sender if needed (fictional)",
      completed: false
    }
  ],
  
  draftReply: {
    subject: "SAMPLE: Response (Fictional)",
    body: `SAMPLE EMAIL - FOR DEMONSTRATION ONLY

Dear [Recipient Name],

Thank you for your [letter/email/notice].

I have reviewed the information and would like to clarify:
1. [Your question]
2. [Your concern]

Please let me know if you need any additional information.

Thank you.

Best regards,
[Your Name]

NOTE: This is fictional sample text for demonstration purposes.`,
    tone: "professional"
  },
  
  simplerExplanation: "SAMPLE EXPLANATION: This is an important paper. Read it carefully. Look for dates when you must do something. Look for things you must send. If you don't understand, call or email the person who sent it. Don't wait - do this soon. (This is fictional sample data for demonstration only)",
  
  ultraSimpleExplanation: `SAMPLE - ULTRA SIMPLE VERSION:
• Important paper
• Read carefully
• Find dates
• Find what to do
• Don't understand? Call them
• Do it soon

(This is fictional demonstration data)`
};

// Helper function to determine which mock result to use based on document content
export const getMockResult = (documentText: string): AnalysisResult => {
  const lowerText = documentText.toLowerCase();
  
  if (lowerText.includes('appointment') || lowerText.includes('medical') || lowerText.includes('hospital') || lowerText.includes('doctor') || lowerText.includes('dr.')) {
    return appointmentResult;
  } else if (lowerText.includes('eviction') || lowerText.includes('vacate') || lowerText.includes('rent') || lowerText.includes('landlord') || lowerText.includes('n4')) {
    return housingResult;
  } else if (lowerText.includes('financial aid') || lowerText.includes('verification') || lowerText.includes('tuition') || lowerText.includes('university') || lowerText.includes('college') || lowerText.includes('osap')) {
    return schoolResult;
  } else {
    return genericResult;
  }
};

// Made with Bob
