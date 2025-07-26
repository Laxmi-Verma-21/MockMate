import OpenAI from "openai";
import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "@/services/Constants"; // use import instead of require

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation) {
      console.warn("⚠️ No conversation received.");
      return NextResponse.json({ content: '' }, { status: 400 });
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-small-3.2-24b-instruct-2506:free',
      messages: [{ role: 'user', content: FINAL_PROMPT }],
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      console.warn("⚠️ No content in OpenAI response:", completion);
      return NextResponse.json({ content: '' }, { status: 502 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("❌ Feedback API Error:", error);
    return NextResponse.json({ content: '' }, { status: 500 });
  }
}


// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// const { FEEDBACK_PROMPT } = require("@/services/Constants");

// export async function POST(req){

//       const {conversation}=await req.json();
//       const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))

      

//       try {

//       const openai = new OpenAI({
//             baseURL: 'https://openrouter.ai/api/v1',
//             apiKey: process.env.OPENROUTER_API_KEY,
//       });
//       // 🧪 Primary model call
//       const completion = await openai.chat.completions.create({
//             model: 'mistralai/mistral-small-3.2-24b-instruct-2506:free',
//             messages: [{ role: 'user', content: FINAL_PROMPT }],
//       })
//       return NextResponse.json({ content: completion.choices?.[0]?.message?.content || '' });


//       }catch (e){
//             console.log(e)
//             return NextResponse.json(e)
//       }
// }