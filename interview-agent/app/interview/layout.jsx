'use client';

import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { interviewDataContext } from '@/context/InterviewDataContext';

function InterviewLayout({children}) {

      const [interviewInfo, setInterviewInfo] =useState();
 return (
      <interviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
            <div className='bg-secondary '>
                  <InterviewHeader/>
                  {children}
            </div>
      </interviewDataContext.Provider>
    
  )
}

export default InterviewLayout