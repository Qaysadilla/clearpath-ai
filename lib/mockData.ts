import { AnalysisResult } from './types';

// Calculate days until a date
const calculateDaysUntil = (dateString: string): number => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const appointmentResult: AnalysisResult = {
  summary: "You have a cardiology appointment with Dr. Sarah Chen on July 8, 2026 at 2:30 PM at Memorial Hospital. This is a follow-up appointment to review your recent ECG results and discuss treatment options. You need to fast for 12 hours before the appointment and bring specific documents.",
  
  deadlines: [
    {
      date: "2026-07-08",
      description: "Cardiology appointment with Dr. Chen",
      daysUntil: calculateDaysUntil("2026-07-08"),
      importance: "critical"
    },
    {
      date: "2026-07-06",
      description: "Last day to cancel without $50 fee (48 hours notice required)",
      daysUntil: calculateDaysUntil("2026-07-06"),
      importance: "important"
    },
    {
      date: "2026-07-05",
      description: "Request accommodations (wheelchair, translation) if needed",
      daysUntil: calculateDaysUntil("2026-07-05"),
      importance: "normal"
    }
  ],
  
  actions: [
    {
      action: "Fast for 12 hours before appointment (no food/drink except water after 2:30 AM on July 8)",
      priority: "high",
      deadline: "July 8, 2026",
      estimatedTime: "12 hours"
    },
    {
      action: "Gather all required documents (health card, photo ID, medication list, previous test results)",
      priority: "high",
      deadline: "July 8, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "Arrive 15 minutes early (2:15 PM) for registration",
      priority: "medium",
      deadline: "July 8, 2026",
      estimatedTime: "15 minutes"
    },
    {
      action: "Prepare list of current medications with dosages",
      priority: "medium",
      deadline: "July 7, 2026",
      estimatedTime: "15 minutes"
    },
    {
      action: "Call to request accommodations if needed (3 days notice)",
      priority: "low",
      deadline: "July 5, 2026",
      estimatedTime: "10 minutes"
    }
  ],
  
  documentsNeeded: [
    "Ontario Health Card (OHIP)",
    "Government-issued photo ID (driver's license, passport, or health card)",
    "List of all current medications with dosages",
    "Referral letter from Dr. James Wilson (if not already on file)",
    "Previous test results or medical records related to heart condition",
    "Recent blood work results (if available)"
  ],
  
  riskLevel: "low",
  riskExplanation: "This is a routine follow-up appointment. The main risks are: missing the appointment (which could delay your treatment and result in a $50 fee), not fasting properly (which may require rescheduling), or forgetting required documents. These are all manageable with proper preparation.",
  
  checklist: [
    {
      step: "Mark July 8, 2026 at 2:30 PM in your calendar",
      completed: false,
      notes: "Set multiple reminders"
    },
    {
      step: "Gather Ontario Health Card and photo ID",
      completed: false
    },
    {
      step: "Create list of all current medications (names and dosages)",
      completed: false,
      notes: "Include vitamins and supplements"
    },
    {
      step: "Collect any previous heart-related test results",
      completed: false
    },
    {
      step: "Check if you have Dr. Wilson's referral letter",
      completed: false,
      notes: "Call Dr. Wilson's office if you don't have it"
    },
    {
      step: "Plan transportation to Memorial Hospital, 3rd Floor",
      completed: false,
      notes: "Budget $8 for parking or plan transit route"
    },
    {
      step: "Set alarm for 2:30 AM on July 8 to stop eating/drinking",
      completed: false,
      notes: "Water is allowed after this time"
    },
    {
      step: "Leave home by 2:00 PM on July 8 to arrive early",
      completed: false
    }
  ],
  
  draftReply: {
    subject: "Appointment Confirmation - July 8, 2026 with Dr. Chen",
    body: `Dear Jennifer Martinez,

Thank you for the appointment confirmation. I am writing to confirm that I will attend my appointment with Dr. Sarah Chen on July 8, 2026 at 2:30 PM in the Cardiology Wing, 3rd Floor.

I understand that I need to:
- Fast for 12 hours before the appointment (no food or drink except water after 2:30 AM)
- Arrive 15 minutes early at 2:15 PM for registration
- Bring my Ontario Health Card, photo ID, and list of current medications
- Bring any previous test results related to my heart condition

I have a question: I am currently taking [medication name]. Should I take this medication on the morning of July 8, or should I wait until after the appointment?

Also, could you please confirm if you have Dr. Wilson's referral letter on file? If not, I will contact his office to obtain a copy.

Thank you for your assistance.

Best regards,
[Your Name]
[Your Phone Number]`,
    tone: "professional"
  },
  
  simplerExplanation: "You have a doctor appointment on July 8 at 2:30 PM. The doctor will check your heart. You must not eat or drink (except water) for 12 hours before. Bring your health card, ID, and a list of your medicines. Come 15 minutes early. If you cannot come, call 2 days before or you pay $50. Parking costs $8."
};

