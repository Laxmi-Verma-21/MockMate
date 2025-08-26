"use client"

import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidatesList from './_components/CandidatesList';

function InterviewDetail() {
      const {interview_id}= useParams();
      const {user} =useUser();
      const [InterviewDetail,setInterviewDetail]=useState();

      useEffect(()=>{
            user && GetInterviewDetail();
      }, [user])

      const GetInterviewDetail=async()=>{
            const result = await supabase
            .from("Interviews")
            .select(`jobPosition, jobDescription,duration, interview_id,created_at, type,questionList,userEmail,
                  interview_feedback(userEmail,userName, feedback,created_at)`)
            .eq("userEmail", user?.email)
            .eq('interview_id',interview_id)
            
            let interviewData=result?.data?.[0];
            
            if (interviewData) {
            interviewData.interview_feedback = Array.isArray(interviewData.interview_feedback)
                  ? interviewData.interview_feedback
                  : interviewData.interview_feedback
                  ? [interviewData.interview_feedback]
                  : [];
            }

            // setInterviewDetail(result?.data[0])
            // console.log("InterviewDetail result:", result?.data[0]?.interview_feedback);

            setInterviewDetail(interviewData);
  console.log("InterviewDetail result:", interviewData);

      }

      
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'> Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={InterviewDetail}/>
      <CandidatesList  candidateList={InterviewDetail?.['interview_feedback']} />

    </div>
  )
}

export default InterviewDetail