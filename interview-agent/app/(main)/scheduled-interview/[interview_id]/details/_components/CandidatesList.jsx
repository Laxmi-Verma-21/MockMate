import { Button } from '@/components/ui/button';
import moment from 'moment';
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidatesList({ candidateList }) {
  const safeList = Array.isArray(candidateList) ? candidateList : [];

  return (
    <div className='bg-white shadow-md rounded-2xl p-5 mt-5'>
      <h2 className='font-bold my-5'>Candidates ({safeList.length})</h2>
      {safeList.map((candidate, index) => {
        const rating = candidate.feedback?.feedback?.rating;
        const average = rating
          ? (
              Object.values(rating).reduce((a, b) => a + b, 0) /
              Object.values(rating).length
            ).toFixed(1)
          : 0;

        // color based on score
        let ratingColor = "text-red-500"; // default bad
        if (average >= 6) {
          ratingColor = "text-green-600";
        } else if (average >= 5) {
          ratingColor = "text-yellow-500";
        }
        console.log("Candidate inside CandidatesList:", candidate);


        return (
          <div key={index} className='p-5 flex gap-3 justify-between items-center border-b last:border-none'>
            <div className='flex items-center gap-5'>
              <h2 className='bg-primary p-3 font-bold px-5 text-2xl rounded-full text-white'>
                {candidate.userName?.[0]?.toUpperCase()}
              </h2>
              <div>
                <h2 className='font-bold'>{candidate.userName}</h2>
                <h2>Completed On: {moment(candidate?.created_at).format("MMM DD, YYYY")}</h2>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h2 className={`font-semibold ${ratingColor}`}>
                ⭐ Rating: {average}/10
              </h2>
                    <CandidateFeedbackDialog candidate={candidate}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CandidatesList;