export const housingResult: AnalysisResult = {
  summary: "This is an eviction notice (Form N4) because you owe $3,600 in rent for May and June 2026. You must either pay the full amount by July 11, 2026, or move out by that date. If you don't pay or move out, your landlord can apply to evict you through the Landlord and Tenant Board. You have options: pay in full, arrange a payment plan, or dispute the notice.",
  
  deadlines: [
    {
      date: "2026-07-11",
      description: "CRITICAL: Pay $3,600 in full OR move out to avoid eviction proceedings",
      daysUntil: calculateDaysUntil("2026-07-11"),
      importance: "critical"
    },
    {
      date: "2026-06-27",
      description: "Last day to contact landlord to discuss payment plan",
      daysUntil: calculateDaysUntil("2026-06-27"),
      importance: "critical"
    },
    {
      date: "2026-06-24",
      description: "Contact legal clinic for free advice (as soon as possible)",
      daysUntil: calculateDaysUntil("2026-06-24"),
      importance: "important"
    }
  ],
  
  actions: [
    {
      action: "Contact Property Management immediately at (416) 555-7890 to discuss payment plan options",
      priority: "high",
      deadline: "June 27, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "Call Toronto Community Legal Clinic at (416) 555-1234 for free legal advice",
      priority: "high",
      deadline: "June 24, 2026",
      estimatedTime: "1 hour"
    },
    {
      action: "Gather proof of income, bank statements, and any evidence of financial hardship",
      priority: "high",
      deadline: "June 27, 2026",
      estimatedTime: "1 hour"
    },
    {
      action: "If you can pay: Arrange certified cheque or money order for $3,600",
      priority: "high",
      deadline: "July 11, 2026",
      estimatedTime: "2 hours"
    },
    {
      action: "If you cannot pay: Start looking for alternative housing and contact Housing Help Centre",
      priority: "medium",
      deadline: "July 1, 2026",
      estimatedTime: "Ongoing"
    },
    {
      action: "Document all communications with landlord (save emails, take notes of phone calls)",
      priority: "medium",
      deadline: "Ongoing",
      estimatedTime: "15 minutes per interaction"
    }
  ],
  
  documentsNeeded: [
    "Copy of this eviction notice (Form N4)",
    "Copy of your lease agreement",
    "Proof of rent payments (bank statements, receipts, e-transfer confirmations)",
    "Proof of income (pay stubs, employment letter, government benefits statements)",
    "Bank statements showing your financial situation",
    "Any written communication with your landlord",
    "Evidence of financial hardship (medical bills, job loss documentation, etc.)"
  ],
  
  riskLevel: "high",
  riskExplanation: "This is a serious legal situation. If you don't pay the full $3,600 by July 11 or move out, your landlord can apply to the Landlord and Tenant Board to evict you. An eviction on your record makes it very difficult to rent in the future. However, you have rights: you cannot be locked out, your utilities cannot be shut off, and you can negotiate a payment plan. You must act immediately - contact your landlord and get legal advice today.",
  
  checklist: [
    {
      step: "TODAY: Call Toronto Community Legal Clinic at (416) 555-1234 for free legal advice",
      completed: false,
      notes: "They can help you understand your rights and options"
    },
    {
      step: "TODAY: Call Property Manager Robert Chen at (416) 555-7890 ext. 102 to discuss payment plan",
      completed: false,
      notes: "Be honest about your financial situation"
    },
    {
      step: "Gather all documents: lease, rent receipts, bank statements, proof of income",
      completed: false,
      notes: "You'll need these for legal clinic and landlord"
    },
    {
      step: "Calculate what you can afford to pay now and monthly",
      completed: false,
      notes: "Be realistic - include all your expenses"
    },
    {
      step: "Write down your proposed payment plan before calling landlord",
      completed: false,
      notes: "Example: $1,000 now + $500/month for 6 months"
    },
    {
      step: "Contact Housing Help Centre at (416) 555-5678 for emergency assistance",
      completed: false,
      notes: "They may have emergency funds or other housing options"
    },
    {
      step: "If payment plan agreed: Get it in writing before making any payments",
      completed: false,
      notes: "Don't pay anything without written agreement"
    },
    {
      step: "If you can pay in full: Get certified cheque or money order for $3,600",
      completed: false,
      notes: "Personal cheques not accepted for arrears"
    },
    {
      step: "Keep copies of all communications and payments",
      completed: false,
      notes: "Take photos, save emails, write down phone call details"
    }
  ],
  
  draftReply: {
    subject: "Response to Notice to Vacate - Unit 304, 789 Maple Street - Payment Plan Request",
    body: `Dear Mr. Robert Chen,

I am writing in response to the Notice to Vacate (Form N4) dated June 20, 2026, regarding rent arrears for Unit 304, 789 Maple Street.

I acknowledge that I owe $3,600 for May and June 2026 rent. I take full responsibility for this situation. I have been experiencing financial difficulties due to [brief explanation: job loss/medical emergency/reduced hours/etc.], but I am committed to resolving this matter.

I would like to request a meeting to discuss a payment plan. I am able to pay [amount] immediately and [amount] per month until the arrears are paid in full. I believe I can have the full amount paid by [date].

My current financial situation:
- Monthly income: [amount]
- Current employment: [status]
- Ability to pay immediately: [amount]

I value my tenancy at 789 Maple Street and want to remain in good standing. I am requesting this meeting before June 27, 2026, as indicated in the notice.

Please contact me at your earliest convenience to discuss this payment arrangement. I am available [days/times] and can be reached at [phone number].

I am also seeking advice from community legal services to ensure I understand my rights and responsibilities.

Thank you for your consideration.

Sincerely,
Maria Santos
Unit 304, 789 Maple Street
[Phone Number]
[Email Address]`,
    tone: "formal"
  },
  
  simplerExplanation: "You must pay $3,600 by July 11, or move out. This is because you did not pay rent for May and June. If you cannot pay all the money, call the landlord before June 27 to make a payment plan. Also call a free legal clinic today at (416) 555-1234. They will help you. Do not ignore this paper. Your home is in danger. You have rights - the landlord cannot lock you out or turn off your water/electricity. But you must act now."
};

