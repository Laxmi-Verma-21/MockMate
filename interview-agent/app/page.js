'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Share, Search, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';


export default function Home(){
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    checkUser();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard'); // ✅ go to dashboard if logged in
    } else {
      router.push('/auth'); // ✅ otherwise go to auth
    }
  };


  return(
    <div className="min-h-screen bg-white px-6 md:px-24 lg:px-40 xl:px-60 py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center">
          <Image src="/image1.png" alt="image" height={400} width={500} />
        </div>
        <h1 className="text-4xl font-bold text-primary">AI-Powered Interview Platform</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Instantly create, share, and manage interviews with smart AI-generated questions.
        </p>
        <Button
          onClick={handleGetStarted}
          className="mt-6 text-white text-lg px-6 py-3 transition-transform duration-300 transform hover:scale-105  cursor-pointer
"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
        
      </div>

      {/* Features */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      <div className="p-6 bg-gray-50 rounded-2xl border text-center hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
        <Sparkles className="mx-auto text-primary h-10 w-10" />
        <h3 className="text-xl font-semibold mt-4">AI Question Generation</h3>
        <p className="text-sm text-gray-600 mt-2">
          Our AI crafts tailored questions based on the job profile.
        </p>
      </div>

      <div className="p-6 bg-gray-50 rounded-2xl border hover:shadow-xl text-center transition-transform duration-300 transform hover:scale-105">
        <Share className="mx-auto text-primary h-10 w-10" />
        <h3 className="text-xl font-semibold mt-4">Easy Link Sharing</h3>
        <p className="text-sm text-gray-600 mt-2">
          Share interview links via email, Slack, or WhatsApp in one click.
        </p>
      </div>

      <div className="p-6 bg-gray-50 rounded-2xl border  hover:shadow-xl text-center transition-transform duration-300 transform hover:scale-105">
        <Search className="mx-auto text-primary h-10 w-10" />
        <h3 className="text-xl font-semibold mt-4">Review Answers</h3>
        <p className="text-sm text-gray-600 mt-2">
          Review candidate responses in an intuitive dashboard.
        </p>
      </div>
    </div>


      {/* How It Works */}
      <div className="mb-20">
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

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-16">
        &copy; {new Date().getFullYear()} MockMate. All rights reserved.
      </footer>
    </div>
  );
  
}