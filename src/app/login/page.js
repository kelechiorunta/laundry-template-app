'use client'
import React from 'react'
import LaundryHeader from '../components/LaundryHeader'
import Login from '../components/Login'
import { useContext } from 'react'
import { authContext } from '../components/AuthComponent'


export default function SignUpPage() {
  const authO = useContext(authContext)
  const { authObject } = authO
  const { status } = authObject
  return (
    <div className='w-full flex flex-col'>
        <LaundryHeader/>
        {status && <p className='w-full text-right p-2'>{status}</p>}
        <Login/>
    </div>
  )
}