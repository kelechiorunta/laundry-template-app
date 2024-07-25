import React from 'react'
import LaundryHeader from '../components/LaundryHeader'
import UserAccount from '../components/UserAccount'

export default function page() {
  return (
    <div className='w-full h-full'>
        <LaundryHeader/>
        <UserAccount/>
    </div>
  )
}
