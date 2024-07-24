'use client'
import { useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { getLoginCredentials } from '../server actions/server actions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { closeSession } from '../server actions/server actions';
import { serialize } from 'cookie';
import { setCookie } from 'nookies';
import { authUserEmail } from '../server actions/server actions';
import { authContext } from './AuthComponent';
import { FaSpinner } from 'react-icons/fa';
import { useTransition } from 'react';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [activeuser, setActiveUser] = useState(null)
  const [isPendingLogin, startTransitionLogin] = useTransition()
  const [isPendingLogout, startTransitionLogout] = useTransition()
  
  const router = useRouter()

  const authO = useContext(authContext)

  const { authObject, setAuthObject } = authO
  const { status } = authObject

  useEffect(()=>{
    const revalidateAuth = async() => {
        const user = await authUserEmail()
        setActiveUser(user)
    }
    revalidateAuth()
  },[])

  const handleLogin = (e) =>{
    startTransitionLogin(async() => {
      e.preventDefault();
    try {
        
      const auth = getAuth()
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
      window.location.href = '/'
      
          // Create a new NextResponse object and set the cookie
          //const response = NextResponse.json({ message: 'Login successful' , location: '/'});
      // const response = await axios.post('/api/login', { email, password },{
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      // const user = response.data
      //router.push(response.data.location || '/')
       //window.location.href = '/'//response.data.location
      // console.log(userCredential.user)
      // await signInWithEmailAndPassword(auth, email, password);
      // alert('Login successful');
      // setAuth(auth)
      // console.log(response)
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
        {/* {status && <p className="text-blue-500 text-center">{status}</p>} */}
        <form onSubmit={handleLogin} 
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
            disabled={isPendingLogin}
            type="submit"
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
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <a href="/signup" className="text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
