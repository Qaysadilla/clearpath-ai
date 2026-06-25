'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DocumentInput from '@/components/DocumentInput';
import LoadingState from '@/components/LoadingState';
import ResultsDisplay from '@/components/ResultsDisplay';
import Disclaimer from '@/components/Disclaimer';
import Dashboard from '@/components/Dashboard';
import { AnalysisResult, Language } from '@/lib/types';
import { UserType, DocumentType, saveAnalysis, SavedAnalysis } from '@/lib/storage';
import { getMockResult } from '@/lib/mockData';

// Sample document texts - CLEARLY FICTIONAL FOR DEMONSTRATION
const sampleDocuments = {
  appointment: `SAMPLE DOCUMENT - FOR DEMONSTRATION ONLY

DEMO MEDICAL CENTER
123 Example Street (Fictional Address)
Toronto, ON M5H 2N2

Date: June 15, 2026

Dear Patient,

RE: APPOINTMENT CONFIRMATION

This is a sample appointment letter for demonstration purposes only.

APPOINTMENT DETAILS:
Date: July 8, 2026
Time: 2:30 PM
Location: Demo Medical Center, 3rd Floor, Cardiology Wing
Duration: Approximately 45 minutes

PREPARATION INSTRUCTIONS:
1. Please fast for 12 hours before your appointment (no food or drink except water after 2:30 AM on July 8th)
2. Bring your health card and photo ID
3. Bring a list of all current medications
4. Arrive 15 minutes early to complete registration
5. If you have had any recent blood work, bring those results

REQUIRED DOCUMENTS:
- Health Card
- Government-issued photo ID
- Referral letter from your family doctor (if not already on file)
- Previous test results or medical records (if available)

If you cannot attend, please call us at least 48 hours in advance at (555) 123-4567 (fictional number).

Sincerely,
Jane Demo, Patient Coordinator
Demo Medical Center

NOTE: This is a fictional sample document created for demonstration purposes.`,

  housing: `SAMPLE DOCUMENT - FOR DEMONSTRATION ONLY

DEMO PROPERTY MANAGEMENT
456 Sample Avenue, Suite 200 (Fictional Address)
Toronto, ON M4B 1B3

Date: June 20, 2026

SAMPLE RENT NOTICE - NOT A REAL LEGAL DOCUMENT

TO: John Demo (Fictional Name)
Unit 304, 789 Example Street (Fictional Address)
Toronto, ON M5R 2E4

This is a sample rent notice for demonstration purposes only.

NOTICE DETAILS:
You have outstanding rent payments for the following months:

RENT BALANCE:
- May 2026 Rent: $1,800.00 (Due: May 1, 2026)
- June 2026 Rent: $1,800.00 (Due: June 1, 2026)
TOTAL AMOUNT: $3,600.00

PAYMENT DEADLINE: July 11, 2026

YOUR OPTIONS:

OPTION 1 - PAY THE OUTSTANDING AMOUNT:
You can resolve this notice by paying the full amount of $3,600.00 on or before July 11, 2026.

OPTION 2 - ARRANGE A PAYMENT PLAN:
If you're experiencing financial difficulties, please contact us immediately to discuss a payment arrangement.

OPTION 3 - DISCUSS YOUR SITUATION:
If you have questions or concerns about this notice, please reach out to us at (555) 789-0123 (fictional number).

Contact: Robert Demo, Property Manager (Fictional Name)
Phone: (555) 789-0123 ext. 102 (Fictional Number)

IMPORTANT: This is a fictional sample document for demonstration purposes only. It is not a real eviction notice and has no legal effect.`,

  school: `SAMPLE DOCUMENT - FOR DEMONSTRATION ONLY

From: Financial Aid Office <demo@sampleuniversity.edu> (Fictional Email)
To: student.demo@sampleuniversity.edu (Fictional Email)
Date: June 18, 2026
Subject: Financial Aid Verification Required - Sample Document

Dear Alex Demo (Fictional Name),

RE: Financial Aid Application - Student ID: DEMO1234567

This is a sample financial aid verification letter for demonstration purposes only.

VERIFICATION STATUS: INCOMPLETE
Your financial aid application requires verification. You must complete the verification process to receive your financial aid for the 2026-2027 academic year.

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

IMPORTANT INFORMATION:
If verification is not completed by the deadline:
• Your financial aid may be delayed or adjusted
• You may need to arrange alternative payment for tuition
• Late payment fees may apply after August 15

ESTIMATED FINANCIAL AID (Pending Verification):
- OSAP: $8,500
- University Scholarship: $2,000
- Work-Study: $3,000
TOTAL: $13,500

Upload documents at: portal.sampleuniversity.edu (fictional website)
Questions? Call (555) 300-0000 (fictional number)

Sample University Financial Aid Office

NOTE: This is a fictional sample document created for demonstration purposes. All names, numbers, and institutions are fictional.`
};

type AppView = 'analyze' | 'results' | 'dashboard';

export default function Home() {
  const [documentText, setDocumentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType | null>(null);
  const [view, setView] = useState<AppView>('analyze');

  const handleLoadSample = (sampleType: 'appointment' | 'housing' | 'school') => {
    setDocumentText(sampleDocuments[sampleType]);
    setResults(null);
  };

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

      if (data.success && data.data) {
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
      setView('results');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSaveAnalysis = () => {
    if (!results || !userType || !documentType) return;
    saveAnalysis(userType, documentType, documentText, results);
  };

  const handleViewSavedAnalysis = (analysis: SavedAnalysis) => {
    setResults(analysis.analysis);
    setUserType(analysis.userType);
    setDocumentType(analysis.documentType);
    setDocumentText(analysis.documentText);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    setResults(null);
    setDocumentText('');
    setView('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (navView: 'analyze' | 'dashboard') => {
    setView(navView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentView={view === 'results' ? 'analyze' : view as 'analyze' | 'dashboard'}
        onViewChange={handleNavigate}
      />

      {/* Analyze View */}
      {view === 'analyze' && (
        <>
          <Hero />
          <DocumentInput
            documentText={documentText}
            setDocumentText={setDocumentText}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onLoadSample={handleLoadSample}
            userType={userType}
            setUserType={setUserType}
            documentType={documentType}
            setDocumentType={setDocumentType}
          />
          <Disclaimer />
        </>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="container mx-auto px-4 py-12">
          <LoadingState />
        </div>
      )}

      {/* Results View */}
      {view === 'results' && results && !isLoading && (
        <>
          <ResultsDisplay
            results={results}
            userType={userType}
            documentType={documentType}
            onSave={handleSaveAnalysis}
            onViewDashboard={() => handleNavigate('dashboard')}
          />

          {/* Analyze Another */}
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={handleStartOver}
                className="text-primary hover:underline font-medium text-base"
              >
                ← Analyze Another Document
              </button>
            </div>
          </div>

          <Disclaimer />
        </>
      )}

      {/* Dashboard View */}
      {view === 'dashboard' && (
        <>
          <Dashboard
            onAnalyzeNew={handleStartOver}
            onViewSavedAnalysis={handleViewSavedAnalysis}
          />
          <Disclaimer />
        </>
      )}
    </main>
  );
}

// Made with Bob
