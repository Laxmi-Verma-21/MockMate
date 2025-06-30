import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <div>
      
        <h2 className='font-bold text-lg'> Generated Interview Questions </h2>
        
        <div className="p-5 border border-gray-700 rounded-2xl mt-5 space-y-4">
          {questionList.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <h2 className="font-medium text-base">{item.question}</h2>
              <p className="text-sm text-gray-500">Type: {item.type}</p>
            </div>
          ))}
        </div>
      
    </div>
  )
}

export default QuestionListContainer