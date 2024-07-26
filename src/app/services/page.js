'use client'
import React from 'react'
import LaundryHeader from '../components/LaundryHeader'
import LandingServices from '../components/LandingServices'
import AboutService from '../components/AboutService'
import Discount from '../components/Discount'
import WhyChooseUs from '../components/WhyChooseUs'
import Support from '../components/Support'
import CallToAction from '../components/CallToAction'

export default function page() {
  return (
    <div className='w-full h-full'>
        <LaundryHeader/>
        <LandingServices/>
        <AboutService/>
        <Discount/>
        <WhyChooseUs/>
        <Support/>
        <CallToAction/>
    </div>
  )
}
