// ClearPath AI - Document Analysis API Route
// This is a server-side API endpoint that processes document analysis requests

import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithWatsonx, isWatsonxConfigured } from '@/lib/watsonx';
import { getMockResult } from '@/lib/mockData';
import { AnalysisResult } from '@/lib/types';

// Maximum document length (characters)
const MAX_DOCUMENT_LENGTH = parseInt(process.env.MAX_DOCUMENT_LENGTH || '5000');

// Enable/disable AI mode
const ENABLE_AI_MODE = process.env.ENABLE_AI_MODE === 'true';
const ENABLE_MOCK_FALLBACK = process.env.ENABLE_MOCK_FALLBACK !== 'false'; // Default true

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { documentText } = body;

    // Validate input
    if (!documentText || typeof documentText !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input: documentText is required and must be a string'
        },
        { status: 400 }
      );
    }

    // Check document length
    if (documentText.length > MAX_DOCUMENT_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Document too long. Maximum length is ${MAX_DOCUMENT_LENGTH} characters.`
        },
        { status: 400 }
      );
    }

    // Check if document is too short
    if (documentText.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Document too short. Please provide more content to analyze.'
        },
        { status: 400 }
      );
    }

    // Check if AI mode is enabled and configured
    if (!ENABLE_AI_MODE || !isWatsonxConfigured()) {
      console.log('AI mode disabled or not configured, using mock data');
      return useMockFallback(documentText, 'AI mode disabled or not configured');
    }

    // Try to analyze with watsonx.ai
    try {
      console.log('Analyzing document with watsonx.ai...');
      const aiResult = await analyzeWithWatsonx(documentText);
      
      return NextResponse.json({
        success: true,
        data: aiResult,
        metadata: {
          model: process.env.WATSONX_MODEL_ID || 'llama-3-3-70b-instruct',
          mode: 'ai',
          timestamp: new Date().toISOString()
        }
      });
    } catch (aiError) {
      // Log the error but don't expose details to client
      console.error('watsonx.ai analysis failed:', aiError);
      
      // Fall back to mock data if enabled
      if (ENABLE_MOCK_FALLBACK) {
        return useMockFallback(documentText, 'AI analysis failed, using demo data');
      } else {
        return NextResponse.json(
          {
            success: false,
            error: 'Analysis failed and fallback is disabled'
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error in analyze route:', error);
    
    // Try to use mock fallback
    if (ENABLE_MOCK_FALLBACK) {
      try {
        const body = await request.json();
        return useMockFallback(body.documentText || '', 'Unexpected error, using demo data');
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: 'An unexpected error occurred'
          },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// Helper function to return mock data as fallback
function useMockFallback(documentText: string, reason: string) {
  console.log(`Using mock fallback: ${reason}`);
  
  const mockResult = getMockResult(documentText);
  
  return NextResponse.json({
    success: true,
    data: mockResult,
    metadata: {
      model: 'mock',
      mode: 'demo',
      warning: 'Using demo data - AI unavailable',
      reason: reason,
      timestamp: new Date().toISOString()
    }
  });
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to analyze documents.'
    },
    { status: 405 }
  );
}

// Made with Bob