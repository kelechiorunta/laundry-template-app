// console.log("Firebase Config:");
// console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
// console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
// console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
// console.log("Storage Bucket:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
// console.log("Messaging Sender ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
// console.log("App ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// USE THIS FOR LOCAL DEVELOPMENT

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};


// USE THIS FOR DEPLOYMENT

// const firebaseConfig = {
//   apiKey: "AIzaSyCBHioDX7Bo9lmsT3I680yKG2KVC5DabEc",//process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "laundry-demo-app-4574a.firebaseapp.com", //process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: "laundry-demo-app-4574a", //process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: "laundry-demo-app-4574a.appspot.com", //process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: "876817904637",//process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: "1:876817904637:web:01f50f4880f06f168e9f94",//process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: "G-FWPWCMPSFN",//process.env.NEXT_PUBLIC_MEASUREMENT_ID
// };



// console.log("Initializing Firebase with config:", firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
// const analytics = getAnalytics(app);
// console.log("Firebase app initialized:", app);
export {app, db, auth }