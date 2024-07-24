'use client'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { getUsers } from '../server actions/server actions';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useTransition } from 'react';
import { authUserEmail } from '../server actions/server actions';

const Signup = () => {
  const auth = getAuth()
  const [users, setUsers] = useState([])
  const [credentials, setCredentials] = useState({username: '', email:'', password: ''})
  const [addedUser, setAddedUser] = useState({username:'', user:{}})
  const [error, setError] = useState('')
  const [isPendingSignUp, startTransitionSignUp] = useTransition()
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({...credentials, [name] : value})
  }
  
  const createUser = async(e) => {
    startTransitionSignUp(async() => {
        e.preventDefault()
      try{
        const { username, email, password } = credentials
       
        const userCredential = await createUserWithEmailAndPassword (auth, email, password)
        const currentUser = userCredential.user

        await updateProfile(currentUser, {
          displayName: username
        })
        
        // currentUser.displayName = username
        const currentToken = await currentUser.getIdToken()
        const addedUser = {
          displayName: username,
          username,
          email,
          userId: currentUser.uid,
          token: currentToken,
        };
    
        await setDoc(doc(db, 'users', currentUser.uid), addedUser);
        
        console.log('User signed up and added to Firestore');
        
        window.location.href = '/';
      } catch (err) {
        // console.error('Error signing up:', err);
        setError(err.message);
      }
    
    })
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={createUser}
          className="space-y-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input 
              required
              value={credentials.username}
              name='username'
              onChange={handleChange}
              type="text"
              placeholder="Username"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              required
              value={credentials.email}
              onChange={handleChange}
              name='email'
              type="email"
              placeholder="Email"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              required
              value={credentials.password}
              onChange={handleChange}
              name='password'
              type="password"
              placeholder="Password"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            disabled={isPendingSignUp}
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {isPendingSignUp? <FaSpinner className="animate-spin mx-auto"/> : 'SignUp'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-indigo-500">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
