import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData , onCreateLink}) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const {user}=useUser();
  const [saveLoading, setSaveLoading]= useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const onFinish= async() => {
    setSaveLoading(true);
      const interview_id=uuidv4();
      const { data, error } = await supabase
      .from('Interviews')
      .insert([
        { ...formData,
          questionList:questionList,
          userEmail:user?.email,
          interview_id:interview_id
        },
      ])
      .select()
      setSaveLoading(false);
      onCreateLink(interview_id)
      
  }

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', { ...formData });

      let content = result.data?.content;

      if (!content || typeof content !== 'string') {
        console.error("❌ AI returned no content or invalid format:", result.data);
        toast("⚠️ AI returned an unexpected response. Try again.");
        setLoading(false);
        return;
      }

      console.log("🧠 Full AI Raw Response:", content);

      // Remove markdown code fences (```json ... ```)
      content = content.replace(/```json|```/g, '').trim();

      // Attempt to extract the JSON portion (handles AI cleanup wrappers)
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) {
        console.error("❌ Could not find JSON braces in AI response:", content);
        toast("⚠️ Couldn't locate JSON in AI response.");
        setLoading(false);
        return;
      }

      const jsonString = content.substring(jsonStart, jsonEnd + 1);
      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (e) {
        console.error('❌ JSON parse failed:', e, "\nJSON string:", jsonString);
        toast("⚠️ JSON parsing failed. Check the console for more details.");
        setLoading(false);
        return;
      }

      const questions = parsed?.interviewQuestions;
      if (!Array.isArray(questions)) {
        console.error("❌ 'interviewQuestions' is missing or not an array:", parsed);
        toast("⚠️ AI response format is invalid.");
        setLoading(false);
        return;
      }

      setQuestionList(questions);
    } catch (e) {
      console.error('🔥 Server Error:', e);
      toast('🚨 Server Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-2xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="h-6 w-6 animate-spin text-primary" />
          <div>
            <h2 className="font-semibold text-lg">Generating Interview Questions</h2>
            <p className="text-primary text-sm">
              Our AI is crafting personalized questions based on your job position...
            </p>
          </div>
        </div>
      )}

      {!loading && questionList.length === 0 && (
        <div className="mt-5 text-center text-gray-600 text-sm">
          🥲 No questions generated. Please try again.
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            onClick={GenerateQuestionList}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {questionList.length > 0 && 
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
        }

      <div className='flex justify-end mt-10'>
        <Button onClick={()=> onFinish()} disabled={saveLoading} >
        {saveLoading && <Loader2Icon className='animate-spin'/>} Create Interview Link & Finish</Button>
      </div>

    </div>
  );
}

export default QuestionList;
