'use client'
import React, { startTransition, useState } from 'react';
import { FaUser, FaTruck, FaTshirt, FaSpinner, FaRegistered, FaUserEdit, FaConnectdevelop, FaEnvelopeOpenText, FaShoppingBasket } from 'react-icons/fa';
import { useEffect, useTransition, useContext } from 'react';
import { getAuth, onAuthStateChanged, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { app, db } from '../firebase/firebaseConfig';
import { authContext } from './AuthComponent';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ProfileUpload from './ProfileUpload';
import Skeleton from 'react-loading-skeleton';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import Dashboard from './DashBoard';
import Pickup from './Pickup';
import { FaPants, FaHat, FaPlus, FaMinus } from 'react-icons/fa';
// import LaundryPickupForm from './LaundryPickupForm';
import LaundryPickupForm from './LaundryPickupForm';
// import 'tailwindcss/tailwind.css';

const UserAccount = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  const wares = [
    { id: 'shirt', name: 'Shirt', price: 5, icon: <FaTshirt /> },
    { id: 'pants', name: 'Pants', price: 7, icon: <FaPants /> },
    { id: 'hat', name: 'Hat', price: 3, icon: <FaHat /> },
  ];


  const [isPending, startTransition] = useTransition()

  const authO = useContext(authContext)
  
  const { user, isSent, setSent } = authO

  const auth = getAuth(app)
  const [dataFetched, setDataFetched] = useState(false);
 
  

  const [userEmail, setUserEmail ] = useState(null)
  const [error, setError] = useState('')
  // const [isPending, startTransition] = useTransition()
  const [isPendingProfileUpdate, startTransitionProfileUpdate] = useTransition()
  const [isPendingUploadPic, startTransitionUploadPic] = useTransition()
  const [active, setActive] = useState(user && (user?.email).toString())
  const [isPendingLikes, startTransitionLikes] = useTransition()
  const [isPendingAlert, startTransitionAlert] = useTransition()

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
  const [foundUsers, setFoundUsers] = useState([])
  const [chats, setChats] = useState([])
  const [mergedIds, setMergedIds] = useState([])
  const [connects, setConnects] = useState([])
  const [toggle, setToggle] = useState(null)
  const [notificationSenders, setNotificationSenders] = useState([])
  const [isAlert, setAlert] = useState(null)
  
    useEffect(()=>{
        
        const getcurrentUser = () =>{
          startTransition(async()=>{
            onAuthStateChanged(auth, (currentUser) => {
              setUserEmail(currentUser && currentUser.email); 

              setFormData(prevFormData => ({
                ...prevFormData,
                email: (currentUser && currentUser.email),
                name: (currentUser && currentUser.displayName),  
                phone: (currentUser && currentUser.phoneNumber),
                photo: (currentUser && currentUser.photoURL),
                
                  
              }));
            });
          })
          setActive(user && (user?.email).toString())
          
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
                    photo:photoURL || formData.photo
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


      function getUsersById(users, text) {
        return users.filter(user => {return text.includes(user.userId)});
      }
      const foundfriends = new Set()
      function filterConnectsBySenderId(friends, id){
        
        ///id is now an array
         id.forEach(i=>{
        foundfriends.add(friends && friends.find(friend => {return (friend.userId == i)}))})
        return foundfriends
      }

      ///////
     
      useEffect(() => {
        const getUsersAndChats = () => {
          startTransition(async () => {
            try {
              const auth = getAuth(app);
              const authUser = auth.currentUser;
              const authUserToken = await authUser?.getIdToken();
    
              if (authUserToken) {
                const usersRef = collection(db, 'users');
                const chatsRef = collection(db, 'allchats');

                // const notificationRef = doc(db, 'notifications', authUser.uid)
                // const notificationRefSnapshot = await getDoc(notificationRef)

                const chatsSnapshot = await getDocs(chatsRef);
                
                const [usersRefsnapshot, chatsRefsnapshot] = await Promise.all([
                  getDocs(usersRef),
                  getDocs(chatsRef)
                ]);
    
                const usersArray = [];
                const chatsArray = [];
                var sliceditems = []
                
    
                usersRefsnapshot.forEach((doc) => {
                  usersArray.push(doc.data());
                });
    
                const chatIdsArray = chatsSnapshot.docs.map(doc => {return  doc.id});
                const filteredArray = chatIdsArray.filter(id=>{return id.includes(authUser.uid)})
              
                console.log(filteredArray)
                console.log(chatIdsArray)
                console.log(filteredArray && filteredArray.length)

                setChats(filteredArray && filteredArray.length)
    
                console.log('Users:', usersArray);
                console.log('Chats:', chatsArray);
    
                const otherUsers = usersArray.filter(user => user.displayName !== authUser.displayName);
                setFoundUsers(otherUsers);

                console.log(otherUsers)

                
                const newarray = [];
                const sendersarray = [];
                var senders = [];
                filteredArray && filteredArray.forEach(i => {
               
                    newarray.push(getUsersById(otherUsers, i)[0]) //This is to extract other users merged in a chat with the current authenticated User
                    console.log(newarray)
                    setConnects(newarray)

                    otherUsers.forEach(async(user)=>{
                      const chatDocId = [isSent || authUser.uid, user.userId].sort().join('_');
                      
                      const notificationRef = doc(db, 'notifications', chatDocId)
                      const notificationRefSnapshot = await getDoc(notificationRef)
                      
                      if (notificationRefSnapshot.exists()){
                        console.log(notificationRefSnapshot.data())
                        const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
                          if (snapshot){
                            const data = snapshot.data()
                            
                            senders = (filterConnectsBySenderId(newarray, data.sender))
                            console.log(senders)
                            console.log(isSent)
                            
                            setNotificationSenders(senders)
                            startTransitionAlert(() =>{
                              setAlert(isSent)
                            })
                            
                            console.log(notificationRefSnapshot.data)
    
                            // updateDoc(notificationRef, {
                            //   notification: '',
                            //   // or use this to mark it as read
                            //   // read: true,
                            // });
                          }
                          
                        })
                        
                        return () => unsubscribe()
                      }
                      
                    })
                    
                   })
                
              }
            } catch (err) {
              console.error('Unable to fetch Users or Chats:', err.message);
            }
          });
        };
        console.log(isSent)
        getUsersAndChats();
      }, [authO, formData, isSent, chats, isAlert]);

  //////



  const renderContent = ({allMessages, user, chats, mergedIds, isPendingLikes, formData}) => {
    switch (selectedTab) {
      case 'profile':
        return <div><Profile notificationSenders={notificationSenders} setToggle={setToggle} toggle={toggle} connects={connects} allMessages={allMessages} isPendingLikes={isPendingLikes} mergedIds={mergedIds} chats={chats} pendingUsers={pendingUsers} foundUsers={foundUsers} isProfileActive={selectedTab === 'profile'} pickupData={pickupData} setPickupData={setPickupData} user={user} dataFetched={dataFetched} setDataFetched={setDataFetched} startTransition={startTransition} formData={formData} setFormData={setFormData} isPending={isPending} authO={authO} /></div>;
      case 'pickups':
        return <Pickups user={user} formData={formData} />;
      case 'update':
        return <Dashboard user={user} formData={formData}/>;//<Pickups user={user} formData={formData} />;
      case 'wares':
        return <LaundryPickupForm wares={wares} setSelectedTab={setSelectedTab}/>
        // return <LaundryPickupForm/>;
      case 'registerWares':
        return <RegisterWares formData={formData} setFormData={setFormData} isPending={isPending}/>;
      case 'savedPickups':
        return <Pickup />
      default:
        return <Profile chats={chats} user={user}/>;
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
            <li onClick={() => setSelectedTab('update')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaUserEdit className="inline-block mr-2" /> Update Profile
            </li>
            <li onClick={() => setSelectedTab('wares')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaRegistered className="inline-block mr-2" /> Register
            </li>
            <li onClick={() => setSelectedTab('pickups')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaTruck className="inline-block mr-2" /> Pickups
            </li>
            <li onClick={() => setSelectedTab('registerWares')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaTshirt className="inline-block mr-2" /> Book an Appointment
            </li>
            <li onClick={() => setSelectedTab('savedPickups')} className="p-4 hover:bg-gray-700 cursor-pointer">
              <FaShoppingBasket className="inline-block mr-2" /> View Pickups
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        {renderContent({user, chats, mergedIds, isPendingLikes, connects, toggle, setToggle, formData})}
      </main>
    </div>
  );
};

const Profile = ({notificationSenders, toggle, connects, setToggle, mergedIds, chats, user, isPendingLikes, pendingUsers, foundUsers,  isProfileActive, pickupData, formData, isPending, setFormData, setPickupData, authO,  startTransition, dataFetched, setDataFetched}) => {
  
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
          <div className="flex flex-col items-center ">
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
            {console.log(connects)}
            {isPendingLikes && isPendingAlert? <p>Loading</p>:
            <div className='flex flex-col items-center gap-y-4'>
              <p className='uppercase font-bold'>{`${formData.name} has ${chats && chats} connect${chats<2?'':'s'}`}</p>
              <div className='relative flex items-center '>
              {notificationSenders && Array.from(notificationSenders).map(sender=>{
                return (
                  
                  <div className='relative'>
                    {sender && 
                    <>
                    <Link href={`/chat/${encodeURIComponent(sender && sender.email)}`}><img src={sender && sender.photoURL} className='relative w-[50px] h-[50px] rounded-full shadow-md border
                    bg-black text-white justify-center items-center flex' alt={sender && sender.displayName[0]} /></Link>
                    <span className='absolute w-[25px] h-[25px] flex items-center rounded-full shadow-md -bottom-4 right-4
                    justify-center bg-white text-red-500'>{sender && sender.displayName[0]}
                    </span>
                    </>}
                  </div>
                  
                )
              })}
              </div>
              {((Array.from(notificationSenders))[(Array.from(notificationSenders)).length - 1] !== undefined) && <span>These have sent notifications. Please check chat arena.</span>}
            </div>
            }
            <div className='relative '>
            {<span className='relative cursor-pointer' onMouseEnter={()=>setToggle(true)} onMouseOut={()=>setToggle(false)}>CHECK FRIENDS</span>}
            {toggle && 
              <div className='shadow-md rounded-md absolute z-10 flex flex-col items-start bg-black text-white pl-4 pr-4 w-[200px]' >
                {connects && connects.map(item => {return <li className='cursor-pointer' key={item.userId}>{item.displayName.toUpperCase()}</li>})}
              </div>}
            </div>
            {pendingUsers && isPending?
                    <FaSpinner className="animate-spin mx-auto text-black"/> 
                    : <div>
                        {foundUsers && 
                        <ul className='bg-gray-200 rounded-2xl w-full grid p-8 grid-cols-3 shadow-2xl border xsm:max-lg:grid-cols-2 xsm:max-[400px]:grid-cols-1 xsm:max-[400px]:min-w-[280px]'>
                          <h1 className='font-extrabold text-xl col-span-3 pb-4 text-center xsm:max-lg:col-span-2 auto-cols-fr'>CONNECT AND CHAT</h1>
                          {foundUsers.map((user)=>{
                            return(
                              <div className='bg-white flex items-center gap-4 border rounded-2xl shadow-md p-4 flex-col justify-between xsm:max-[670px]:col-span-2 xsm:max-lg:col-span-1 '>
                                <div className='overflow-hidden'>
                                  {user.photoURL?<img className='rounded-full shadow-md border w-[50px] h-[50px]' 
                                  src={user.photoURL} width={50} height={50} alt='User'/>
                                  :<p className='rounded-full shadow-lg flex items-center justify-center bg-black text-white w-[50px] h-[50px]'>{user.displayName[0]}</p>}
                                </div>
                                {/* {console.log(chats && chats.length>0? chats:"Nothing")} */}
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
  const [data, setData] = useState(null)
  const [isPendingData, startTransitionData] = useTransition()
  const auth = getAuth(app)
  useEffect(() => {
    const getPickups = () => {
      startTransitionData(async()=>{
          try{
            const currentU = auth.currentUser
            const user_id = currentU.uid
            const ref = doc(db, 'wares', user_id)
            const refSnapshot = await getDoc(ref)
            if (refSnapshot.exists()){
              const data = refSnapshot.data()
              const {pickup} = data
              setData(pickup)
              // setData(pickup.map((i,index)=>({i})))

            }
          }
          catch(err){
            console.error(err.message)
          }
      })
    }
    getPickups()
  }, [auth])
  return (
    <div id='pickups'>
      <h2 className="text-2xl font-bold mb-4">Pickups</h2>
      {isPendingData?<FaSpinner className='animate-spin mx-auto text-white'/>:<p>Pickups content goes here...</p>}
      {/* TODO list for pickups */}
      <ul className='flex flex-col'>
        <li className='flex gap-4'>
          {data && data[0].index.map(i=>{
          return <div className='flex flex-col'>
                  <li>{i && i.id.toUpperCase()}</li>
                  <li>{i && i.price}</li>
                  </div>})
                  }
        </li>
        {console.log(data && data[0].index[0].price)}
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
