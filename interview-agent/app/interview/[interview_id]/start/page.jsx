'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { interviewDataContext } from '@/context/InterviewDataContext';
import { supabase } from '@/services/supabaseClient';
import { Mic, Phone } from 'lucide-react';
import Image from 'next/image';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import TimerComponent from './_components/TimerComponent';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function StartInterview() {
  const { interviewInfo } = useContext(interviewDataContext);
  const vapiRef = useRef(null);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const {interview_id}=useParams();
  const router=useRouter();

  // Initialize Vapi and all event listeners
  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

    vapiRef.current.on("call-start", () => {
      toast('Call Connected...');
    });

    let lastSpeaker = "user";

    vapiRef.current.on("speech-start", (speaker) => {
      if (speaker === "user") {
        setUserSpeaking(true);
        setAiSpeaking(false);
      } else if (speaker === "assistant") {
        setAiSpeaking(true);
        setUserSpeaking(false);
      } else {
        // fallback if speaker is undefined
        if (lastSpeaker === "user") {
          setAiSpeaking(true);
          setUserSpeaking(false);
          lastSpeaker = "ai";
        } else {
          setUserSpeaking(true);
          setAiSpeaking(false);
          lastSpeaker = "user";
        }
      }
    });

    vapiRef.current.on("speech-end", () => {
      setAiSpeaking(false);
      setUserSpeaking(false);
    });

    vapiRef.current.on("call-end", () => {
      toast('Interview Ended');
      setAiSpeaking(false);
      setUserSpeaking(false);
      setCallEnded(true); //  Only mark as ended, wait for conversation
    });

    vapiRef.current.on("message", (message) => {
      if (message?.conversation) {
        setConversation(message.conversation); // Set conversation
      }
    });
  }, []);

  // Trigger feedback generation only once both conversation + call end are satisfied
  useEffect(() => {
    if (callEnded && conversation) {
      GenerateFeedback();
    }
  }, [callEnded, conversation]);

  

  // Start the interview when data is ready
  useEffect(() => {
    const questions = interviewInfo?.interviewData?.questionList;

    if (questions?.length > 0) {
      setTimeout(() => {
        try {
          startCall(questions);
        } catch (err) {
          console.error("❌ Failed to start call:", err);
        }
      }, 1000);
    }
  }, [interviewInfo]);

  const startCall = (questions) => {
    const questionList = questions.map(q => q?.question).join(', ');

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Start with a friendly greeting like:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started!"

Ask the following questions one by one:
Questions: ${questionList}

Wait for the candidate’s answer before continuing.
Be friendly, give short feedback, and wrap up positively.
            `.trim()
          }
        ]
      }
    };

    vapiRef.current?.start(assistantOptions);
  };

  const stopInterview = () => {
    vapiRef.current?.stop();
  };


  // generating feedback and routing 
  const GenerateFeedback = async () => {
  try {
    const result = await fetch('/api/ai-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conversation })
    });

    const data = await result.json();
    const content = data?.content;

    if (typeof content === 'string') {
       // Remove markdown and extra text
      const cleaned = content.replace(/```json|```/g, "").trim();

      // Extract only the first {...} block
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) {
        throw new Error("No valid JSON found in AI response");
      }


      const finalContent = match[0];
      console.log(" Final Feedback:", finalContent);

      //  Supabase insert happens here, where finalContent is defined
      const { data: insertedData, error } = await supabase
        .from('interview-feedback')
        .insert([
          { 
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail, // or rename to userEmail if needed
            interview_id: interview_id,
            feedback: JSON.parse(finalContent),
            recommended: false
          },
        ])
        .select();

      if (error) {
        console.error(" Supabase insert error:", error);
      } else {
        console.log(" Saved to Supabase:", insertedData);
        router.replace('/interview/'+interview_id+"/completed");
      }
    } else {
      console.warn("⚠️ API did not return valid content:", data);
    }
  } catch (error) {
    console.error("❌ Error generating feedback:", error);
  }
};


  return (
    <div className='p-20 lg:px-48 xl:px-58'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <TimerComponent
            durationInMinutes={parseInt(interviewInfo?.interviewData?.duration || '15')}
            onTimerEnd={() => {
              stopInterview();
              toast('⏰ Interview Time Over');
            }}
          />
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        {/* AI Recruiter */}
        <div className='bg-white h-[500px] rounded-lg border flex flex-col gap-3 items-center justify-center relative'>
          {aiSpeaking && (
            <span className="absolute w-28 h-28 rounded-full bg-blue-500 opacity-75 animate-ping z-0" />
          )}
          <Image
            src='/ai.png'
            alt='AI Recruiter'
            width={100}
            height={100}
            className='w-[100px] h-[100px] rounded-full object-center z-10'
          />
          <h2 className='mt-3'>AI Recruiter</h2>
        </div>

        {/* User */}
        <div className='bg-white h-[500px] rounded-lg flex flex-col gap-3 items-center justify-center relative'>
          {userSpeaking && (
            <span className="absolute w-28 h-28 rounded-full bg-blue-500 opacity-75 animate-ping z-0" />
          )}
          <div className="text-4xl font-semibold bg-primary text-white w-24 h-24 flex items-center justify-center rounded-full z-10">
            {interviewInfo?.userName
              ? interviewInfo.userName.split(' ').map(n => n[0]).join('').toUpperCase()
              : 'U'}
          </div>
          <h2 className='mt-3'>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-5 mt-5 justify-center">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
          <Mic className="h-6 w-6 text-gray-700 cursor-pointer" />
        </div>
        <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
          <AlertConfirmation stopInterview={stopInterview}>
            <Phone className='h-6 w-6 text-white cursor-pointer' />
          </AlertConfirmation>
        </div>
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
    </div>
  );
}


