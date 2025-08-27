import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import Link from "next/link"
import { toast } from 'sonner'

function InterviewCard({interview, viewDetail=false}) {

      const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
      const copylink=()=>{
            navigator.clipboard.writeText(url);
            toast('Copied')
      }
      
      const onSend=()=>{
            window.location.href="mailto:laxmiverma200421@gmail.com?subject=MockMate Interview Link & body=Interview Link :"+url
      }

      // Always treat interview_feedback as an array
      const feedbackList = Array.isArray(interview?.interview_feedback)
      ? interview.interview_feedback
      : interview?.interview_feedback
      ? [interview.interview_feedback]
      : [];

      return (
      <div className='p-5 bg-white rounded-lg border'>
      <div className='flex items-center justify-between'  >
            <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
            <h2 className='text-sm '>{moment(interview?.created_at).format('MMM DD YYYY')}</h2>
      </div>
      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
      
      <h2 className='mt-2 text-gray-500 flex justify-between'> {interview?.duration}
            
            <span className='text-green-500'>{feedbackList.length} Candidates</span>
      </h2>
            {!viewDetail?<div className='flex gap-3 w-full mt-5'>
            <Button 
            variant='outline' 
            className='flex-1 flex items-center justify-center gap-2'
            onClick={copylink}
            >
            <Copy size={16} /> Copy Link
            </Button>
            <Button 
            className='flex-1 flex items-center justify-center gap-2'
            onClick={() => {
            const email = prompt("Enter candidate's email address:");
            if (email) {
                  window.location.href = `mailto:${email}?subject=MockMate Interview Link&body=Interview Link: ${url}`;
            }
            }}
            >
            <Send size={16} /> Send
            </Button>
            </div>
            :
            <Link href={'/scheduled-interview/'+interview?.interview_id+"/details"}>
                  <Button className="mt-5 w-full " variant="outline">View Detail <ArrowRight/></Button>
            </Link>
            
            }
      </div>
      )
      }
export default InterviewCard
