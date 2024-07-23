// import { NextRequest, NextResponse } from "next/server"
// import { validateAuth } from "./app/server actions/server actions";
// import { app } from "./app/firebase/firebaseConfig";
// import { getAuth } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";

// export async function middleware(request){
//     const activeUser = getAuth(app)//await validateAuth()
//     // const user = activ //onAuthStateChanged(active)
    
//     if (activeUser.currentUser){
//         return NextResponse.redirect(new URL('/signup', request.url));
//     }
//     console.log(activeUser)
//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico|login|signup).*)'],
//   };

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { app } from './app/firebase/firebaseConfig';
import { authUserEmail } from './app/server actions/server actions';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const user = await authUserEmail() //|| await getAuth(app);

  
  // Get the current user
//   const user = auth && auth.currentUser;

  // If the user is not authenticated, redirect to the signup page
  if (!user) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to authenticated users
  return NextResponse.next();
}

// Specify which routes to apply the middleware to
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|signup).*)'],
};
