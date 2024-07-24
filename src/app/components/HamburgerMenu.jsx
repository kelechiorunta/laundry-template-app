'use client'
import { useState } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import Link from 'next/link';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Brand</h1>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                HOME
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                SERVICES
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                ABOUT US
              </Link>
              <Link href="/articles" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                ARTICLES
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                SignUp
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaUser className="mr-1" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            HOME
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            SERVICES
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            ABOUT US
          </Link>
          <Link href="/articles" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            ARTICLES
          </Link>
          <Link href="/signup" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            SignUp
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaUser className="mr-1" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HamburgerMenu;