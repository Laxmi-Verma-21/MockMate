import React from 'react'
import InterviewDetail from '../page'
import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'

function InterviewDetailContainer({interviewDetail}) {


  return (
    <div className='p-5 bg-white rounded-2xl'>
      <h2 className='font bold '>{interviewDetail?.jobPosition }</h2>

      <div className='mt-5 flex items-center justify-between  lg:pr-52'>
            <div>
                  <h2 className='text-sm text-gray-500'>Duration </h2>
                  <h2 className='flex text-sm font-bold items-center gap-3'><Clock className='h-4 w-4' /> {interviewDetail?.duration}</h2>
            </div>
            <div>
                  <h2 className='text-sm text-gray-500'>Created On</h2>
                  <h2 className='flex text-sm font-bold items-center gap-3'><Calendar className='h-4 w-4' /> {moment(interviewDetail?.created_at).format('DD/MM/YYYY')}</h2>
            </div>
            <div>
                  <h2 className='text-sm text-gray-500'>Type </h2>
                  <h2 className='flex text-sm font-bold items-center gap-3'>
                        <Clock className='h-4 w-4' /> 
                        {Array.isArray(interviewDetail?.type) 
                        ? interviewDetail.type.join(", ") 
                        : JSON.parse(interviewDetail?.type || "[]").join(", ") || "N/A"}
                  </h2>
            </div>

            
      </div>
      <div className='mt-5'>
             <h2 className='font-bold'> Job Description </h2>
             <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>

      <div className='mt-5'>
            <h2 className='font-bold'>Interview Questions</h2>
            <div className='grid gird-cols-2 gap-4'>
                  {interviewDetail?.questionList.map((item,index)=>(
                        <h2  key={item?.id || index} className='text-xs flex'>{index+1}.{item?.question}</h2>
                  ))}
            </div>
      </div>
    </div>
  )
}

export default InterviewDetailContainer