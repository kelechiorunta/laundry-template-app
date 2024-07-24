'use client'
import React from 'react'
import LaundryHeader from '../components/LaundryHeader'
import Login from '../components/Login'
import { useContext, useEffect } from 'react'
import { authContext } from '../components/AuthComponent'
import { gsap, ScrollTrigger } from 'gsap/all'
import VideoBackground from '../components/VideoBackground'

gsap.registerPlugin(ScrollTrigger)

export default function SignUpPage() {

  const authO = useContext(authContext)
  const { authObject } = authO
  const { status } = authObject
  return (
    <div className='w-full flex flex-col h-full'>
        <LaundryHeader/>
        <div className='loginOverlay w-full h-full'>
          <VideoBackground/>
          {/* {status && <p className=' absolute w-full text-right p-2'>{status}</p>} */}
          <Login/>
        </div>
        
    </div>
  )
}