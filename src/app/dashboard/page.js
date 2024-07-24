'use client'
import React, { useState, useEffect, useTransition, useContext } from 'react'
import Dashboard from '../components/DashBoard'
import LaundryHeader from '../components/LaundryHeader'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase/firebaseConfig'
import { validateAuth } from '../server actions/server actions'
import { authContext } from '../components/AuthComponent'

export default function page() {
  
  const authO = useContext(authContext)
  
  const { user } = authO
  
  const [isPending, startTransition] = useTransition()
  const [userEmail, setUserEmail] = useState(null)

  const auth = getAuth(app)



  return (
    <div className='bg-black z-10 w-full h-full'>
        <LaundryHeader/>
        <Dashboard />
        {console.log(user && (user?.email))}
    </div>
  )
}
