// components/Dashboard.js
'use client'
// components/Dashboard.js
import { FaUserCircle, FaSpinner } from 'react-icons/fa';
import { useEffect, useState, useTransition, useContext } from 'react';
import { getAuth, onAuthStateChanged, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDoc, setDoc, addDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { app, db } from '../firebase/firebaseConfig';
import { authContext } from './AuthComponent';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';

export default function Dashboard() {
  const [userEmail, setUserEmail ] = useState(null)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isPendingProfileUpdate, startTransitionProfileUpdate] = useTransition()
  const [isPendingUploadPic, startTransitionUploadPic] = useTransition()
  const authO = useContext(authContext)
  const { user } = authO

  const auth = getAuth(app)
  const [formData, setFormData] = useState({
    name: '',
    email: `${user && (user?.email)}` || '', //`${user && (user?.email).toString()}`,
    address: '',
    phone: '',
    photo: null,
    date: '',
    pickuptime: '',
    comments: '',
    // photoURL: null,
    });

  
    useEffect(()=>{
        
      const getcurrentUser = () =>{
        startTransition(async()=>{
          try{
            onAuthStateChanged(auth, async(user) => {
              if (user){
                setUserEmail(user.email);

                const userRef = doc(db, 'users', user.uid)
                const userrefsnapshot = await getDoc(userRef)
                if (userrefsnapshot.exists()){
                  const data = userrefsnapshot.data()
                  const {email, displayName, phone, photoURL, address, comments, date, pickuptime } = data
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    email: (email),
                    name: (displayName),  
                    phone: (phone),
                    photo: (photoURL),    
                    address: (address),    
                    comments: (comments),    
                    date: (date),    
                    pickuptime: (pickuptime),    
                  }));
                }
              }
               
            });
          }
          catch(err){
            console.error(err.message, "No current user")
          }
          
        })
      }
      getcurrentUser()
    },[authO, userEmail])

  

  const handleProfileUpdate = async (formData) => {
    startTransitionProfileUpdate(async () => {
      try {
        const authProfile = getAuth(app);
        const authProfileUser = authProfile.currentUser;
        
        // Update profile in Firebase Authentication
        if (authProfileUser){
          await updateProfile(authProfileUser, {
            displayName: formData && formData.name,
            // email: formData && formData.email,
            phoneNumber: formData && formData.phone,
            photoURL: formData && `${formData.photo || photoURL}`, // Uncomment if you want to update the photo URL
          });
  
          // Get the token for the current user
          const userid = authProfileUser.uid;
  
                    // Prepare the data for Firestore
          const updateData = {
            userId: userid,
            displayName: formData && formData.name ,
            email: formData && formData.email || '',
            phone: formData && formData.phone || '',
            address: formData && formData.address || '',
            date: formData && formData.date || '' ,
            pickuptime: formData && formData.pickuptime || '' ,
            comments: formData && formData.comments || '',
            photoURL: formData && `${formData.photo || photoURL}`, // Uncomment if you want to update the photo URL
          }

          const userRef = doc(db, 'users', userid);
          const userRefanapshot = await getDoc(userRef)

          if (userRefanapshot.exists()){
            await updateDoc(userRef, updateData);
            console.log(updateData)
            alert("Updates Successful");
          }else{
            await setDoc(userRef, updateData);
            console.log(updateData)
            alert("Entries saved for the first time Successful");
          }
          
        }
        
    
        // Update profile in Firestore
        
      } catch (err) {
        console.error(err.message);
        alert("Unable to Update: Please ensure your details are complete", err.message)
        }
      });
    };

    
    // const [active, setActive] = useState(user && (user?.email).toString())

  
    
      // Trying to extract the phoneNumber from the user's database

      // const [loading, setLoading] = useState(true)

      // useEffect(() => {
      //   const getUsers = async () => {
      //     startTransition(async () => {
      //       try {
      //         const authP = getAuth(app);
      //         const userP = authP && authP.currentUser;
      //         const userPid = userP && userP.uid;
    
      //         if (userPid) {
      //           const userRef = doc(db, 'users', userPid);
      //           const userRefsnapshot = await getDoc(userRef);
      //           if (userRefsnapshot.exists()) {
      //             const userData = userRefsnapshot.data();
      //             const { phone, phoneNumber, address, comments, pickuptime, date, photoURL } = userData;
    
      //             setFormData(prevFormData => ({
      //               ...prevFormData,
      //               phone: phone || phoneNumber,
      //               comments: comments,
      //               pickuptime: pickuptime,
      //               date: date,
      //               address: address,
      //               photoURL:photoURL || formData.photo
      //             }));
      //           } else {
      //             console.error("No such document!");
      //           }
      //         }
      //       } catch (err) {
      //         console.error(err.message);
      //       }
      //       // finally{
      //       //   setLoading(false)
      //       // }
      //     });
      //   };
      //     getUsers();
      // }, [authO]);


      

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

  const [photoURL, setPhotoURL] = useState(null);


  const handleFileChange = async (e) => {
    startTransitionUploadPic(async() => {
      const file = e.target.files[0];
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFormData({ ...formData, photo: downloadURL});
        setPhotoURL(downloadURL)
      }
    })
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  

  return (
    
    <div className="dashboard min-h-screen bg-[#101010] p-4 xsm:max-[400px]:min-w-[300px] xsm:max-[400px]:-ml-8">
      {/* {console.log(user)} */}
      {console.log(formData)}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg">
        {/* Sidebar Profile Section */}
        <div className="md:w-1/3 p-4 border-r border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
          {formData.photo===null? (
        <FaUserCircle size={50} className="text-gray-700 z-10" />
      ) : (
        <img
          className='rounded-full shadow-xl overflow-hidden bg-center object-fill w-[50px] h-[50px]'
          src={formData.photo}
          width={50}
          height={50}
          alt="Profile"
        />
      )}
            <div>
              <h1 className="text-xl font-bold md:w-2/3">{user && user?.displayName}</h1>
              {isPending? 
                    <FaSpinner className="animate-spin mx-auto text-black"/> 
                    :<p className="text-gray-600 min-w-[20%] block md:max-[1189px]:hidden xsm:max-[400px]:-indent-8 ">{userEmail}</p>
              }
            </div>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <FaUserCircle size={20} className="text-gray-500" />
              <Link href={'/account'}><span>Profile</span></Link>
            </li>
            <li className="flex items-center space-x-2">
              <FaUserCircle size={20} className="text-gray-500" />
              <Link href={'/account#pickups'}><span>Pickups</span></Link>
            </li>
            {/* Add more sidebar items here */}
          </ul>
        </div>

        {/* Main Content Section */}
        <div className="bg-[rgba(0,0,255,0.2)] bg-contain bg-[url('../../public/imgs/bg_memphis.png')] md:w-2/3 p-2 ">
          {/* <h2 className="text-2xl font-semibold mb-4">Schedule a Pickup</h2> */}
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Phone</label>
              <input
                type='text'
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Pickup Time</label>
              <input
                type="time"
                name="pickuptime"
                value={formData.pickuptime}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1 text-gray-700">Comments</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
                <label className="font-bold block text-sm text-gray-700">Photo</label>
              {
                isPendingUploadPic? 
                    <FaSpinner className="animate-spin mx-auto text-black"/> 
                    :
                <input
                  // value={formData.photo}
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              }
              </div>
              {/* {photoURL && <img src={photoURL} alt="Profile Preview" />} */}
              {/* {console.log(photoURL)} */}
              {formData.photo && <img src={formData.photo} alt="Profile" />}
            <div className='w-full flex items-center justify-center gap-x-4'>
              {/* <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Schedule Pickup
              </button> */}
              <button
              onClick={()=>handleProfileUpdate(formData)}
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
              {isPendingProfileUpdate? 
                    <FaSpinner className="animate-spin mx-auto text-black"/> : 'Update Profile'
              }
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
