import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({interview}) {

      const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
      const copylink=()=>{
            navigator.clipboard.writeText(url);
            toast('Copied')
      }

      const onSend=()=>{
            window.location.href="mailto:laxmiverma200421@gmail.com?subject=MockMate Interview Link & body=Interview Link :"+url
      }
      return (
      <div className='p-5 bg-white rounded-lg border'>
      <div className='flex items-center justify-between'  >
            <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
            <h2 className='text-sm '>{moment(interview?.created_at).format('DD MM YYYY')}</h2>
      </div>
      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
      <h2 className='mt-2 text-gray-500'> {interview?.duration}</h2>

            <div className='flex gap-3 w-full mt-5'>
            <Button 
            variant='outline' 
            className='flex-1 flex items-center justify-center gap-2'
            onClick={copylink}
            >
            <Copy size={16} /> Copy Link
            </Button>
            <Button 
            className='flex-1 flex items-center justify-center gap-2'
            >
            <Send size={16} /> Send
            </Button>
            </div>
      </div>
      )
      }
export default InterviewCard
