import React from 'react'

function CandidatesList({ candidateList }) {
  const safeList = Array.isArray(candidateList) ? candidateList : [];

  console.log("candidateList:", candidateList);

  return (
    <div className='bg-white shadow-md rounded-2xl p-5 mt-5'>
      <h2>Candidates ({safeList.length})</h2>
      {safeList.map((candidate, index) => (
        <div key={index} className='p-5 flex gap-3 items-center'>
          <h2 className='bg-primary p-3 px-5 rounded-full'>
            {candidate.userName?.[0]}
          </h2>
          <div>{candidate.userName}</div>
          <div>{candidate.userEmail}</div>
        </div>
      ))}
    </div>
  )
}


export default CandidatesList
