// app/providers.js
'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }) {
  return (
    <SessionProvider 
    >
    {/* refetchInterval={1} 
    refetchOnWindowFocus={true}> */} 
      {children}
    </SessionProvider>
  )
}
