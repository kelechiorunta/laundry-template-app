import React from 'react'
import LaundryHeader from '../components/LaundryHeader'
import About from '../components/About'
import AboutUs from '../components/AboutUs'

export default function about() {
  return (
    <div className='w-full h-full'>
        <LaundryHeader/>
        <AboutUs/>
        <About/>
    </div>
  )
}
