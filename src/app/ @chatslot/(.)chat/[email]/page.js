// import React from 'react'

// export default function page() {
//   return (
//     <div>
//         <h1>Intercepting chat</h1>
//     </div>
//   )
// }

'use client'
// pages/index.js
import { useState } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import Modal from '../components/Modal';
import ChatBox from '@/app/components/ChatBox';

export default function Page(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);
  const router = useRouter();

  const handleRouteChange = (url) => {
    setModalOpen(true);
    setNextRoute(url);
    return false; // Cancel the route change
  };

  const confirmNavigation = () => {
    setModalOpen(false);
    router.push(nextRoute);
  };

  router.events.on('routeChangeStart', handleRouteChange);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <button
        onClick={() => router.push('/about')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
      >
        Go to About
      </button>
      <Modal
        isOpen={true}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmNavigation}
      >
        <ChatBox/>
    </Modal>
    </div>
  );
};

