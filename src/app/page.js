'use client'
import Image from "next/image";
import LandingSection from "./components/LandingSection";
// import MainHeader from "./components/MainHeader";
import OurPromise from "./components/OurPromise";
import About from "./components/About";
import DiscoverService from "./components/DiscoverService";
import Discount from "./components/Discount";
import WhyChooseUs from "./components/WhyChooseUs";
import Support from "./components/Support";
import CallToAction from "./components/CallToAction";
import Testimonials from "./components/Testimonials";
import ArticlesBlog from "./components/ArticlesBlog";
import LaundryHeader from "./components/LaundryHeader";
import HamburgerMenu from "./components/HamburgerMenu";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { app } from "./firebase/firebaseConfig";



export default function Home() {

  const { data: session, status } = useSession();

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
    
  return (
    <main className="w-full max-w-screen overflow-hidden flex flex-col items-center justify-between bg-transparent xsm:max-2xl:max-w-screen">
        {/* <MainHeader/> */}
        {/* <div className="w-full sticky top-0 z-50 border border-black"><LaundryHeader/></div> */}
        <div className="w-screen fixed top-0 z-50 "><LaundryHeader/></div>
        {/* <HamburgerMenu/> */}
        <LandingSection/>
        <About/>
        <OurPromise/>
        <DiscoverService/>
        <Discount/>
        <WhyChooseUs/>
        <Support/>
        <CallToAction/>
        <Testimonials/>
        <ArticlesBlog/>
        <LandingSection/>
    </main>
  );
}
