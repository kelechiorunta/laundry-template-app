'use client'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { authUserEmail } from '../server actions/server actions'


export const authContext = createContext(null)

export default function AuthComponent({children}) {

    const [authObject, setAuthObject] = useState({auth:null, status:''})

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

    const authO = {authObject: authObject, setAuthObject:setAuthObject}

  return (
    // <div>
        <authContext.Provider value={authO}>
            {children}
        </authContext.Provider>
    // </div>
  )
}
