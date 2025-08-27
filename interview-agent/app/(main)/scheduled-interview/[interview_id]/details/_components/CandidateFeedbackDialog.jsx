import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import moment from 'moment';
import { Progress } from '@/components/ui/progress'
import { Send } from 'lucide-react';

function CandidateFeedbackDialog({ candidate }) {
  //const feedback = candidate?.feedback;

  const feedback = candidate?.feedback?.feedback || {};

// turn all keys to lowercase
const normalizedFeedback = Object.keys(feedback).reduce((acc, key) => {
  acc[key.toLowerCase()] = feedback[key];
  return acc;
}, {});

  const handleSendEmail = () => {
    window.location.href = `mailto:${candidate?.userEmail}?subject=Regarding Interview&body=Hello ${candidate?.userName},`;
  };

  console.log("Rendering CandidateFeedbackDialog for:", candidate);

  const rating = candidate?.feedback?.feedback?.rating;
  const average = rating
    ? (
        Object.values(rating).reduce((a, b) => a + b, 0) /
        Object.values(rating).length
      ).toFixed(1)
    : 0;

  let ratingColor = "text-red-500"; // default bad
  if (average >= 6) {
    ratingColor = "text-green-600";
  } else if (average >= 5) {
    ratingColor = "text-yellow-500";
  }

  let containerColor = "bg-gray-100"; // fallback
if (average >= 6) {
  containerColor = "bg-green-400 text-white"; // full green background
} else if (average >= 3) {
  containerColor = "bg-yellow-400 text-black"; // yellow
} else {
  containerColor = "bg-red-400 text-white"; // red
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary mt-2">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Feedback Report</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-6 space-y-6">
              {/* Candidate Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="bg-primary p-4 font-bold text-2xl rounded-full text-white">
                    {candidate?.userName?.[0]?.toUpperCase()}
                  </h2>
                  <div>
                    <h2 className="font-semibold text-lg">{candidate?.userName}</h2>
                    <p className="text-sm text-gray-500">
                      Completed On: {moment(candidate?.created_at).format("MMM DD, YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className={`font-semibold text-lg ${ratingColor}`}>
                    ⭐ Rating: {average}/10
                  </h2>
                </div>
              </div>

              {/* Skill Assessment */}

             <div className="mt-4">
                  <h2 className="font-bold mb-3">Skill Assessment</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                  {/* Technical Skills */}
                  <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                        <span>Technical Skills</span>
                        <span>{candidate?.feedback?.feedback?.rating?.technicalSkills ?? "N/A"}</span>
                        </div>
                        <Progress value={(candidate?.feedback?.feedback?.rating?.technicalSkills ?? 0) * 10} />
                  </div>

                  {/* Communication */}
                  <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                        <span>Communication</span>
                        <span>{candidate?.feedback?.feedback?.rating?.communication ?? "N/A"}</span>
                        </div>
                        <Progress value={(candidate?.feedback?.feedback?.rating?.communication ?? 0) * 10} />
                  </div>

                  {/* Problem Solving */}
                  <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                        <span>Problem Solving</span>
                        <span>{candidate?.feedback?.feedback?.rating?.problemSolving ?? "N/A"}</span>
                        </div>
                        <Progress value={(candidate?.feedback?.feedback?.rating?.problemSolving ?? 0) * 10} />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                        <span>Experience</span>
                        <span>{candidate?.feedback?.feedback?.rating?.experience ?? "N/A"}</span>
                        </div>
                        <Progress value={(candidate?.feedback?.feedback?.rating?.experience ?? 0) * 10} />
                  </div>
                 </div>
              </div>

                  <div>
                        <h2 className='font-bold'>Preformance Summary </h2>
                        <div>
                              <p className='p-3 bg-secondary my-3 rounded-2xl'>{candidate?.feedback?.feedback?.summary??"N/A"}</p>
                        </div>
                  </div>

                  <div className={`p-2 rounded-md ${containerColor}`}>
                        
                        <div>
                              <h2 className='font-bold'>Recommended </h2>
                              <p className='p-3 my-3 rounded-2xl'>{normalizedFeedback.recommendation ?? "N/A"}</p>
                        </div>
                      
                  </div>
                    <Button onClick={handleSendEmail}>
      <Send className="mr-2" />
      Send Message
    </Button>

            </div>
                              


          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
