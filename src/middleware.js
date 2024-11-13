
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { app } from './app/firebase/firebaseConfig';
import { authUserEmail, validateAuth } from './app/server actions/server actions';
import { cookies } from 'next/headers';
import { getToken } from 'next-auth/jwt';
// import { AuthConfig } from './pages/api/auth/[...nextauth]';
// import { getServerSession } from "next-auth/next"


export async function middleware(req) {
  const auth = getAuth(app)
  const currentU = await auth.currentUser
  const user = await validateAuth() //|| await getAuth(app);

  
  // Get the current user
   const userA = await authUserEmail()//auth && auth.currentUser;
   
   const token = await getToken({ req, secret: process.env.NEXT_SECRET });
  //  const session = await getServerSession(req, res, AuthConfig)
   if (token||userA) {
        return NextResponse.next();
      }
    
      // If not authenticated, redirect to sign-in page
      const signInUrl = new URL('/login', req.url);
      return NextResponse.redirect(signInUrl);
    }
  // If the user is not authenticated, redirect to the signup page
  // if (!(userA || user)) {
    
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Allow access to authenticated users
  // return NextResponse.next();

// Specify which routes to apply the middleware to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)'],
};


import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  /**
   * This is to prevent the middleware from redirecting to itself if user is unauthenticated.
   * Passing only a default middleware as in the comment ("export { default } from "next-auth/middleware") will cause
   * too many redirects to itself so by specifying custom pages route for sigin/login we redirect to this route/page to
   * avoid redirect error.
   */
  pages: {
    signIn: "/login",
    // error: "/error",
  },
})

// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If token exists, proceed
//   if (token) {
//     return NextResponse.next();
//   }

//   // If not authenticated, redirect to sign-in page
//   const signInUrl = new URL('/login', req.url);
//   return NextResponse.redirect(signInUrl);
// }

// // Match all routes except for API routes, static files, and assets
// export const config = {
//   matcher: [
//     /*
//      Match all routes except:
//      - API routes (start with /api)
//      - Static files (start with /_next/static)
//      - Image files (start with /_next/image)
//      - Public file types like .png, .jpg, .jpeg, .svg, .ico
//     */
//     //'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|svg|ico)).*)',
//     '/account','/', '/about', '/services((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|/).*)'
    
//   ],
// };