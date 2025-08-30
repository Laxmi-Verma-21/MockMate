**MockMate – Interview Agent 🎤**

An AI-powered voice-based mock interview assistant that generates role-specific questions, conducts live voice interviews using Vapi, and evaluates candidate responses. All sessions are stored in Supabase for easy review and analysis.

**Live Demo -** https://mock-mate-bay-zeta.vercel.app/


**Features**
🤖 **AI-Powered Question Generation**
Automatically generates tailored interview questions using LLMs.

🎤**Voice-Based Interviews (Vapi)**
Real-time voice interaction with candidates powered by Vapi.

📝 **AI Response Evaluation**
Evaluates candidate answers and provides structured feedback.

🔗** Easy Sharing**
Share interview links with candidates or peers for instant practice.


**Tech Stack**

Frontend: Next.js / React (deployed on Vercel)

Backend: Next.js API Routes (Node.js)

Voice Layer: Vapi for real-time AI voice interviews

Database & Auth: Supabase

AI/LLMs: OpenAI (for questions + feedback)

Deployment: Vercel + GitHub


**Getting Started**
1️⃣ Clone the Repository
git clone https://github.com/Laxmi-Verma-21/MockMate.git
cd MockMate/interview-agent

2️⃣ Install Dependencies
npm install

3️⃣ Set up Environment Variables

Create a .env.local file and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

OPENAI_API_KEY=your_openai_api_key
VAPI_API_KEY=your_vapi_api_key

4️⃣ Run Locally
npm run dev
