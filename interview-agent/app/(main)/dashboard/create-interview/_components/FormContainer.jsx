'use client';
import { InterviewType } from '@/services/Constants';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

//function FormContainer({ onHandleInputChange }) {
//   const [interviewType, setInterviewType] = useState([]);

//   useEffect(() => {
//     if (interviewType.length > 0) {
//       onHandleInputChange('type', interviewType);
//     }
//   }, [interviewType]);

//   const AddInterviewType=(type)=>{
//       const data=interviewType.includes(type);
//       if(!data){
//             setInterviewType(prev=>[...prev,type])
//       }
//       else{
//             const result=interviewType.filter(item=>item!=type);
//             setInterviewType(result);
//       }
//   }

      function FormContainer({ onHandleInputChange, GoToNext }) {
      const [interviewType, setInterviewType] = useState([]); // ✅ Add this back

      const AddInterviewType = (type) => {
      const alreadySelected = interviewType.includes(type);
      const updatedType = alreadySelected
            ? interviewType.filter((item) => item !== type)
            : [...interviewType, type];

      setInterviewType(updatedType);
      onHandleInputChange('type', updatedType); // ✅ immediate update
      };


  return (
    <div className="p-5 bg-white rounded-2xl">
      <div className="mt-5 font-medium">
        <h2 className="text-sm">Job Position</h2>
        <Input
          placeholder="e.g Full Stack Developer"
          className="mt-2"
          onChange={(event) =>
            onHandleInputChange('jobPosition', event.target.value)
          }
        />
      </div>

      <div className="mt-5 font-medium">
        <h2 className="text-sm">Job Description</h2>
        <Textarea
          placeholder="Enter detailed job description"
          className="h-[150px] mt-2"
          onChange={(event) =>
            onHandleInputChange('jobDescription', event.target.value)
          }
        />
      </div>

      <div className="mt-5 font-medium">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange('duration', value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer gap-2 
              p-1 px-4 bg-white border hover:bg-secondary 
              border-gray-300 rounded-2xl
              ${interviewType.includes(type.title) && 'bg-blue-50 text-blue-400'}`}
              onClick={() => AddInterviewType(type.title)}>
              <type.icon className="h-4 w-6" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 font-medium flex justify-center">
      <Button className="mt-5" onClick={GoToNext}>
      Generate Question
      <ArrowRight className="ml-2" />
      </Button>
      </div>


    </div>
  );
}

export default FormContainer;


