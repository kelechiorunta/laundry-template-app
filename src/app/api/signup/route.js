import { db } from "@/app/firebase/firebaseConfig";
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req, res) {
    
        try{
            // return NextResponse.json({message: 'Testing'}, {status: 200})
            const querySnapshot = await getDocs(collection(db, 'users'))
            const users = querySnapshot.map((docs) => docs.data())
            if (users && users.length > 0){
                return NextResponse.json(users, {status:200})
             } 
             return NextResponse.json({message: "No users found"}, {status:200})
        }
        catch(err){
            return NextResponse.json({ message: err.message }, { status: 500 });
        

        }   
}