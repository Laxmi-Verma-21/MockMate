'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { interviewDataContext } from '@/context/InterviewDataContext';
import { Mic, Phone } from 'lucide-react';
import Image from 'next/image';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import TimerComponent from './_components/TimerComponent';

export default function StartInterview() {
  const { interviewInfo } = useContext(interviewDataContext);
  const vapiRef = useRef(null);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [conversation, setConversation]=useState();

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

    vapiRef.current.on("call-start", () => {
      console.log("🚀 Call started");
      toast('Call Connected...');
    });

    // In some SDKs speaker param might not be available, fallback using toggle
    let lastSpeaker = "user";

    vapiRef.current.on("speech-start", (speaker) => {
      console.log("🎤 speech-start with:", speaker);

      // If speaker is defined
      if (speaker === "user") {
        setUserSpeaking(true);
        setAiSpeaking(false);
      } else if (speaker === "assistant") {
        setAiSpeaking(true);
        setUserSpeaking(false);
      } else {
        // fallback (toggle)
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
      console.log("🎤 Speech ended");
      setAiSpeaking(false);
      setUserSpeaking(false);
    });

    vapiRef.current.on("call-end", () => {
      console.log("📞 Call ended");
      toast('Interview Ended');
      setAiSpeaking(false);
      setUserSpeaking(false);
      GenerateFeedback();
    });

    vapiRef.current.on("message",(message)=>{
      console.log(message?.conversation);
      setConversation(message?.conversation);
    });

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
    console.log("📥 Response from API:", data); // 👈 Debug this!

    const Content = data?.content;

    if (typeof Content === 'string') {
      const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');
      console.log("✅ Final Feedback:", FINAL_CONTENT);
    } else {
      console.warn("⚠️ API did not return 'content' as expected. Full data:", data);
    }
  } catch (error) {
    console.error("❌ Error generating feedback:", error);
  }
};




  }, []);

  useEffect(() => {
    const questions = interviewInfo?.interviewData?.questionList;

    if (questions?.length > 0) {
      console.log("✅ Starting call with questionList", questions);

      setTimeout(() => {
        try {
          startCall(questions);
        } catch (err) {
          console.error("❌ Failed to start Vapi call:", err);
        }
      }, 1000);
    } else {
      console.log("❌ questionList not available or empty", questions);
    }
  }, [interviewInfo]);

  const startCall = (questions) => {
    const questionList = questions.map(q => q?.question).join(', ');
    console.log("🧠 Final Questions:", questionList);

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

    if (vapiRef.current) {
      vapiRef.current.start(assistantOptions);
    }
  };

  const stopInterview = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      console.log("🛑 Interview stopped");
    }
  };

  // DEBUG: Watch ai/user speaking status
  useEffect(() => {
    console.log("👁 aiSpeaking:", aiSpeaking, "userSpeaking:", userSpeaking);
  }, [aiSpeaking, userSpeaking]);

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

        {/* User Info */}
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

      {/* Control Buttons */}
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




// 'use client';

// import React, { useContext, useEffect, useState } from 'react';
// import { interviewDataContext } from '@/context/InterviewDataContext';
// import { Mic, Phone } from 'lucide-react';

// import Image from 'next/image';
// import Vapi from '@vapi-ai/web';
// import AlertConfirmation from './_components/AlertConfirmation';
// import { toast } from 'sonner';

// export default function StartInterview() {
//   const { interviewInfo } = useContext(interviewDataContext);
//   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//   const [activeUser,setActiveUser]= useState(false);

// useEffect(() => {
//   const questions = interviewInfo?.interviewData?.questionList;

//   if (questions?.length > 0) {
//     console.log("✅ Starting call with questionList", questions);

//      setTimeout(() => {
//       try {
//         startCall(questions);
//       } catch (err) {
//         console.error("❌ Failed to start Vapi call:", err);
//       }
//     }, 1000); // 1 second delay
//   } else {
//     console.log("❌ questionList not available or empty", questions);
//   }
// }, [interviewInfo]);


//   const startCall = (questions) => {
//     console.log("🚀 startCall triggered");

//     const questionList = questions.map(q => q?.question).join(', ');
//     console.log("🧠 Final Questions:", questionList);

//     const assistantOptions = {
//       name: "AI Recruiter",
//       firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2",
//         language: "en-US",
//       },
//       voice: {
//         provider: "playht",
//         voiceId: "jennifer",
//       },
//       model: {
//         provider: "openai",
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI voice assistant conducting interviews.
// Start with a friendly greeting like:
// "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started!"

// Ask the following questions one by one:
// Questions: ${questionList}

// Wait for the candidate’s answer before continuing.
// Be friendly, give short feedback, and wrap up positively.
//             `.trim()
//           }
//         ]
//       }
//     };

//     vapi.start(assistantOptions);
//   };

//   const stopInterview = () => {
//     vapi.stop();
//     console.log("🛑 Interview stopped");
//   };

//   vapi.on("call-start",()=>{
//     console.log("🚀 Call started");
//     toast('Call Connected.....');
//   })

//   vapi.on("speech-start", ()=> {
//     console.log("🎤 Speech started") ;
//     setActiveUser(false);
//   });

//   vapi.on("speech-end", ()=>{
//     console.log("🎤 Speech ended"); 
//     setActiveUser(true);
//   })

//   vapi.on("call-end",()=>{
//     console.log("Call ended");
//     toast('Interview Ended');
//   })


//   return (
//     <div className='p-20 lg:px-48 xl:px-58'>
//       <h2 className='font-bold text-xl flex justify-between'>
//         AI Interview Session
//         <span className='flex gap-2 items-center'>
      
//           00:00:00
//         </span>
//       </h2>

//       <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
//         {/* AI Recruiter Box */}
//         <div className='bg-white h-[500px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
//           {!activeUser &&<span className="absolute w-28 h-28 rounded-full bg-blue-500 opacity-75 animate-ping"></span>}
//           <Image
//             src='/ai.png'
//             alt='AI Recruiter'
//             width={100}
//             height={100}
//             className='w-[100px] h-[100px] rounded-full object-center'
//           />
//           <h2>AI Recruiter</h2>
//         </div>

//         {/* User Info */}
//         <div className='bg-white h-[500px] rounded-lg flex flex-col gap-3 items-center justify-center'>
//           <div className="relative group">
//             {!activeUser && <span className="absolute w-28 h-28 rounded-full bg-blue-500 opacity-75 animate-ping"></span>}
//             <div className="text-4xl font-semibold bg-primary text-white w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-110">
//               {interviewInfo?.userName
//                 ? interviewInfo.userName.split(' ').map(n => n[0]).join('').toUpperCase()
//                 : 'U'}
//             </div>
//             <h2 className='mt-3'>{interviewInfo?.userName}</h2>
//           </div>
//         </div>
//       </div>

//       {/* Control Buttons */}
//       <div className="flex gap-5 mt-5 justify-center">
//         <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
//           <Mic className="h-6 w-6 text-gray-700 cursor-pointer" />
//         </div>
//         <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
//           <AlertConfirmation stopInterview={stopInterview}>
//             <Phone className='h-6 w-6 text-white cursor-pointer' />
//           </AlertConfirmation>
//         </div>
//       </div>

//       <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
//     </div>
//   );
// }
