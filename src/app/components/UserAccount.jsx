'use client'
import React, { useState } from 'react';
import { FaUser, FaTruck, FaTshirt, FaSpinner, FaConnectdevelop, FaEnvelopeOpenText } from 'react-icons/fa';
import { useEffect, useTransition, useContext } from 'react';
import { getAuth, onAuthStateChanged, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { app, db } from '../firebase/firebaseConfig';
import { authContext } from './AuthComponent';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ProfileUpload from './ProfileUpload';
import Skeleton from 'react-loading-skeleton';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
// import 'tailwindcss/tailwind.css';

const UserAccount = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  const [isPending, startTransition] = useTransition()

  const authO = useContext(authContext)
  
  const { user } = authO

  const auth = getAuth(app)
  const [dataFetched, setDataFetched] = useState(false);
 
  

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

  // const [formData, setFormData] = useState(null);
  const [pickupData, setPickupData] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [isTransition, startTransition] = useTransition()
  // const authO = useContext(authContext)
  const [pendingUsers, startTransitionUsers] = useTransition()
  const [foundUsers, setFoundUsers] = useState(null)

  
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

      ////////////////////////////// FOR GETTING THE PICKUPS
      useEffect(() => {
        const fetchUserData = async () => {
          if(!dataFetched){
          startTransition(async () => {
            try {
              const authP = getAuth(app);
              const userP = authP && authP.currentUser;
              const userPid = userP && userP.uid;
    
              if (userPid) {
                //  const userRef = doc(db, 'users', userPid);
                const pickupRef = doc(db, 'pickups', userPid);
                const pickupRefsnapshot = await getDoc(pickupRef);
                // const userRefsnapshot = await getDoc(userRef);
    
                // if (userRefsnapshot.exists()) {
                //   const data = userRefsnapshot.data();
                //   setFormData(data);
                // }
    
                if (pickupRefsnapshot.exists()) {
                    const pickupdata = pickupRefsnapshot.data();
                    setPickupData(pickupdata);
                  }
              }
            } catch (err) {
              console.error(err.message);
            } finally {
              // setIsPending(false);
              setDataFetched(true)
            }
          });
        }
        fetchUserData()
        };
        
      }, [ authO, dataFetched]);
      // ///////////////////////////////////////////


      ///////

      
     
  useEffect(() => {
    const getUsers = () => {
      startTransition(async () => {
        try {
          const auth = getAuth(app);
          const authUser = auth.currentUser;
          const authUserToken = await authUser?.getIdToken();

          if (authUserToken) {
            const usersRef = collection(db, 'users'); // Corrected to use collection

            const usersRefsnapshot = await getDocs(usersRef);
            const usersArray = [];
            usersRefsnapshot.forEach((doc) => {
              usersArray.push(doc.data());
              // console.log(usersArray)
            });
            const otherusers = usersArray && usersArray.filter((user)=> {return user.displayName !== authUser.displayName})
            setFoundUsers(otherusers);
          }
        } catch (err) {
          console.error('Unable to fetch Users:', err.message);
        }
      });
    };
    getUsers();
  }, [authO, formData]);


  const renderContent = ({user}) => {
    switch (selectedTab) {
      case 'profile':
        return <div><Profile pendingUsers={pendingUsers} foundUsers={foundUsers} isProfileActive={selectedTab === 'profile'} pickupData={pickupData} setPickupData={setPickupData} user={user} dataFetched={dataFetched} setDataFetched={setDataFetched} startTransition={startTransition} formData={formData} setFormData={setFormData} isPending={isPending} authO={authO} /></div>;
      case 'pickups':
        return <Pickups user={user} formData={formData} />;
      case 'registerWares':
        return <RegisterWares formData={formData} setFormData={setFormData} isPending={isPending}/>;
      default:
        return <Profile user={user}/>;
    }
  };

  return (
    <div className="min-h-screen  mx-auto flex max-[900px]:flex-col bg-white p-6 rounded-lg shadow-lg">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 max-[900px]:w-full">
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
        {renderContent({user})}
      </main>
    </div>
  );
};

