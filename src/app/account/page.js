'use client'
import React, { useEffect } from 'react'
import LaundryHeader from '../components/LaundryHeader'
import UserAccount from '../components/UserAccount'
import { useContext } from 'react'
import { authContext } from '../components/AuthComponent'
import { getAuth } from 'firebase/auth'
import { app, db } from '../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function page() {
  const authO = useContext(authContext)
  const { isSent, setSent } = authO
  // const auth = getAuth(app)
  // useEffect(()=>{
  //   const getnote = async() => {
  //     const authUser = auth.currentUser
  //     const chatDocId = [isSent, authUser.uid].sort().join('_');
  //     console.log(isSent)
                      
  //     const notificationRef = doc(db, 'notifications', chatDocId)
  //     const notificationRefSnapshot = await getDoc(notificationRef)
  //     if (notificationRefSnapshot.exists()){
  //       console.log(isSent)
  //       alert('yes')
  //       setSent(isSent)
  //     }
  //   }
    
                      
  //   // setConnects(newarray)

    
  //   getnote()
  //   // alert('sent')
  // }, [auth,isSent, db])
  return (
    <div className='w-full h-full'>
        <LaundryHeader/>
        <UserAccount isSent={isSent} setSent={setSent}/>
    </div>
  )
}