export const schoolResult: AnalysisResult = {
  summary: "Your financial aid application requires verification - a standard process to confirm your information is accurate. You must submit 5 types of documents by July 5, 2026 at 5:00 PM, or your $13,500 in financial aid will be cancelled. This includes tax documents, proof of identity, citizenship documents, and completed forms. If you don't complete this, you'll have to pay full tuition ($7,200) by August 15, 2026.",
  
  deadlines: [
    {
      date: "2026-07-05",
      description: "CRITICAL: Submit all verification documents by 5:00 PM or lose $13,500 in financial aid",
      daysUntil: calculateDaysUntil("2026-07-05"),
      importance: "critical"
    },
    {
      date: "2026-08-01",
      description: "Residence fees due ($4,800) - only if financial aid is approved",
      daysUntil: calculateDaysUntil("2026-08-01"),
      importance: "important"
    },
    {
      date: "2026-08-15",
      description: "Fall tuition due ($7,200) - late fees apply after this date",
      daysUntil: calculateDaysUntil("2026-08-15"),
      importance: "critical"
    }
  ],
  
  actions: [
    {
      action: "Download and complete Verification Worksheet (Form V5) from university website",
      priority: "high",
      deadline: "June 30, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "Request 2025 Notice of Assessment from Canada Revenue Agency (CRA)",
      priority: "high",
      deadline: "June 28, 2026",
      estimatedTime: "1 hour (online) or 2 weeks (by mail)"
    },
    {
      action: "Gather all T4 slips from 2025 employment",
      priority: "high",
      deadline: "June 30, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "Get parent/guardian tax documents if you're a dependent student",
      priority: "high",
      deadline: "June 30, 2026",
      estimatedTime: "1-2 days (depends on parents' availability)"
    },
    {
      action: "Make copies of photo ID and citizenship/immigration documents",
      priority: "high",
      deadline: "July 2, 2026",
      estimatedTime: "15 minutes"
    },
    {
      action: "Complete Household Information Form",
      priority: "medium",
      deadline: "July 2, 2026",
      estimatedTime: "20 minutes"
    },
    {
      action: "Upload all documents to student portal (recommended method)",
      priority: "high",
      deadline: "July 5, 2026",
      estimatedTime: "30 minutes"
    },
    {
      action: "Attend verification help session if you need assistance (Tuesdays/Thursdays 2-4 PM)",
      priority: "low",
      deadline: "Before July 5, 2026",
      estimatedTime: "1-2 hours"
    }
  ],
  
  documentsNeeded: [
    "Verification Worksheet (Form V5) - completed and signed",
    "Your 2025 Notice of Assessment from CRA",
    "All T4 slips from 2025 (from every employer)",
    "T5 slips if you have investment income",
    "Parent/guardian 2025 Notice of Assessment (if you're a dependent student)",
    "Government-issued photo ID (driver's license, passport, or health card)",
    "Proof of citizenship or immigration status (birth certificate, citizenship certificate, PR card, or study permit)",
    "Household Information Form - completed",
    "If documents not in English: certified translations with translator credentials"
  ],
  
  riskLevel: "medium",
  riskExplanation: "This is a time-sensitive administrative requirement. The risk is moderate because: (1) You have a clear deadline (July 5) with enough time to gather documents, (2) The process is straightforward but requires multiple documents, (3) Failure to complete means losing $13,500 in aid and having to pay full tuition, (4) Help is available through the financial aid office. The main risks are: missing the deadline, submitting incomplete documents, or not getting parent cooperation if you're a dependent student.",
  
  checklist: [
    {
      step: "Go to www.torontouniversity.ca/finaid/forms and download Form V5 (Verification Worksheet)",
      completed: false,
      notes: "Print it or save PDF to fill out electronically"
    },
    {
      step: "Complete all sections of Form V5 and sign it",
      completed: false,
      notes: "If dependent student, parent/guardian must also sign"
    },
    {
      step: "Log into CRA My Account at www.cra.gc.ca to download your 2025 Notice of Assessment",
      completed: false,
      notes: "If you don't have CRA account, call 1-800-959-8281 to request by mail (takes 2 weeks)"
    },
    {
      step: "Gather all T4 slips from 2025 (check with all employers you worked for)",
      completed: false,
      notes: "If you lost them, request duplicates from employers or CRA"
    },
    {
      step: "If dependent student: Ask parents for their 2025 Notice of Assessment",
      completed: false,
      notes: "Explain this is required for your financial aid - give them deadline"
    },
    {
      step: "Make clear photocopies or scans of your photo ID (both sides)",
      completed: false,
      notes: "Must be current and not expired"
    },
    {
      step: "Make copies of citizenship/immigration documents (birth certificate, PR card, etc.)",
      completed: false,
      notes: "If international student, include study permit"
    },
    {
      step: "Download and complete Household Information Form from university website",
      completed: false,
      notes: "List everyone living in your household and their income"
    },
    {
      step: "Organize all documents and check you have everything on the list",
      completed: false,
      notes: "Missing even one document will delay your aid"
    },
    {
      step: "Upload documents to student portal at portal.torontouniversity.ca",
      completed: false,
      notes: "Go to Financial Aid → Upload Documents. Save confirmation email!"
    },
    {
      step: "Check your university email daily for any follow-up requests",
      completed: false,
      notes: "Financial aid office may ask for additional information"
    }
  ],
  
  draftReply: {
    subject: "Re: Financial Aid Verification - Student ID 20261234567 - Question",
    body: `Dear Financial Aid Office,

Thank you for your email regarding the verification requirement for my financial aid application (Student ID: 20261234567).

I am working on gathering all the required documents and plan to submit them by July 5, 2026. I have a few questions to ensure I submit everything correctly:

1. I worked for two different employers in 2025. Do I need to submit both T4 slips, or just the most recent one?

2. I am a dependent student, but my parents are [divorced/separated/living abroad]. How should I handle the requirement for parent tax documents in this situation?

3. For the Household Information Form, should I include my roommates at university, or only my family members at my permanent address?

4. I notice the deadline is July 5 at 5:00 PM. Is this Eastern Time? And if I upload documents at 4:55 PM, is that acceptable?

5. After I upload the documents, how will I know they were received successfully? Will I get a confirmation email?

I want to make sure I do this correctly the first time to avoid any delays in my financial aid. If it would be helpful, I can attend one of your verification help sessions on [Tuesday/Thursday] at 2:00 PM.

Thank you for your assistance. I appreciate your help in ensuring I can continue my studies at Toronto University.

Best regards,
Ahmed Hassan
Student ID: 20261234567
Email: student.ahmed@torontouniversity.ca
Phone: [Your Phone Number]`,
    tone: "professional"
  },
  
  simplerExplanation: "The university needs to check your financial aid papers. You must send 5 types of documents by July 5 at 5 PM. If you do not send them, you will not get $13,500 in money for school. You will have to pay $7,200 for classes yourself. The documents you need: (1) Tax papers from 2025, (2) Your ID card, (3) Paper showing you are Canadian or have permission to study, (4) A form about your family, (5) Papers from your jobs in 2025. You can upload these papers on the school website. If you need help, call (416) 555-3000 or go to the school office Monday-Friday 9 AM to 4 PM. Do not wait - start getting these papers today."
};