const Profile = ({user, pendingUsers, foundUsers,  isProfileActive, pickupData, formData, isPending, setFormData, setPickupData, authO,  startTransition, dataFetched, setDataFetched}) => {
  
  useEffect(() => {
    if (isProfileActive) { // Fetch only if Profile tab is active
      const fetchAgain = async() =>{
        try {
          const authP = getAuth(app);
          const userP = authP && authP.currentUser;
          const userPid = userP && userP.uid;
  
          if (userPid) {
            const userRef = doc(db, 'users', userPid);
            const pickupRef = doc(db, 'pickups', userPid);
            const pickupRefsnapshot = await getDoc(pickupRef);
            const userRefsnapshot = await getDoc(userRef);
  
            // if (userRefsnapshot.exists()) {
            //   const data = userRefsnapshot.data();
            //   setFormData(data);
            // }
  
            if (pickupRefsnapshot.exists()) {
                const pickupdata = pickupRefsnapshot.data();
                setPickupData(pickupdata);
              }
          }
        } catch (err) {
          console.error(err.message);
        } 
      }
      fetchAgain()
    }
    // fetchUserData();
  
  }, [isProfileActive, formData.photoURL, authO])

  function convert24To12(time24) {
    const [hours, minutes] = time24.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
  
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    return date.toLocaleString('en-US', options);
  }
  
   
  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      {isPending ? (
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton circle={true} height={50} width={50} />
            <div>
              <Skeleton width={120} />
              <Skeleton width={180} />
            </div>
          </div>
          <Skeleton count={3} />
        </div>
      ) : (
        formData && (
          <div className="flex flex-col items-center">
            {formData.photoURL || formData.photo ? (
              <img
                className="rounded-full shadow-xl overflow-hidden bg-center object-fill w-[50px] h-[50px]"
                src={formData.photoURL || formData.photo}
                width={50}
                height={50}
                alt="Profile"
              />
            ) : (
              <FaUserCircle size={50} className="text-gray-700 z-10" />
            )}
            <h2 className="text-xl font-bold mt-4">{formData.name}</h2>
            <p className="text-gray-600">{formData.email}</p>
            <p className="text-gray-600">{formData.phone}</p>
            {pendingUsers && isPending?
                    <FaSpinner className="animate-spin mx-auto text-black"/> 
                    : <div>
                        {foundUsers && 
                        <ul className='bg-gray-200 rounded-2xl w-full grid p-8 grid-cols-3 shadow-2xl border xsm:max-lg:grid-cols-2'>
                          <h1 className='font-bold col-span-3 pb-4 xsm:max-lg:col-span-2 auto-cols-fr'>CONNECT AND CHAT</h1>
                          {foundUsers.map((user)=>{
                            return(
                              <div className='bg-white flex items-center gap-4 border rounded-2xl shadow-md p-4 flex-col justify-between xsm:max-[670px]:col-span-2 xsm:max-lg:col-span-1'>
                                <div className='overflow-hidden'>
                                  <img className='rounded-full shadow-md border w-[50px] h-[50px]' 
                                  src={user.photoURL} width={50} height={50} alt='User'/>
                                </div>
                                <li className='font-bold text-[17px] text-center'>{user.displayName}</li>
                                <Link href={`/chat/${encodeURIComponent(user.email)}`} className='flex items-center gap-x-2'><FaEnvelopeOpenText/> Chat</Link>
                                {/* <li className='font-[Poppins] text-[15px] p-4'>{user.email}</li> */}
                              </div>
                                
                            )
                          })
                        }
                        </ul>
                      }
                    </div>
                }
            {/* Add more user details here */}
            {console.log(pickupData)}
            {
            pickupData &&
             <table className='shadow-md p-4 border w-[100%] '> 
                
                <thead className='flex items-center shadow-md p-2 border-r max-[450px]:flex-col'>
                    {/* <tr><th className='w-full'>Name</th></tr> */}
                    <tr className='border-r shadow-md pb-2 pl-2'><th className='text-center w-full'>Time</th></tr>
                    <tr className='border-r shadow-md pb-2 pl-2'><th className='text-center w-full'>Date</th></tr>
                </thead>

                <tbody className='flex items-start shadow-md p-2 w-full max-[450px]:flex-col'>

                    {/* <tr><td>{pickupData.user}</td></tr>  */}
                    
                    <tr className='border-r pb-2 pl-2'>
                        <td className='flex flex-col '>{(pickupData && pickupData.length>0) && pickupData.pickuptime.map((k)=>{

                            return <li className='w-full' key={k}>{convert24To12(k)}</li>
                        })}
                        </td>
                    </tr>

                    <tr className='border-r pb-2 pl-2'>
                        <td className='flex flex-col '>{(pickupData && pickupData.length>0) && pickupData.pickupdate.map((d)=>{
                            return <li className='w-full' key={d}>{d.toString()}</li>
                        })}
                        </td>
                    </tr>

                </tbody>
            </table>                    
            }
          </div>
        )

        
      )}
    </div>
  );
};

  // return (
  //   <div>
  //     <h2 className="text-2xl font-bold mb-4">Profile</h2>
  //     <p>Welcome {user && user.displayName}</p>
  //     <ul><ProfileUpload user={user}/></ul>
  //     {/* Add more profile details and icons here */}
  //   </div>
  // );



const Pickups = ({user, formData}) => {
  return (
    <div id='pickups'>
      <h2 className="text-2xl font-bold mb-4">Pickups</h2>
      <p>Pickups content goes here...</p>
      {/* TODO list for pickups */}
      <ul>
        <li>Completed Pickup 1</li>
        <li>Completed Pickup 2</li>
        <li>Incompleted Pickup 1</li>
        <li>Incompleted Pickup 2</li>
      </ul>
      <ul><ProfileUpload user={user}/></ul>
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
