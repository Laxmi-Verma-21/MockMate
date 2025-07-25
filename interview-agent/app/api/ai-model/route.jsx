import { QUESTIONS_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    if (!jobPosition || !jobDescription || !duration || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', duration)
      .replace('{{type}}', type);

    console.log('🧠 Final Prompt:\n', FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    let completion;
    try {
      // 🧪 Primary model call
      completion = await openai.chat.completions.create({
        model: 'mistralai/mistral-small-3.2-24b-instruct-2506:free',
        messages: [{ role: 'user', content: FINAL_PROMPT }],
      });
    } catch (modelError) {
      console.warn('⚠️ Primary model failed, trying fallback...', modelError.message);
      // ⛑️ Optional: fallback to a different model like Gemini or GPT-3.5
      try {
        completion = await openai.chat.completions.create({
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: FINAL_PROMPT }],
        });
      } catch (fallbackError) {
        console.error('❌ Both primary and fallback model failed:', fallbackError.message);
        return NextResponse.json(
          { error: 'Both model calls failed', details: fallbackError.message },
          { status: 500 }
        );
      }
    }

    const rawContent = completion?.choices?.[0]?.message?.content;
    if (!rawContent) {
      console.error('❌ No valid response from AI:', completion);
      return NextResponse.json(
        { error: 'AI did not return a valid response' },
        { status: 500 }
      );
    }

    // Clean up common formatting issues
    const cleaned = rawContent.replace(/```json|```/g, '').trim();

    console.log('✅ AI CLEANED Response:\n', cleaned);

    return NextResponse.json({ content: cleaned }, { status: 200 });
  } catch (error) {
    console.error('🔥 API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
