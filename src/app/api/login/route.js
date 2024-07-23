import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { app } from "@/app/firebase/firebaseConfig";
import { setCookie } from "nookies";
import { serialize } from "cookie";

export async function POST(req, res){

    const body = await req.json();
    const { email, password } = body

    // console.log(body)

    // console.log('Received email:', email);
    // console.log('Received password:', password);
    
    try{
        const authUser = getAuth(app)
        const userCredential = await signInWithEmailAndPassword(authUser, email, password);
        const token = await userCredential.user.getIdToken();
  
        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
          });
      
          // Create a new NextResponse object and set the cookie
          const response = NextResponse.json({ message: 'Login successful' , location: '/'});
          response.headers.set('Set-Cookie', cookie);
        
      
          return response;
    }
    catch(err){
        return NextResponse.json({message: err.message}, {status:500})
    }

}