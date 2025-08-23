"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import Image from "next/image";

export default function InterviewCompleted() {
  const router = useRouter();

  return (
    // Off-white background
    <div className="flex items-center justify-center min-h-screenstyle={{ backgroundColor: '#F5F0EB' }}">
      {/* White Card Box */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Interview Completed!
        </h1>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/interviewcomplete.png"
            alt="Interview Completed"
            width={300}
            height={240}
            className="rounded-lg"
          />
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Thank you for completing your interview.  
          Your responses have been recorded successfully.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/interview/history")}
          >
            View Interview History
          </Button>
        </div>
      </div>
    </div>
  );
}
