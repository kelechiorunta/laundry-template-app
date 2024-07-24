import React from 'react'
import LaundryHeader from '../components/LaundryHeader'
import Signup from '../components/SignUp'

export default function SignUpPage() {
  return (
    <div className='signup w-full flex flex-col'>
        <LaundryHeader/>
        <Signup/>
    </div>
  )
}
