import ChatBox from '@/app/components/ChatBox'
import LaundryHeader from '@/app/components/LaundryHeader'
import Modal from '@/app/components/Modal'
import React from 'react'

export default function page({params}) {
    const {email} = params
  return (
    <div className='w-full'>
        <LaundryHeader/>
        {/* <h1>My email is {email}</h1> */}
        {/* <Modal> */}
        <ChatBox email={email}/>
        {/* </Modal> */}
    </div>
  )
}
