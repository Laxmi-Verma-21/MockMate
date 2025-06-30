"use client"

import { Button } from '@/components/ui/button';
import { Camera, CameraIcon, Video } from 'lucide-react';
import React, { useState } from 'react'; 

function LatestInterviewsList() {
      const [interviewsList, setInterviewsList] = useState([]);
  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'> Previously Created Interviews</h2>

      {interviewsList?.length==0 && <div className='p-5 flex flex-col gap-3 items-center bg-white p-5 border-2 rounded-2xl'>
            <Video className='h-10 w-10 text-primary' />
            <h2> You don't have any interview created! </h2>
            <Button> + Create New Interveiw</Button>

      </div>}
    </div>
  )
}

export default LatestInterviewsList