'use client'
import { useState, useContext, useEffect, startTransition } from 'react';
import { app, auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged, signInWithCredential, linkWithCredential } from 'firebase/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { getLoginCredentials, validateAuth } from '../server actions/server actions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { closeSession } from '../server actions/server actions';
import { serialize } from 'cookie';
import { setCookie } from 'nookies';
import { authUserEmail } from '../server actions/server actions';
import { authContext } from './AuthComponent';
import { FaSpinner } from 'react-icons/fa';
import { useTransition } from 'react';
import GoogleSignInButton from './GoogleSignInButton';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [activeuser, setActiveUser] = useState(null)
  const [isPendingLogin, startTransitionLogin] = useTransition()
  const [isPendingLogout, startTransitionLogout] = useTransition()
  const [isPending, startTransition] = useTransition()
  
  const router = useRouter()

  const authO = useContext(authContext)

  const { authObject, setAuthObject, isloggedOut } = authO
  const { status } = authObject

  const [V, setV] = useState(null)

  useEffect(()=>{
    
    const revalidateAuth = async() => {
      isloggedOut===true? setV( "User logged out") : setV("Session Expired")
      startTransition(async() => {
        const user = await authUserEmail()
        const userV = await validateAuth()
        
        // const authC = getAuth()
        // onAuthStateChanged(authC, (currentUser) => {
        //   currentUser ? setV(status) : setV(status?status:"Session Expired soon")
        // })
        setActiveUser(user)
        
      })      
    }
    revalidateAuth()
  },[])

  const linkEmailWithGoogle = async (email, password, googleAccessToken) => {
    const auth = getAuth(app);
  
    try {
      // Step 1: Sign in with email and password
      const emailCredential = EmailAuthProvider.credential(email, password);
      const emailUserCredential = await signInWithCredential(auth, emailCredential);
  
      // Step 2: Create Google credential with the access token
      const googleCredential = GoogleAuthProvider.credential(null, googleAccessToken);
  
      // Step 3: Link Google account to the email/password account
      const linkedUser = await linkWithCredential(emailUserCredential.user, googleCredential);
      console.log('Linked successfully:', linkedUser);
    } catch (err) {
      console.error('Error linking Google with email:', err.message);
    }
  };

  const handleLogin = (e) =>{
    startTransitionLogin(async() => {
      e.preventDefault();
    try {  
      const auth = getAuth(app)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
  
      // Set the token in a cookie
        setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      
     

      console.log('User signed in');
      // console.log(token)
      console.log(await authUserEmail())
      console.log(await validateAuth())
      window.location.href = '/'
      
    } catch (err) {
      setError(err.message);
    }
  })

  }

  const handlelogOut = async() => {
    
    startTransitionLogout(async() => {
        try{
        // const response = await axios.get('/api/logout')
        // console.log(response.data)
        // const user = response.data
        // const user = await authUserEmail()
        if (!activeuser){
          alert ("Session already expired. Please login in.")
        } else {
          await signOut(auth)
          await closeSession()
          setAuthObject(prevState => ({ ...prevState, status: "User Logged out" || "Session Expired"}));
          router.push('/')
          // window.location.href = '/'  
        }
        
    }
    catch(err){
      console.error(err)
    }
  })
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {/* {console.log(V)} */}
        {/* {isPending? <h1>Loading...</h1> : <p>{V}</p>} */}
        {/* {status && <p className="text-blue-500 text-center">{status}</p>} */}
        <div 
        // onSubmit={handleLogin} 
        //action={getLoginCredentials}
        className="space-y-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              onChange={(e)=> setEmail(e.target.value)}
              name='email'
              type="email"
              placeholder="Email"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
              value={email}
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              onChange={(e) => {setPassword(e.target.value)}}
              name='password'
              type="password"
              placeholder="Password"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
              value={password}
            />
          </div>
          <button
          onClick={handleLogin}
            disabled={isPendingLogin}
            type="button"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {isPendingLogin? <FaSpinner className="animate-spin mx-auto"/> : 'Login'}
          </button>

          
          {/* <button
            disabled={isPendingLogout}
            onClick={handlelogOut}
            type="button"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {isPendingLogout? <FaSpinner className="animate-spin mx-auto"/> : 'Logout'}
          </button> */}
        </div>
        <GoogleSignInButton linkEmailWithGoogle={linkEmailWithGoogle}/>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <a href="/signup" className="text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
