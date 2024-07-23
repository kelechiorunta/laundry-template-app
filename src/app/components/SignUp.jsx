'use client'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { getUsers } from '../server actions/server actions';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    const fetchUsers = async() => {
      try{
        const response = await axios.get('/api/signup')
        // const parsedResponse = response.data
        console.log(response)
      }
      catch(err){
        console.error("Problem dey")
      }
     
    }
    
    fetchUsers()
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form
          className="space-y-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Username"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Sign Up
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
