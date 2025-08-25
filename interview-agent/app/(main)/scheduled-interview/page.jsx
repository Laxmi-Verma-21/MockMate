
"use client"

import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import LatestInterviewsList from '../dashboard/_components/LatestInterviewsList';
import { Video } from 'lucide-react';

function ScheduledInterview() {
  const [interviewsList, setInterviewsList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select("jobPosition, duration, interview_id, interview_feedback(userEmail)")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interviews:", error.message);
      return;
    }

    console.log("Fetched interviews:", data);
    setInterviewsList(data || []);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview List with Candidate Feedback</h2>

      {interviewsList.length === 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-white border-2 rounded-2xl">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}

      {interviewsList.length > 0 && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-3">
          {interviewsList.map((interview, index) => (
            <InterviewCard interview={interview} key={index}
            viewDetail={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;