'use server'
import axios from "axios"
// import { onAuthStateChanged, getAuth } from "firebase/auth"
import { getAuth } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { app } from "../firebase/firebaseConfig"
import { cookies } from "next/headers"
import { headers } from "next/headers"

export async function getUsers(){
    // const registeredUsers = await axios.get('http://localhost:3003/api/signup')
    // const users = await registeredUsers.data
    // return users
    return null
}

export async function validateAuth(){
    const authUser = await getAuth(app)
    const user = authUser && authUser.currentUser
    //var user //= authUser && authUser.currentUser
    // onAuthStateChanged(authUser, async(currentUser) => {
    //     if (currentUser){
    //             user = await currentUser.getIdToken();}
    //         else
    //         {
    //             console.log('User is not signed in ', user && user.uid, authUser

    //             )
    //         }
    //     //return user
    // })
    
     return user? user : null //user.getIdToken() : user

}

export const authUserEmail = async() => {
    const currentUser = await cookies().get('token');
    console.log(currentUser)
    return currentUser
}

export const closeSession = async() => {
    await cookies().delete('token')
}
// export async function getLoginCredentials(formData){

//     // const rawData = {
//     //     email : formData.get('email'),
//     //     password : formData.get('password')
//     // }

//     // e.preventDefault();
//     try {
//         const {email, password} = formData
//       await signInWithEmailAndPassword(auth, email, password);
//       alert('Login successful');
//     } catch (err) {
//       alert(err.message);
//     }

//      console.log(form)
// }