export const genericResult: AnalysisResult = {
  summary: "This document contains important information that requires your attention. Based on the content, there appear to be deadlines, required actions, and documents you may need to provide. Please review the analysis below carefully and take action as soon as possible.",
  
  deadlines: [
    {
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Estimated response deadline (typically 2 weeks from document date)",
      daysUntil: 14,
      importance: "important"
    }
  ],
  
  actions: [
    {
      action: "Read the entire document carefully to understand all requirements",
      priority: "high",
      estimatedTime: "15-30 minutes"
    },
    {
      action: "Identify any specific deadlines or dates mentioned in the document",
      priority: "high",
      estimatedTime: "10 minutes"
    },
    {
      action: "Make a list of any documents or information you need to provide",
      priority: "medium",
      estimatedTime: "15 minutes"
    },
    {
      action: "Contact the sender if you have questions or need clarification",
      priority: "medium",
      estimatedTime: "30 minutes"
    }
  ],
  
  documentsNeeded: [
    "Any documents specifically mentioned in the original document",
    "Proof of identity (if required)",
    "Supporting documentation as requested"
  ],
  
  riskLevel: "medium",
  riskExplanation: "Without more specific information about the document type, it's difficult to assess the exact risk level. However, any official document typically requires timely attention. The main risks are: missing deadlines, not providing required information, or misunderstanding the requirements. To reduce risk, read the document carefully, note all deadlines, and contact the sender if anything is unclear.",
  
  checklist: [
    {
      step: "Read the document thoroughly from start to finish",
      completed: false
    },
    {
      step: "Highlight or note all dates and deadlines mentioned",
      completed: false
    },
    {
      step: "Make a list of all required actions",
      completed: false
    },
    {
      step: "Gather any documents or information mentioned",
      completed: false
    },
    {
      step: "Contact the sender if you have questions",
      completed: false
    },
    {
      step: "Respond or take action before any deadlines",
      completed: false
    }
  ],
  
  draftReply: {
    subject: "Re: [Original Document Subject]",
    body: `Dear [Recipient Name],

Thank you for your [letter/email/notice] dated [date].

I am writing to confirm that I have received and reviewed the document. I understand that [brief summary of what the document is about].

I would like to clarify a few points:
1. [Your first question or concern]
2. [Your second question or concern]
3. [Any other questions]

I am committed to [responding/complying/taking action] by the deadline mentioned. Please let me know if you need any additional information from me.

Thank you for your assistance.

Best regards,
[Your Name]
[Your Contact Information]`,
    tone: "professional"
  },
  
  simplerExplanation: "This is an important paper. You need to read it carefully. Look for dates when you must do something. Look for things you must send or do. If you do not understand, call or email the person who sent this paper. Do not wait - do this soon. Keep a copy of this paper and any papers you send back."
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
