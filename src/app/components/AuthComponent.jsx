'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { createContext } from 'react'
import { authUserEmail } from '../server actions/server actions'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase/firebaseConfig'


export const authContext = createContext(null)

export default function AuthComponent({children}) {

    const auth = getAuth(app)

    const [authObject, setAuthObject] = useState({auth:null, status:''})
    const [isPendingProfile, startTransitionProfile] = useTransition()
    const [user, setUser] = useState('')

    useEffect(()=>{
    
        const getcurrentUser = () =>{
          startTransitionProfile(async()=>{
            onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser); 
            });
          })
          
        }
        getcurrentUser()
      },[user])

    useEffect(()=>{

        const validateAuth = async() =>{
            const authUser = await authUserEmail()
            authUser? setAuthObject(prevState => ({ ...prevState, status: "Session in" })):
            setAuthObject(prevState => ({ ...prevState, status: prevState.status || "Session Expired"}));
        }

        const timerId = setTimeout(validateAuth, 0.1);

        return () => {
            clearTimeout(timerId)
        }

    }, [setAuthObject, authUserEmail])

    const authO = {authObject: authObject, setAuthObject:setAuthObject, user:isPendingProfile?user:user}

  return (
    // <div>
        <authContext.Provider value={authO}>
            {children}
        </authContext.Provider>
    // </div>
  )
}
