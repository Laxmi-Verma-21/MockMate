'use client'
import React, { useContext } from 'react'
import { interviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'

function StartInterview() {
  const { interviewInfo } = useContext(interviewDataContext)

  return (
    <div className='p-20 lg:px-48 xl:px-58'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[500px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <Image
            src={'/ai.png'}
            alt='ai'
            width={100}
            height={100}
            className='w-[100px] h-[100px] rounded-full object-center '
          />
          <h2>Ai Recruiter</h2>
        </div>

        <div className='bg-white h-[500px] rounded-lg flex flex-col gap-3 items-center justify-center'>
            <div className="relative group">
                  <div className="text-4xl font-semibold bg-primary text-white w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-110">
                  {interviewInfo?.userName
                  ? interviewInfo.userName.split(' ').map(n => n[0]).join('').toUpperCase()
                  : 'U'}
                  </div>

                  <h2 className='mt-3'>{interviewInfo?.userName}</h2> 
            
            </div>
            

        </div>
      </div>

      <div className="flex gap-5 mt-5 justify-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mic className="h-6 w-6 text-gray-700 cursor-pointer" />
            </div>
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
                  <Phone className='h-6 w-6 text-white cursor-pointer' />
            </div>
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'> Interview in Progress... </h2>
     

    </div>
  )
}

export default StartInterview
