'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import React, { useState } from 'react';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { InterviewType } from '@/services/Constants';

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({}); 
  const [interviewId,setInterviewId]= useState();

  const onHandleInputChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedData);
    console.log("FormData", updatedData); // log the correct updated data
  };


    const onGoToNext = () => {
    if (
      !formData?.jobPosition?.trim() ||
      !formData?.jobDescription?.trim() ||
      !formData?.duration ||
      !formData?.type?.length
    ) {
      toast('⚠️ Please enter all required fields!');
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink=(interview_id)=>{
    setInterviewId(interview_id);
    setStep(step+1);
  }

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-5 items-center'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
        <h2 className='font-bold text-2xl'>Create New Interview</h2>
      </div>

      <Progress value={step * 33} className='my-5' />

      {step === 1 ? 
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GoToNext={onGoToNext}
        />
       : step === 2 ? 
        <QuestionList formData={formData} onCreateLink={(interview_id)=> onCreateLink(interview_id)} />
       : step === 3? <InterviewLink interview_id = {interviewId} formData={formData}/> : null
      
      }
    </div>
  );
}

export default CreateInterview;
