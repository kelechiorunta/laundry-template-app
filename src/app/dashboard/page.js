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
  // var user = ''
  // const user = auth.currentUser && auth.currentUser.email
  const [isPending, startTransition] = useTransition()
  const [userEmail, setUserEmail] = useState(null)

  const auth = getAuth(app)
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUserEmail(currentUser && currentUser.email);
  //   // user = currentUser && currentUser.email
  // });

  useEffect(()=>{
        
    const getcurrentUser = async() =>{
      
      // startTransition(async()=>{
        // const auth = getAuth(app)
        const current = await validateAuth()
        // onAuthStateChanged(auth, (currentUser) => {
        //   setUserEmail(currentUser && currentUser.email); 
        // });
        setUserEmail(current && current.email)
        console.log(current)
      // })
        
    }
    getcurrentUser()
  },[userEmail, onAuthStateChanged])


  return (
    <div className='bg-black z-10 w-full h-full'>
        <LaundryHeader/>
        <Dashboard user={user && (user?.email).toString()}/>
        {console.log(user && (user?.email))}
    </div>
  )
}
