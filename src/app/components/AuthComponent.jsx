'use client'
import React, { startTransition, useEffect, useRef, useState, useTransition } from 'react'
import { createContext } from 'react'
import { authUserEmail } from '../server actions/server actions'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase/firebaseConfig'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { closeSession } from '../server actions/server actions'
import { signOut } from 'firebase/auth'


export const authContext = createContext(null)

export default function AuthComponent({children}) {

    const auth = getAuth(app)
    const pathname = usePathname()
    const router = useRouter()

    const [authObject, setAuthObject] = useState({auth:null, status:''})
    const [isPendingProfile, startTransitionProfile] = useTransition()
    const [isPending, startTransition] = useTransition()
    const [user, setUser] = useState('')
    const [userA, setUserA] = useState('')
    const [active, setA] = useState('')
    const [isloggedOut, setLoggedOut] = useState(false)

    useEffect(()=>{
    
        const getcurrentUser = async() =>{
          // const authUser = await authUserEmail()
          // setUserA(authUser)
          startTransitionProfile(async()=>{
            onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser); 
              setA(currentUser)
              
            });
          })
          
        }
        getcurrentUser()
      },[user])

      const clearCookies = () => {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      };

    useEffect(()=>{

        const validateAuth = async() =>{
          // startTransition(async() => {
            const authUser = await authUserEmail()
            
            setUserA(authUser)
             
                if ((!authUser) && (pathname==="/")) {
                  
                  
                    window.location.href = "/login"
                    router.push('/login')
                    await closeSession()
                    clearCookies()
                    setAuthObject(prevState => ({ ...prevState, status: "Session Expired"}));
                    setLoggedOut(false)
                    await signOut(auth)
                    setUserA(null)
                    // setA(null)

                }
                    
                // })
                
                 //setUserA(null)
                // return null
        }
          
            

        
          const timerid = setTimeout(validateAuth, 20000)

          return () =>{
            clearTimeout(timerid)
          }

    }, [pathname, userA, active])

    useEffect (() => {

      onAuthStateChanged(auth, (currentUser) => {
        if (pathname!=="/login"){
          setUserA(currentUser)
        }  
      });
    }, [])

    const authO = {authObject: authObject, setAuthObject:setAuthObject, isloggedOut:{isloggedOut}, setLoggedOut:{setLoggedOut}, user:isPendingProfile?user:user, userA: userA, A: active}

  return (
    // <div>
        <authContext.Provider value={authO}>
          {/* {isPending? <div>Loading</div> : */}
           {children }
        </authContext.Provider>
    // </div>
  )
}
