'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Share, Search, CheckCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home(){
  const sectionRef = useRef(null);
  const dotRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1.2, 1]);

  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [stepPositions, setStepPositions] = useState([]);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    checkUser();
  }, []);
  
  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };
  
  // Calculate positions when component mounts and on resize
  useEffect(() => {
    const calculatePositions = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        setSectionTop(sectionRect.top + window.scrollY);
        setSectionHeight(sectionRect.height);
        
        // Calculate positions of each step
        const positions = [];
        [step1Ref, step2Ref, step3Ref, step4Ref].forEach((ref) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            positions.push(rect.top + window.scrollY - sectionTop);
          }
        });
        setStepPositions(positions);
      }
    };
    
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    window.addEventListener('scroll', calculatePositions);
    
    return () => {
      window.removeEventListener('resize', calculatePositions);
      window.removeEventListener('scroll', calculatePositions);
    };
  }, []);

  // Create motion values for dot position and color
  const dotY = useTransform(
    scrollY,
    [sectionTop, sectionTop + sectionHeight],
    [0, sectionHeight]
  );
  
  const dotColor = useTransform(
    scrollY,
    [
      sectionTop,
      sectionTop + (sectionHeight * 0.33),
      sectionTop + (sectionHeight * 0.66),
      sectionTop + sectionHeight
    ],
    [
      'linear-gradient(to right, #3B82F6, #6366F1)',
      'linear-gradient(to right, #6366F1, #8B5CF6)',
      'linear-gradient(to right, #8B5CF6, #EC4899)',
      'linear-gradient(to right, #EC4899, #EF4444)'
    ]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6 md:px-24 lg:px-40 xl:px-60 py-10 snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 flex justify-between items-center mb-10 bg-white/80 backdrop-blur-md py-4 px-6 rounded-2xl shadow-sm"
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image src="/logo.png" alt="logo" height={90} width={90} className="transition-transform duration-300"/>
        </motion.div>
        {user ? (
          <Button 
            onClick={() => router.push('/dashboard')} 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Dashboard
          </Button>
        ) : (
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/auth?mode=login')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors duration-300"
            >
              Login
            </Button>
            <Button 
              onClick={() => router.push('/auth?mode=signup')} 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign Up
            </Button>
          </div>
        )}
      </motion.nav>
      
      {/* Hero Section */}
      <div className="text-center mb-16 relative overflow-hidden snap-start">
        {/* decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-lg md:text-xl rounded-xl shadow-lg mb-8"
          >
            <div className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Voice-powered AI Recruiter
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              <Image src="/image1.png" alt="image" height={300} width={400} className="relative rounded-xl shadow-xl" />
            </div>
          </motion.div>
          
          {/* heading */}
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mt-6"
          >
            AI-Powered Interview Platform
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
            className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
          >
            Instantly create, share, and manage interviews with smart AI-generated questions.
          </motion.p>
          
          {/* Button */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            <Button
              onClick={handleGetStarted}
              className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Interview Simulation Section */}
      <div className="relative flex items-center justify-center min-h-screen snap-start py-20">
        {/* Background glow */}
        <div className="absolute w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 blur-3xl opacity-40"></div>
        
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center border border-white/20"
        >
          {/* Header with enhanced styling */}
          <div className="w-full flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">AI Interview Session</h1>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
              <span className="font-mono text-lg text-gray-700">⏱ 00:14:56</span>
            </div>
          </div>
          
          {/* Enhanced cards row */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
            {/* AI Recruiter Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-80 h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg flex flex-col items-center justify-center border border-blue-100"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full border-4 border-blue-400 flex items-center justify-center bg-white shadow-md"
              >
                <Image
                  src="/ai.png"
                  alt="AI Recruiter"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </motion.div>
              <p className="mt-4 font-medium text-gray-700">AI Recruiter</p>
              {/* Enhanced typing indicator */}
              <div className="flex gap-1 mt-3">
                {[0, 0.2, 0.4].map((d, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
            
            {/* You Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-80 h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg flex flex-col items-center justify-center border border-indigo-100"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-800 to-indigo-900 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                Y
              </div>
              <p className="mt-4 font-medium text-gray-700">YOU</p>
            </motion.div>
          </div>
          
          {/* Enhanced footer controls */}
          <div className="flex gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-full shadow-lg text-white"
            >
              🎤
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-red-500 to-red-600 p-5 rounded-full shadow-lg text-white"
            >
              <Phone className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="absolute top-1/3 left-3 z-50"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/90 backdrop-blur-sm shadow-xl px-6 py-4 rounded-2xl flex flex-col items-start gap-3 w-72 border border-blue-100"
          >
            <div className="flex items-center gap-2 text-blue-600 font-medium">👍 Communication skills</div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-3 bg-gradient-to-r from-green-400 to-green-600"
                animate={{ width: ["20%", "80%", "50%", "90%", "60%"] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
              />
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="absolute top-2/3 right-8 z-50"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border border-indigo-100"
          >
            <div className="text-lg font-medium text-indigo-700">Analyzing your skills...</div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg"
            >
              ✓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 snap-start">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to streamline your interview process
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left side - stacked features */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex p-6 items-start bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg gap-4  
                        transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-blue-100 hover:to-indigo-100 border border-blue-100"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <Sparkles className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">AI Question Generation</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Our AI crafts tailored questions based on the job profile.
                  </p>
                </div>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex p-6 items-start bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg gap-4  
                        transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-100 hover:to-purple-100 border border-indigo-100"
              >
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <Share className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Easy Link Share</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Generate a simple shareable link for quick interview access.
                  </p>
                </div>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex p-6 items-start bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg gap-4  
                        transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-purple-100 hover:to-pink-100 border border-purple-100"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                  <CheckCircle className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Review & Feedback</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get instant AI-powered feedback after every interview session.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Right side - main highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6"
            >
              {/* Small label inside pill */}
              <div className="inline-block border-2 border-blue-600 rounded-full px-6 py-2 mb-6">
                <h2 className="text-sm font-semibold text-blue-600">
                  Personalised to you and your job
                </h2>
              </div>
              
              {/* Big headline */}
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
                Instant Personalised Interviews
              </h2>
              
              {/* Supporting text */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                Experience job-specific mock interviews tailored to your job position, 
                job description, and interview type. Create in real-time and get instant feedback.
              </p>
              
              
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Feedback Section */}
      <div className="py-20 snap-start bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left side - main highlight */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6"
            >
              {/* Small label inside pill */}
              <div className="inline-block border-2 border-indigo-600 rounded-full px-6 py-2 mb-6">
                <h2 className="text-sm font-semibold text-indigo-600">Feedback</h2>
              </div>
              
              {/* Big headline */}
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-800 to-purple-900 bg-clip-text text-transparent mb-6">
                Get actionable, constructive feedback
              </h2>
              
              {/* Supporting text */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                Get structured, actionable insights into candidate performance. 
                Make data-driven hiring decisions with AI-powered evaluations.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-indigo-600">94%</div>
                  <div className="text-gray-600 mt-2">Accuracy Rate</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">3x</div>
                  <div className="text-gray-600 mt-2">Faster Hiring</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - stacked progress bars */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8 p-6"
            >
              {/* Feature 1 */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-800">Communication</h3>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-green-400 to-green-600"
                    animate={{ width: ["60%", "85%", "70%"] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  />
                </div>
              </div>
              
              {/* Feature 2 */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-800">Cultural Fit</h3>
                  <span className="text-sm font-medium text-pink-600">65%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-pink-400 to-pink-600"
                    animate={{ width: ["30%", "65%", "40%"] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  />
                </div>
              </div>
              
              {/* Feature 3 */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-800">Problem Solving</h3>
                  <span className="text-sm font-medium text-red-600">78%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-red-400 to-red-600"
                    animate={{ width: ["60%", "78%", "70%"] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  />
                </div>
              </div>
              
              {/* Feature 4 */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-800">Technical Ability</h3>
                  <span className="text-sm font-medium text-blue-600">72%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-blue-400 to-blue-600"
                    animate={{ width: ["30%", "72%", "50%"] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-20 snap-start bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps and transform your hiring process
            </p>
          </motion.div>
          
          {/* Timeline Container with Scroll-Following Dot */}
          <div className="relative" ref={sectionRef}>
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 hidden md:block"></div>
            
            {/* Scroll-Following Dot */}
            <motion.div 
              ref={dotRef}
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-lg z-20 hidden md:block"
              style={{ 
                top: dotY,
                background: dotColor
              }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-white opacity-30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            {/* Steps */}
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <motion.div
                ref={step1Ref}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Left side - Content */}
                <div className="md:w-1/2 md:pr-12 text-right mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-end mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg mr-4">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Enter Job Details</h3>
                    </div>
                    <p className="text-gray-600">
                      Provide the job role, description, and requirements. Our AI will analyze this information to create tailored interview questions.
                    </p>
                  </div>
                </div>
                
                {/* Center - Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg hidden md:block opacity-0"></div>
                
                {/* Right side - Visual */}
                <div className="md:w-1/2 md:pl-12 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-xl w-64 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Job Details</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div
                ref={step2Ref}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row-reverse items-center mt-16"
              >
                {/* Right side - Content */}
                <div className="md:w-1/2 md:pl-12 text-left mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg mr-4">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">AI Generates Questions</h3>
                    </div>
                    <p className="text-gray-600">
                      Our advanced AI creates personalized interview questions based on the job requirements, ensuring relevance and effectiveness.
                    </p>
                  </div>
                </div>
                
                {/* Center - Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white shadow-lg hidden md:block opacity-0"></div>
                
                {/* Left side - Visual */}
                <div className="md:w-1/2 md:pr-12 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-xl w-64 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">AI Generation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div
                ref={step3Ref}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row items-center mt-16"
              >
                {/* Left side - Content */}
                <div className="md:w-1/2 md:pr-12 text-right mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-end mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold shadow-lg mr-4">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Share Interview Link</h3>
                    </div>
                    <p className="text-gray-600">
                      Generate a unique link to share with candidates. They can access the interview anytime, anywhere with just a click.
                    </p>
                  </div>
                </div>
                
                {/* Center - Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full border-4 border-white shadow-lg hidden md:block opacity-0"></div>
                
                {/* Right side - Visual */}
                <div className="md:w-1/2 md:pl-12 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-xl w-64 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Share Link</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div
                ref={step4Ref}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row-reverse items-center mt-16"
              >
                {/* Right side - Content */}
                <div className="md:w-1/2 md:pl-12 text-left mb-6 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-600 flex items-center justify-center text-white text-xl font-bold shadow-lg mr-4">
                        4
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Review & Analyze</h3>
                    </div>
                    <p className="text-gray-600">
                      Get detailed AI-powered feedback and insights. Review responses, evaluate candidates, and make data-driven hiring decisions.
                    </p>
                  </div>
                </div>
                
                {/* Center - Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-500 to-red-600 rounded-full border-4 border-white shadow-lg hidden md:block opacity-0"></div>
                
                {/* Left side - Visual */}
                <div className="md:w-1/2 md:pr-12 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-xl w-64 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Analytics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Timeline */}
          <div className="md:hidden mt-12">
            <div className="flex justify-between items-center mb-8">
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-200 to-indigo-200"></div>
              <div className="flex-1 h-1 bg-gradient-to-r from-indigo-200 to-purple-200"></div>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-200 to-pink-200"></div>
            </div>
            
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                    step === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                    step === 2 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                    step === 3 ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                    'bg-gradient-to-r from-pink-500 to-red-600'
                  }`}>
                    {step}
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    {step === 1 ? 'Enter Details' :
                     step === 2 ? 'AI Generates' :
                     step === 3 ? 'Share Link' :
                     'Review'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div className="py-20 snap-start bg-gradient-to-br from-blue-800 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your hiring process?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of companies using AI to streamline their interview process
            </p>
            
            <Button
              onClick={handleGetStarted}
              className="mt-6 bg-white text-blue-800 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer font-semibold"
            >
              Create Your First Interview <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 snap-start">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/logo.png" alt="logo" height={40} width={40} />
                <span className="ml-2 text-xl font-bold">MockMate</span>
              </div>
              <p className="text-gray-400">
                AI-powered interview platform for modern hiring teams.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            &copy; {new Date().getFullYear()} MockMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}