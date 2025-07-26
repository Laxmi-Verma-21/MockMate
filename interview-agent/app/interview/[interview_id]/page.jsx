'use client';

import React, { useContext, useEffect, useState } from 'react';
import { use } from 'react'; // NEW import
import InterviewHeader from '../_components/InterviewHeader';
import Image from 'next/image';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { interviewDataContext } from '@/context/InterviewDataContext';

function Interview() {

  const {interview_id}=useParams();
  console.log(interview_id);
  const [interviewData, setInterviewData]= useState();
  const [userName, setUserName]= useState();
  const[loading, setLoading]= useState(false);
  const {interviewInfo, setInterviewInfo}=useContext(interviewDataContext);
  const router=useRouter();
  const [userEmail,setUserEmail]=useState();


  useEffect(()=>{
    interview_id && GetInterviewDetails();
  },[interview_id])

  const GetInterviewDetails= async()=>{
    setLoading(true);
    try{
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select("jobPosition,jobDescription,duration,type")
    .eq('interview_id',interview_id)
    setInterviewData(Interviews[0]);
    setLoading(false);
    if(Interviews?.length==0){
      toast('Incorrect Interview Link')
      return ;
    }
    
  }catch(error){
    setLoading(false);
    toast('Incorrect Interview Link')
  }
  }

  const onJoinInterview= async()=>{
    setLoading(true);
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select('*')
    .eq('interview_id',interview_id);

    console.log(Interviews[0]);
    setInterviewInfo({
      userName:userName,
      userEmail:userEmail,
      interviewData:Interviews[0]
    });
    router.push('/interview/'+interview_id+'/start');
    setLoading(false);
  }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-84 mt-16 '>
      <div className='flex flex-col items-center justify-center border border-primary rounded-2xl bg-white p-7 lg: px-33 xl:px-52  mb-20' >
        <Image src={'/logo.png'} alt='logo' width={200} height={200} className='w-[140px]'/>
        <h2 className='mt-3 my-2'> AI-Powered Interview Platform</h2>
        <Image src={'/interview.png'} alt='image' width={500} height={370} className='w-[400px] my-6'/>

        <h2 className='font-bold text-xl'> {interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-gray-500 mt-2'><Clock className='h-4 w-4' /> {interviewData?.duration} </h2>

        <div className='w-full mt-3.5'>
          <h2 className='mt-2'>Enter your full name</h2>
          <Input placeholder='e.g . John Doe' onChange={(event)=>setUserName(event.target.value)} />
        </div>
        <div className='w-full mt-3.5'>
          <h2 className='mt-2'>Enter your Email</h2>
          <Input placeholder='e.g . John@gmail.com' onChange={(event)=>setUserEmail(event.target.value)} />
        </div>

        <div className='p-3 bg-blue-50 flex gap-4 rounded-2xl   mt-3'>
          <Info className='text-primary' />
        <div>
          <h2 className='font-bold'>Before you Begin</h2>
          <ul>
            <li className='text-sm text-primary'>-Test your camera and microphone</li>
            <li className='text-sm text-primary'>-Find a Quiet place for Interview</li>
            <li className='text-sm text-primary'>-Ensure you have a stable internet connection </li>
          </ul>
        </div>
        </div>

        <Button className={'w-full text-bold mt-4 text-white'} 
        disabled={loading || !userName}
        onClick={()=>onJoinInterview()}><Video/> {loading && <Loader2Icon/>}Join Interview</Button>
      </div>  
    </div>
  )
}
export default Interview;
