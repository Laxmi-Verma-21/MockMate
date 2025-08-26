"use client"

import React from 'react'
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Camera, CameraIcon, Video } from 'lucide-react';
import { useEffect, useState } from 'react'; 
import InterviewCard from '../dashboard/_components/InterviewCard';


function AllInterview() {
  const [interviewsList, setInterviewsList] = useState([]);
  const {user}=useUser();

  useEffect(()=>{
      user && GetInterviewList();
  },[user])

  const GetInterviewList=async()=>{
      let {data: Interviews, error}=await supabase
      .from('Interviews')
      .select(`
        id,
        jobPosition,
        duration,
        created_at,
        type,
        questionList,
        interview_feedback:interview_feedback(*)
      `)
      .eq('userEmail', user?.email)
      .order('id',{ascending:false})


    console.log(Interviews);
    setInterviewsList(Interviews);
  }

  
  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>All Previously Created Interviews</h2>

      {interviewsList?.length==0 && <div className='p-5 flex flex-col gap-3 items-center bg-white p-5 border-2 rounded-2xl'>
            <Video className='h-10 w-10 text-primary' />
            <h2> You don't have any interview created! </h2>
            <Button> + Create New Interveiw</Button>

      </div>}

      {interviewsList && 
        <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
          {interviewsList.map((interview, index)=>(
            <InterviewCard interview={interview} key={index}/>
          ))}
        </div>

      }
    </div>
  )
}

export default AllInterview