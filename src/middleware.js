
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { app } from './app/firebase/firebaseConfig';
import { authUserEmail, validateAuth } from './app/server actions/server actions';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const auth = getAuth(app)
  const currentU = await auth.currentUser
  const user = await validateAuth() //|| await getAuth(app);

  
  // Get the current user
   const userA = await authUserEmail()//auth && auth.currentUser;
   

  // If the user is not authenticated, redirect to the signup page
  if (!(userA)) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to authenticated users
  return NextResponse.next();
}

// Specify which routes to apply the middleware to
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|signup).*)'],
};
