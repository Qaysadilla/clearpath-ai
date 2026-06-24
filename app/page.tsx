'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DocumentInput from '@/components/DocumentInput';
import LoadingState from '@/components/LoadingState';
import ResultsDisplay from '@/components/ResultsDisplay';
import Disclaimer from '@/components/Disclaimer';
import { AnalysisResult } from '@/lib/types';
import { getMockResult } from '@/lib/mockData';

// Sample document texts
const sampleDocuments = {
  appointment: `MEMORIAL HOSPITAL
123 Healthcare Drive
Toronto, ON M5H 2N2

Date: June 15, 2026

Dear Patient,

RE: APPOINTMENT CONFIRMATION - URGENT FOLLOW-UP REQUIRED

This letter confirms your scheduled appointment with Dr. Sarah Chen, Cardiology Department.

APPOINTMENT DETAILS:
Date: July 8, 2026
Time: 2:30 PM
Location: Memorial Hospital, 3rd Floor, Cardiology Wing
Duration: Approximately 45 minutes

IMPORTANT INSTRUCTIONS:
1. You must fast for 12 hours before your appointment (no food or drink except water after 2:30 AM on July 8th)
2. Bring your health card and photo ID
3. Bring a list of all current medications
4. Arrive 15 minutes early to complete registration
5. If you have had any recent blood work, bring those results

REQUIRED DOCUMENTS:
- Ontario Health Card (OHIP)
- Government-issued photo ID
- Referral letter from Dr. James Wilson (if not already on file)
- Previous test results or medical records related to your heart condition

If you cannot attend, you MUST call us at least 48 hours in advance at (416) 555-0123.

Sincerely,
Jennifer Martinez
Patient Coordinator
Cardiology Department`,

  housing: `PROPERTY MANAGEMENT SERVICES INC.
456 Rental Avenue, Suite 200
Toronto, ON M4B 1B3

Date: June 20, 2026

NOTICE TO VACATE PREMISES
FORM N4 - NOTICE TO END YOUR TENANCY FOR NON-PAYMENT OF RENT

TO: Maria Santos
Unit 304, 789 Maple Street
Toronto, ON M5R 2E4

THIS IS A LEGAL NOTICE THAT COULD LEAD TO YOU LOSING YOUR HOME

REASON FOR THIS NOTICE:
You have not paid your rent in full. You owe the following amounts:

RENT ARREARS:
- May 2026 Rent: $1,800.00 (Due: May 1, 2026)
- June 2026 Rent: $1,800.00 (Due: June 1, 2026)
TOTAL AMOUNT OWING: $3,600.00

TERMINATION DATE: July 11, 2026
You must move out of your rental unit by this date.

WHAT YOU MUST DO:

OPTION 1 - PAY THE RENT OWING:
You can void (cancel) this notice by paying the full amount of $3,600.00 on or before July 11, 2026.

OPTION 2 - MOVE OUT:
If you do not pay the rent owing and do not move out by July 11, 2026, we may apply to the Landlord and Tenant Board for an order to evict you.

OPTION 3 - DISPUTE THIS NOTICE:
If you disagree with this notice or want to talk about a payment plan, you must contact us immediately at (416) 555-7890.

Contact: Robert Chen, Property Manager
Phone: (416) 555-7890 ext. 102`,

  school: `From: Financial Aid Office <finaid@torontouniversity.ca>
To: student.ahmed@torontouniversity.ca
Date: June 18, 2026
Subject: URGENT: Financial Aid Verification Required - Action Needed by July 5, 2026

Dear Ahmed Hassan,

RE: Financial Aid Application - Student ID: 20261234567

VERIFICATION STATUS: INCOMPLETE
Your financial aid application has been selected for verification. You must complete the verification process to receive your financial aid for the 2026-2027 academic year.

DOCUMENTS REQUIRED:
You must submit the following documents by July 5, 2026:

1. VERIFICATION WORKSHEET (Form V5) - Download from website
2. TAX DOCUMENTS (2025 Tax Year):
   - Your Notice of Assessment from CRA
   - T4 slips from all employers
   - Parent Notice of Assessment (if dependent student)
3. PROOF OF IDENTITY - Government-issued photo ID
4. PROOF OF CITIZENSHIP/IMMIGRATION STATUS
5. HOUSEHOLD INFORMATION FORM

SUBMISSION DEADLINE: JULY 5, 2026 (5:00 PM EST)

IMPORTANT CONSEQUENCES IF YOU DO NOT COMPLETE VERIFICATION:
⚠️ Your financial aid will be CANCELLED
⚠️ You will be responsible for paying full tuition by August 15, 2026
⚠️ Late payment fees of $100 will apply after August 15

ESTIMATED FINANCIAL AID (Pending Verification):
- OSAP: $8,500
- University Scholarship: $2,000
- Work-Study: $3,000
TOTAL: $13,500

Upload documents at: portal.torontouniversity.ca
Questions? Call (416) 555-3000

Toronto University Financial Aid Office`
};

export default function Home() {
  const [documentText, setDocumentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleLoadSample = (sampleType: 'appointment' | 'housing' | 'school') => {
    setDocumentText(sampleDocuments[sampleType]);
    setResults(null);
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;

    setIsLoading(true);
    setResults(null);

    // Simulate API delay (2.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Get mock result based on document content
    const mockResult = getMockResult(documentText);
    
    setResults(mockResult);
    setIsLoading(false);

    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {!results && !isLoading && <Hero />}
      
      {!results && !isLoading && (
        <DocumentInput
          documentText={documentText}
          setDocumentText={setDocumentText}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          onLoadSample={handleLoadSample}
        />
      )}

      {isLoading && <LoadingState />}

      {results && !isLoading && (
        <>
          <ResultsDisplay results={results} />
          
          {/* New Analysis Button */}
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={() => {
                  setResults(null);
                  setDocumentText('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-primary hover:underline font-medium"
              >
                ← Analyze Another Document
              </button>
            </div>
          </div>
        </>
      )}

      <Disclaimer />
    </main>
  );
}

// Made with Bob
