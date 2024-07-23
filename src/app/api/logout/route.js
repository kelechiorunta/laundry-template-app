import { NextResponse } from "next/server";
import { signOut, getAuth } from "firebase/auth";
import { app } from "@/app/firebase/firebaseConfig";
import { closeSession } from "@/app/server actions/server actions";

export async function GET(req, res){

    try{
        const auth = getAuth(app)
        await signOut(auth)
        await closeSession()
        const response = NextResponse.json({ message: 'Logged out' , location: '/'});
          response.headers.delete('Set-Cookie');
        // const NextResponse.json({message:"User Logged out"}, {status:200})
        return response
    }
    catch(err){
        return NextResponse.json({msg:err.message}, {status:500})
    }

}