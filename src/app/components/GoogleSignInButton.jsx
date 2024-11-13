import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { GoogleAuthProvider, signInWithCredential, getAuth, signInWithPopup, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { app, db } from '../firebase/firebaseConfig';

export default function GoogleSignInButton({linkEmailWithGoogle}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isPendingLogin, startTransitionLogin] = useTransition()

    // const handleGoogleLoginAndLink = async (email, password) => {
    //     const auth = getAuth();
        
    //     // First, sign in with NextAuth and get Google access token
    //     const googleResult = await signIn('google');
    //     const { accessToken } = googleResult;
      
    //     try {
    //       // Step 1: Try signing in with email/password
    //       const emailUserCredential = await signInWithEmailAndPassword(auth, email, password);
      
    //       // Step 2: Create Google credential and link it with email/password user
    //       const googleCredential = GoogleAuthProvider.credential(null, accessToken);
    //       await linkWithCredential(emailUserCredential.user, googleCredential);
      
    //       console.log('User signed in and linked successfully');
    //     } catch (error) {
    //       console.error('Error during Google login and linking:', error.message);
    //     }
    //   };

    const handleGoogleLogin = async () => {
        try {
          // Step 1: Sign in with Google via NextAuth (to get the Google access token)
          const googleResult = await signIn('google');
          const { accessToken } = googleResult;

          const auth = getAuth(app);
    
          // Step 2: Sign in with Google credentials in Firebase
        //   const googleCredential = GoogleAuthProvider.credential(null, accessToken);
          const googleCredential = GoogleAuthProvider.credential(session.idToken);
          const googleUserCredential = await signInWithCredential(auth, googleCredential);

          const token = await googleUserCredential.user.getIdToken();
  
      // Set the token in a cookie
        setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    
          console.log('Signed in successfully with Google:', googleUserCredential.user);

            // Create a credential using the Google OAuth token from NextAuth
            // const credential = GoogleAuthProvider.credential(session.idToken);
  
            // Sign in with Firebase using the credential
            // await signInWithCredential(auth, credential);
    
          // Step 3: Optional: Link Google with existing Email/Password account
        //   const email = 'user@example.com'; // Replace with actual email input or from session
        //   const password = 'password123'; // Replace with actual password input
    
        if (email && password) {
            await linkEmailWithGoogle(email, password, accessToken);
          }
          
        } catch (err) {
          console.error('Error signing in with Google:', err.message);
        }
      };
  
 useEffect(() => {
    const authenticateWithFirebase = async () => {
        if (session && status === "authenticated") {
          try {
            // Get the Firebase Auth instance
            const auth = getAuth(app);
  
            // Create a credential using the Google OAuth token from NextAuth
            const credential = GoogleAuthProvider.credential(session.idToken);
  
            // Sign in with Firebase using the credential
            await signInWithCredential(auth, credential);
  
            console.log("User signed in with Firebase!");
          } catch (error) {
            console.error("Error signing in with Firebase: ", error);
          }
        }
      };
  
      authenticateWithFirebase();
    }, [session, status]);
  

    // const handleGoogleLogin = async () => {
    //     const auth = getAuth();
    
    //     try {
    //       // Sign in with Google OAuth via NextAuth
    //       const googleResult = await signIn('google');
    //       const { accessToken } = googleResult;
    
    //       // Sign in with Google credentials in Firebase
    //       const googleCredential = GoogleAuthProvider.credential(null, accessToken);
    //       const userCredential = await signInWithCredential(auth, googleCredential);
          
    //       console.log('Signed in successfully with Google:', userCredential.user);
    //     } catch (err) {
    //       console.error('Error signing in with Google:', err.message);
    //     }
    // }
  return (
        <>
         <button 
         className=" flex items-center justify-center w-full bg-indigo-500 gap-x-4 mt-4
          text-white py-2 px-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        
            onClick={handleGoogleLogin}>
              <FaGoogle 
              // style={{
                
              // }}
              fill={'white'} 
              size={20}/> 
              {isPendingLogin? <FaSpinner fill='white' className='animate-spin m-auto' size={20}/> : 'Sign in with Google' }
          </button>
        </>
  )
}
