import { QUESTIONS_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', duration)
      .replace('{{type}}', type);

    console.log("🧠 Final Prompt:\n", FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-small-3.2-24b-instruct-2506:free',
      messages: [
        {
          role: 'user',
          content: FINAL_PROMPT,
        },
      ],
    });

    if (!completion || !completion.choices || !completion.choices.length) {
      console.error('❌ OpenAI did not return any choices:', completion);
      return NextResponse.json(
        { error: "AI did not return a valid response." },
        { status: 500 }
      );
    }

    let responseText = completion.choices[0]?.message?.content || '';

    // Clean up markdown formatting
    responseText = responseText.replace(/```json|```/g, '').trim();

    console.log("🧠 AI CLEANED Response:", responseText);

    return NextResponse.json({ content: responseText }, { status: 200 });

  } catch (error) {
    console.error("🔥 API Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}





// import { QUESTIONS_PROMPT } from '@/services/Constants';
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// export async function POST(req) {
//   try {
//     const { jobPosition, jobDescription, duration, type } = await req.json();

//     const FINAL_PROMPT = QUESTIONS_PROMPT
//       .replace('{{jobTitle}}', jobPosition)
//       .replace('{{jobDescription}}', jobDescription)
//       .replace('{{duration}}', duration)
//       .replace('{{type}}', type);

//     console.log("🧠 Final Prompt:\n", FINAL_PROMPT);

//     const openai = new OpenAI({
//       baseURL: 'https://openrouter.ai/api/v1',
//       apiKey: process.env.OPENROUTER_API_KEY,
//     });

//     const completion = await openai.chat.completions.create({
//       model: 'google/gemini-2.0-flash-exp:free',
//       messages: [
//         {
//           role: 'user',
//           content: FINAL_PROMPT,
//         },
//       ],
//       // response_format:'json'
//     });

// //     const responseText = completion.choices[0]?.message?.content;
// //     console.log("✅ AI Response:", responseText);

//     return NextResponse.json({ result: responseText }, { status: 200 });

//   } catch (error) {
//     console.error("🔥 API Error:", error);
//     return NextResponse.json(
//       { error: 'Internal Server Error', details: error.message },
//       { status: 500 }
//     );
//   }
// }
