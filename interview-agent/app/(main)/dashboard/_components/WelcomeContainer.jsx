// "use client";
// import React from 'react';
// import { useUser } from '@/app/provider';

// function WelcomeContainer() {
//   const userContext = useUser();

//   // Protect against null context (before Provider initializes)
//   if (!userContext) return null; // or show a loading spinner

//   const { user } = userContext;

//   return (
//     <div>
//       <div className='bg-white p-3 rounded-2xl'>
//         <h2 className="text-lg font-bold">Welcome Back, {user?.name || "Guest"}</h2>
//         <h2 className='text-shadow-emerald-500'>AI-Driven Interviews, Hassle-Free Hiring</h2>
//       </div>
//     </div>
//   );
// }

// export default WelcomeContainer;


"use client";
import React from 'react';
import Image from 'next/image'; // make sure this is imported
import { useUser } from '@/app/provider';

function WelcomeContainer() {
  const userContext = useUser();

  if (!userContext || !userContext.user) {
    return <p className="text-gray-500">Loading user info...</p>;
  }

  const { user } = userContext; // define `user` properly

  return (
    <div  className="bg-white p-5 rounded-xl flex justify-between items-center ">
      <div>
        <h2 className="text-lg font-bold">Welcome Back, {user?.name || "Guest"}</h2>
        <h2 className="text-gray-600">AI-Driven Interviews, Hassle-Free Hiring</h2>
       </div>
        {user.picture && (
          <Image
            src={user.picture}
            alt="userAvatar"
            width={50}
            height={50}
            className='rounded-full'
          />
        )}
     
    </div>
  );
}

export default WelcomeContainer;
