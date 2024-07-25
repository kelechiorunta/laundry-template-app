'use client'
import React, { useState } from 'react';
import { FaUser, FaTruck, FaTshirt, FaSpinner } from 'react-icons/fa';
import { useEffect, useTransition, useContext } from 'react';
import { getAuth, onAuthStateChanged, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDoc } from 'firebase/firestore';
import { app, db } from '../firebase/firebaseConfig';
import { authContext } from './AuthComponent';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import 'tailwindcss/tailwind.css';

const UserAccount = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  const [isPending, startTransition] = useTransition()

  const authO = useContext(authContext)
  
  const { user } = authO

  const auth = getAuth(app)
 
  

  const [userEmail, setUserEmail ] = useState(null)
  const [error, setError] = useState('')
  // const [isPending, startTransition] = useTransition()
  const [isPendingProfileUpdate, startTransitionProfileUpdate] = useTransition()
  const [isPendingUploadPic, startTransitionUploadPic] = useTransition()
  const [active, setActive] = useState(user && (user?.email).toString())

  const [formData, setFormData] = useState({
    name: '',
    email: `${user && (user?.email)}` || '', //`${user && (user?.email).toString()}`,
    address: '',
    phone: '',
    photo: null,
    date: '',
    pickuptime: '',
    comments: '',
    photoURL: null,
  });

  
    useEffect(()=>{
        
        const getcurrentUser = () =>{
          startTransition(async()=>{
            onAuthStateChanged(auth, (currentUser) => {
              setUserEmail(currentUser && currentUser.email); 
            });
          })
          setActive(user && (user?.email).toString())
          setFormData(prevFormData => ({
            ...prevFormData,
            email: (user && user.email),
            name: (user && user.displayName),  
            phone: (user && user.phoneNumber),
            photo: (user && user.photoURL),
            
              
          }));
          // setPhotoURL( user && user.photoURL)
        }
        getcurrentUser()
      },[auth, userEmail])

      // Trying to extract the phoneNumber from the user's database

      useEffect(() => {
        const getUsers = async () => {
          startTransition(async () => {
            try {
              const authP = getAuth(app);
              const userP = authP && authP.currentUser;
              const userPid = userP && userP.uid;
    
              if (userPid) {
                const userRef = doc(db, 'users', userPid);
                const userRefsnapshot = await getDoc(userRef);
                if (userRefsnapshot.exists()) {
                  const userData = userRefsnapshot.data();
                  const { phone, phoneNumber, address, comments, pickuptime, date, photoURL } = userData;
    
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    phone: phone || phoneNumber,
                    comments: comments,
                    pickuptime: pickuptime,
                    date: date,
                    address: address,
                    photoURL:photoURL || formData.photo
                  }));
                } else {
                  console.error("No such document!");
                }
              }
            } catch (err) {
              console.error(err.message);
            }
          });
        };
        getUsers();
      }, [authO]);
 
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   date: '',
  //   pickuptime: '',
  //   comments: '',
  //   photo: null
  // });

  // const [loading, setLoading] = useState(true);
  // const [userEmail, setUserEmail ] = useState(null)

  // // useEffect(()=>{
        
  // //   const getcurrentUser = () =>{
      
  // //     startTransition(async()=>{
  // //       const auth = getAuth(app)
  // //       onAuthStateChanged(auth, (currentUser) => {
  // //         setUserEmail(currentUser && currentUser.email); 
  // //       });
  // //     })
  // //     // setActive(user && (user?.email).toString())
  // //     setFormData(prevFormData => ({
  // //       ...prevFormData,
  // //       email: (user && user.email),
  // //       name: (user && user.displayName),  
  // //       phone: (user && user.phoneNumber),
  // //       photo: (user && user.photoURL),
        
          
  // //     }));
  // //     // setPhotoURL( user && user.photoURL)
  // //   }
  // //   getcurrentUser()
  // // },[formData.photo])

  // useEffect(() => {
    
  //   // const getUsers = async () => {
      
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
  //             const { phone, phoneNumber, address, email, displayName, comments, pickuptime, photo, date, photoURL } = userData;

  //             setFormData(prevFormData => ({
  //               ...prevFormData,
  //               phone: phone || phoneNumber,
  //               comments: comments,
  //               pickuptime: pickuptime,
  //               date: date,
  //               address: address,
  //               photo: photoURL,
  //               name: displayName,
  //               email: email
  //               //photoURL:photoURL || formData.photo
  //             }));
  //               // setLoading(false)
              
  //           } else {
  //             console.error("No such document!");
  //           }
  //         }
  //       } catch (err) {
  //         console.error(err.message);
  //       }
  //       finally{
  //         setLoading(false)
          
  //       }
  //     });
  //   // };
   
  //     // getUsers();
  //     setSelectedTab(selectedTab)
     
    
    
  // }, []) //, selectedTab, formData.address, 
  //   // formData.email, 
  //   // formData.comments, 
  //   // formData.name, 
  //   // formData.photo,
  //   // formData.date, 
  //   // formData.phone, 
  //   // formData.pickuptime]);

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return <Profile />;
      case 'pickups':
        return <Pickups />;
      case 'registerWares':
        return <RegisterWares formData={formData} setFormData={setFormData} isPending={isPending}/>;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen  mx-auto flex max-sm:flex-col bg-white p-6 rounded-lg shadow-lg">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 max-sm:w-full">
        <div className="p-4 flex flex-col items-center gap-4">
          {console.log(formData)}
        {formData.photo ? <img src={formData.photo} width={50} height={50} alt="Uploaded" className="rounded-full mt-4 w-[50px] h-[50px]" />:<FaUser size={40} />}
          {isPending? 
                    <FaSpinner className="animate-spin mx-auto text-white"/> 
          :<div className='flex flex-col'>
              <small className='block text-center'>{formData.name}</small>
              <small className='block text-center'>{formData.email}</small>
          </div>}
        </div>
        <nav className="mt-10">
          <ul>
            <li onClick={() => setSelectedTab('profile')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaUser className="inline-block mr-2" /> Profile
            </li>
            <li onClick={() => setSelectedTab('pickups')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaTruck className="inline-block mr-2" /> Pickups
            </li>
            <li onClick={() => setSelectedTab('registerWares')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaTshirt className="inline-block mr-2" /> Register Wares
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        {renderContent()}
      </main>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Profile content goes here...</p>
      {/* Add more profile details and icons here */}
    </div>
  );
};

const Pickups = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pickups</h2>
      <p>Pickups content goes here...</p>
      {/* TODO list for pickups */}
      <ul>
        <li>Completed Pickup 1</li>
        <li>Completed Pickup 2</li>
        <li>Incompleted Pickup 1</li>
        <li>Incompleted Pickup 2</li>
      </ul>
    </div>
  );
};

const RegisterWares = ({formData, setFormData, isPending}) => {

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register Wares</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      {/* {isPending?  */}
                    {/* <FaSpinner className="animate-spin mx-auto text-white"/>  */}
                    {/* : */}
        <>            
        <div>
          <label className="block">Name</label>
          <input type="text" name="name" value={formData && formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block">Email</label>
          <input type="email" name="email" value={formData && formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block">Phone</label>
          <input type="tel" name="phone" value={formData && formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block">Date</label>
          <input type="date" name="date" value={formData && formData.date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block">Pickup Time</label>
          <input type="time" name="pickuptime" value={formData && formData.pickuptime} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block">Comments</label>
          <textarea name="comments" value={formData && formData.comments} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
        </div>
        <div>
          <label className="block">Upload Photo</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        {formData && formData.photo && <img src={formData && formData.photo} alt="Uploaded" className="rounded mt-4" />}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </>
      {/* } */}
      </form>
    </div>
  );
};

export default UserAccount;
