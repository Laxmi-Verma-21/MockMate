import React from 'react'
import CreateOptions from './_components/CreateOptions'; 
import WelcomeContainer from './_components/WelcomeContainer'
import LatestInterviewsList from './_components/LatestInterviewsList';

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions/>
      <LatestInterviewsList/>
    </div>
  )
}

export default Dashboard