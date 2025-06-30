"use client"
import React from 'react'
import {supabase} from '@/services/supabaseClient'
import {Button } from '@/components/ui/button'
import Image from 'next/image';

function Login() {
/*used to sign in with google*/

  const signInWithGoogle= async()=>{
    const {error}=await supabase.auth.signInWithOAuth(
      {provider: 'google'}
    )

    if(error){
      console.error('Error:',error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <div className='flex flex-col items-center border rounded-2xl p-10'>
        <Image src={'/logo.png'} alt='logo'
          width={400}
          height={100}
          className='w-[180px] '
        />
        <div className='flex flex-col items-center' >
          <Image src={'/Login.png'} alt='login'
          width={600}
          height={400}
          className='w-[450px] h-[450px] rounded-2xl'/>
          <h2 className='text-2xl font-bold text-center'>Welcome to MockMate</h2>
          <p className='text-gray-600 text-center'>Sign in with Google Authentication </p>
          <Button className='mt-7 w-full'
          onClick ={signInWithGoogle}
          >Login with Google</Button>
          

        </div>
      </div>

    </div>
  )
}

export default Login