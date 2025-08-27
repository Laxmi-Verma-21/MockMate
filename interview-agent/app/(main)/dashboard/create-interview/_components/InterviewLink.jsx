import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, MessageCircle, Plus, SlackLogo } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

import React from 'react'
import { toast } from 'sonner';

function InterviewLink({interview_id,formData}) {
      console.log("🧪 interview_id prop:", interview_id);
      const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
      const GetInterviewUrl=()=>{
            
            return url;
      }

      const onCopyLink=async()=>{
            await navigator.clipboard.writeText(url);
            toast('Link copied')
      }


  return (
    <div className="flex flex-col items-center justify-center mt-10  bg-white rounded-2xl">
      <Image src={'/check.png'} alt='check' width={100} height={100} className='w-[70px] h-[70px] mt-3'
       />
       <h2 className='font-bold text-2xl mt-3'>Your AI Interview is Ready !</h2>
       <p className='text-xl mt-2'> Share this link with your candidates to start the interview process </p>

      <div className='w-full p-7 mt-6 rounded-2xl bg-white '> 
            <div className='flex justify-between items-center'>
                  <h2 className='font-bold'>Interview Link</h2>
                  <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-2xl'> Valid for 30 days </h2>
            </div>
            <div className='mt-4 flex gap-3 item-center'>
                  <Input defaultValue={GetInterviewUrl()} disabled={true} />
                  <Button onClick={()=>onCopyLink()}><Copy/> Copy Link</Button>
            </div>

            <hr className='my-7' />

            <div className='flex gap-5 '>
                  <h2 className='text-sm text-gray-500 flex gap-2 items-center '><Clock className='h-4 w-4'/> {formData?.duration}</h2>
                  <h2 className='text-sm text-gray-500 flex gap-2 items-center '><List className='h-4 w-4'/> 10 Questions </h2>
                  
            </div>
      </div>
      <div className='mt-7 bg-white p-5 rounded-2xl w-full'>
            <h2 className='font-bold'>Share Via </h2>
            <div className='flex gap-7 mt-2'>
                  <div className='mt-7 bg-white p-5 rounded-2xl w-full'>
  <h2 className='font-bold'>Share Via </h2>
  <div className='flex gap-7 mt-2'>
    {/* Slack Share */}
    <Button
      variant={'outline'}
      className='flex-1'
      onClick={() => {
        // Example Slack share: open in Slack client (requires Slack deep link)
        window.open(`slack://channel?team=<TEAM_ID>&id=<CHANNEL_ID>&message=${encodeURIComponent(url)}`, '_blank');
      }}
    >
       Slack
    </Button>

    {/* Email Share */}
    <Button
      variant={'outline'}
      className='flex-1'
      onClick={() => {
        window.location.href = `mailto:?subject=AI Interview Link&body=Hi,%0A%0APlease join the interview using this link: ${encodeURIComponent(url)}`;
      }}
    >
      <Mail className="h-4 w-4" /> Mail
    </Button>

    {/* WhatsApp Share */}
    <Button
      variant={'outline'}
      className='flex-1'
      onClick={() => {
        window.open(`https://wa.me/?text=Join the interview using this link: ${encodeURIComponent(url)}`, '_blank');
      }}
    >
      <MessageCircle className="h-4 w-4" /> Whatsapp
    </Button>
  </div>
</div>

            </div> 
      </div>
      <div className='flex w-full gap-5 mt-7 justify-center  my-4'>
            <Link href={'/dashboard'}>
                  <Button variant={'outline'}><ArrowLeft/> Back to Dashboard</Button>
            </Link>
            <Link href={'/create-interview'}>
                  <Button> <Plus/> Create New Interview </Button>
            </Link>
      </div>
      

    </div>
  )
}

export default InterviewLink