'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Share, Search, CheckCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { motion, useScroll, useTransform } from "framer-motion";


export default function Home(){
  const router = useRouter();
  const [user, setUser] = useState(null);
   const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1.2, 1]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    checkUser();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard'); // go to dashboard if logged in
    } else {
      router.push('/auth'); //otherwise go to auth
    }
  };


  return(
    <div className="h-screen bg-white px-6 md:px-24 lg:px-40 xl:px-60 py-10 snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
     {/* 🔹 Navbar */}
   
      <div className="flex justify-between items-center mb-10">
        <Image src="/logo.png" alt="logo" height={90} width={90}/>
        {user ? (
          <Button 
            onClick={() => router.push('/dashboard')} 
            className="text-white"
          >
            Dashboard
          </Button>
        ) : (
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/auth?mode=login')}
            >
              Login
            </Button>
            <Button 
              onClick={() => router.push('/auth?mode=signup')} 
              className="text-white"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      
      {/* Hero Section */}
      <div className="text-center mb-16 relative overflow-hidden">

          {/* Box with zoom-in effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block px-6 py-3 bg-primary text-white font-semibold text-lg md:text-xl rounded-xl shadow-lg mb-8"
          >
            Voice-powered AI Recruiter
          </motion.div>

          {/* Image sliding up */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center"
          >
            <Image src="/image1.png" alt="image" height={300} width={400} />
          </motion.div>

          {/* Main heading sliding up */}
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="text-4xl font-bold text-primary mt-6"
          >
            AI-Powered Interview Platform
          </motion.h1>

          {/* Subheading sliding up */}
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
            className="text-gray-600 mt-4 text-lg"
          >
            Instantly create, share, and manage interviews with smart AI-generated questions.
          </motion.p>

          {/* Button sliding up */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            <Button
              onClick={handleGetStarted}
              className="mt-6 text-white text-lg px-6 py-3 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
    


{/*2nd part   Interview Simulation  */}

<div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">

  {/* Circular Gradient Glow BEHIND the card */}
  <div className="absolute w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300 blur-3xl opacity-70"></div>

  {/* Big Card */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 w-[900px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
  >
    {/* Header */}
    <div className="w-full flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">AI Interview Session</h1>
      <p className="font-mono text-lg">⏱ 00:14:56</p>
    </div>

    {/* Cards Row */}
    <div className="flex gap-8 justify-center items-center">
      {/* AI Recruiter */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-80 h-80 bg-gray-50 rounded-xl shadow-md flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 rounded-full border-4 border-blue-400 flex items-center justify-center"
        >
          <Image
            src="/ai.png"
            alt="AI Recruiter"
            width={60}
            height={60}
            className="rounded-full"
          />
        </motion.div>
        <p className="mt-4 font-medium">AI Recruiter</p>
        {/* Typing Indicator */}
        <div className="flex gap-1 mt-2">
          {[0, 0.2, 0.4].map((d, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: d }}
              className="w-2 h-2 bg-gray-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* You */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-80 h-80 bg-gray-50 rounded-xl shadow-md flex flex-col items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-2xl font-bold">
          Y
        </div>
        <p className="mt-4 font-medium">YOU</p>
      </motion.div>
    </div>

    {/* Footer Controls */}
    <div className="flex gap-6 mt-10">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-gray-200 p-4 rounded-full shadow"
      >
        🎤
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-red-500 p-4 rounded-full shadow text-white"
      >
      <Phone/>
      </motion.button>
    </div>
  </motion.div>

  {/* Floating Badge 1: Communication Skills */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="absolute top-65 left-8 z-50"
>
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="bg-white shadow-lg px-4 py-3 rounded-full flex flex-col items-start gap-2 w-64"
  >
    <div className="flex items-center gap-2">👍 Communication skills</div>
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-2 bg-gradient-to-r from-green-300 to-green-500"
        animate={{ width: ["20%", "80%", "50%", "90%", "60%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  </motion.div>
</motion.div>

{/* Floating Badge 2: Analyzing Skills */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="absolute top-97 right-8 z-50"
>
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg"
  >
    <div className="text-lg font-medium">Analyzing your skills...</div>
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1 }}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow"
    >
      ✓
    </motion.div>
  </motion.div>
</motion.div>

</div>



{/* Features */}

<div className="h-screen ">
  {/* Section 1 */}
  


<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-8">

  {/* Left side - stacked features */}
  <div className="space-y-6 p-3">
    {/* Feature 1 */}
    <div className="flex p-5 items-start bg-gray-50 rounded-2xl shadow-lg gap-3  
                    transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-white">
      <Sparkles className="text-primary h-6 w-6 mt-1" />
      <div>
        <h3 className="text-lg font-semibold">AI Question Generation</h3>
        <p className="text-sm text-gray-600">
          Our AI crafts tailored questions based on the job profile.
        </p>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="flex p-5 bg-gray-50 rounded-2xl shadow-lg items-start gap-3  
                    transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-white">
      <Share className="text-primary h-6 w-6 mt-1" />
      <div>
        <h3 className="text-lg font-semibold">Easy Link Share</h3>
        <p className="text-sm text-gray-600">
          Generate a simple shareable link for quick interview access.
        </p>
      </div>
    </div>

    {/* Feature 3 */}
    <div className="flex p-5 bg-gray-50 rounded-2xl shadow-lg items-start gap-3  
                    transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-white">
      <CheckCircle className="text-primary h-6 w-6 mt-1" />
      <div>
        <h3 className="text-lg font-semibold">Review & Feedback</h3>
        <p className="text-sm text-gray-600">
          Get instant AI-powered feedback after every interview session.
        </p>
      </div>
    </div>
  </div>

  {/* Right side - main highlight */}
  <div className="p-3">
    {/* Small label inside pill */}
    <div className="inline-block border-2 border-primary rounded-full px-6 py-2 mb-4">
      <h2 className="text-sm font-semibold text-primary">
        Personalised to you and your job
      </h2>
    </div>

    {/* Big headline */}
    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
      Instant Personalised Interviews
    </h2>

    {/* Supporting text */}
    <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
      Experience job-specific mock interviews tailored to your job position, 
      job description, and interview type. Create in real-time and get instant feedback.
    </p>
  </div>
</div>



{/*Feedback feature*/}<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">

  {/* Left side - main highlight */}
  <div className="p-3">
    {/* Small label inside pill */}
    <div className="inline-block border-2 border-primary rounded-full px-6 py-1 mb-4">
      <h2 className="text-sm font-semibold text-primary">Feedback</h2>
    </div>

    {/* Big headline */}
    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
      Get actionable, constructive feedback
    </h2>

    {/* Supporting text */}
    <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
      Get structured, actionable insights into candidate performance. 
      Make data-driven hiring decisions with AI-powered evaluations.
    </p>
  </div>

  {/* Right side - stacked progress bars */}
  <div className="space-y-6 p-3">
    {/* Feature 1 */}
    <div>
      <h3 className="text-base font-medium mb-2">Communication</h3>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-gradient-to-r from-green-300 to-green-500"
          animate={{ width: ["60%", "80%", "70%"] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
    </div>

    {/* Feature 2 */}
    <div>
    <h3 className="text-base font-medium mb-2">Cultural Fit</h3>
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-2 bg-gradient-to-r from-pink-300 to-pink-600"
        animate={{ width: ["30%", "60%", "40%"] }} // leaves blank at end
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  </div>

    {/* Feature 3 */}
    <div>
      <h3 className="text-base font-medium mb-2">Problem Solving</h3>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-gradient-to-r from-red-300 to-red-600"
          animate={{ width: ["60%", "85%", "70%"] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
    </div>

    {/* Feature 4 */}
    <div>
      <h3 className="text-base font-medium mb-2">Technical Ability</h3>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-gradient-to-r from-blue-300 to-blue-600"
          animate={{ width: ["30%", "65%", "50%"] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
    </div>
  </div>
</div>






      {/* How It Works */}


      <div className="mb-20 mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <CheckCircle className="mx-auto text-primary h-10 w-10" />
            <h3 className="font-semibold mt-2">Step 1</h3>
            <p className="text-sm text-gray-600">Enter job role & description</p>
          </div>
          <div>
            <CheckCircle className="mx-auto text-primary h-10 w-10" />
            <h3 className="font-semibold mt-2">Step 2</h3>
            <p className="text-sm text-gray-600">AI generates questions</p>
          </div>
          <div>
            <CheckCircle className="mx-auto text-primary h-10 w-10" />
            <h3 className="font-semibold mt-2">Step 3</h3>
            <p className="text-sm text-gray-600">Share interview link</p>
          </div>
          <div>
            <CheckCircle className="mx-auto text-primary h-10 w-10" />
            <h3 className="font-semibold mt-2">Step 4</h3>
            <p className="text-sm text-gray-600">Review responses</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center mt-10">
        <Button
        onClick={handleGetStarted}
        className="mt-6 text-white text-lg px-6 py-3  transition-transform duration-300 transform hover:scale-105  cursor-pointer"
      >
       Create Your First Interview <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      </div>
      

      
</div>
      
      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-16">
        &copy; {new Date().getFullYear()} MockMate. All rights reserved.
      </footer>
    </div>
  );
  
}