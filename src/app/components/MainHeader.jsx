'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import logo from '../../../public/imgs/logo.png'
import logo from '../../../public/imgs/logo.png'
import { FaHamburger } from 'react-icons/fa'

export default function MainHeader() {
  return (
    <div className='w-full flex items-center gap-x-4 p-8 sticky top-0 z-20 justify-between bg-white text-white border xs:max-sm:p-4'>
        <Image src={logo} alt='logo' width={100} height={100}/>
        <nav className='flex  gap-x-8 items-center justify-between xs:max-[590px]:hidden'>
            <Link  className='rounded-[24px] px-4 py-2 bg-[#cfe2f4] text-[#418bd4]'  href={'/'}>Flight</Link>
            <Link   className=' text-[#418bd4]' href={'/'}>Hotels</Link>
            <Link  className=' text-[#418bd4]' href={'/'}>Tours</Link>
            <Link  className=' text-[#418bd4]'  href={'/'}>Bookings</Link>
        </nav>
        <nav className='flex gap-x-8 items-center justify-between text-black xs:max-[780px]:hidden'>
            <Link  className=''  href={'/'}>Support</Link>
            <Link   className='' href={'/'}>NGN</Link>
            <Link  className='' href={'/'}>EN</Link>
        </nav>
        <nav className='flex gap-4 items-center w-max justify-evenly xs:max-lg:hidden'>
            <button className='p-4 bg-[#0f7bdd] text-white rounded-[24px] px-4 py-3 md:max-lg:hidden'>Register</button>
            <button className='p-4 bg-[#0f7bdd] text-white rounded-[24px] px-4 py-3 md:max-lg:hidden'>Login</button>
        </nav>
        <nav className='hidden items-center w-max xs:max-lg:block'>
            <FaHamburger className='w-full xs:max-lg:block text-black'/>
        </nav>

    </div>
  )
}