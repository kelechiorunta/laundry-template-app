'use client'
import { useEffect, useState } from 'react';
import { FaTshirt, FaShirtsinbulk, FaHatCowboy, FaTrash, FaSpinner } from 'react-icons/fa';
import { GiRunningShoe, GiDress, GiUnderwear, GiShorts, GiWinterGloves, GiSocks } from 'react-icons/gi'
import { useTransition } from 'react';
import Skeleton from 'react-loading-skeleton';
import { setDoc, addDoc, getDoc, doc, collection, arrayUnion, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, app } from '../firebase/firebaseConfig';

const listedwares = [
    { id: 'shirt', name: 'Shirt', price: 5, icon: <FaTshirt />, index:0 },
    { id: 'pants', name: 'Pants', price: 7, icon: <FaShirtsinbulk />, index:1 },
    { id: 'hat', name: 'Hat', price: 3, icon: <FaHatCowboy />, index:2 },
    { id: 'shoes', name: 'Shoe', price: 4, icon: <GiRunningShoe />, index:3 },
    { id: 'gown', name: 'Gown', price: 8, icon: <GiDress />, index:4 },
    { id: 'undies', name: 'Undies', price: 7, icon: <GiUnderwear />, index:5 },
    { id: 'shorts', name: 'Shorts', price: 7, icon: <GiShorts />, index:6 },
    { id: 'gloves', name: 'Gloves', price: 2, icon: <GiWinterGloves />, index:7 },
    { id: 'socks', name: 'Socks', price: 3, icon: <GiSocks />, index:8 },
  ];

export default function LaundryPickupForm({setSelectedTab}){
  const [selectedWares, setSelectedWares] = useState([]);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wares, setWears] = useState(listedwares)
  const [isPending, startTransition] = useTransition()
  const [isPendingSave, startTransitionSave] = useTransition()
  const [isPendingUser, startTransitionUser] = useTransition()
  const [isPendingPickup, startTransitionPickup] = useTransition()
  const [pickup, setPickup] = useState([])
  const auth = getAuth(app)
  

  useEffect(() => {
    const getUser = () => {
      startTransitionUser(async()=>{
        try{
          onAuthStateChanged(auth, async(user) => {
            if (user){
              const docRef = doc(db, 'wares', user.uid)
              const docRefSnapshot = await getDoc(docRef)
              if (docRefSnapshot.exists()){
                const data = docRefSnapshot.data()
                const { name, email, wares } = data
                setName(name)
                setEmail(email)
                setSelectedWares(wares)
              }
              else{
                setName(user.displayName)
                setEmail(user.email)
              }
            }
          })
        }
        catch(err){
          console.error(err.message, 'Unable to fetch user')
        }
      })
    }
    getUser()
  },[auth])

  useEffect(()=>{
    startTransition(async()=>{
        setWears(wares)
    })

  },[wares])

  const handleAddWare = (ware) => {
    setSelectedWares((prevSelectedWares) => {
      const wareIndex = prevSelectedWares.findIndex((w) => w.id === ware.id);
      if (wareIndex !== -1) {
        const updatedWares = [...prevSelectedWares];
        updatedWares[wareIndex] = {
          ...prevSelectedWares[wareIndex],
          price: prevSelectedWares[wareIndex].price + ware.price,
        };
        return updatedWares;
      } else {
        return [...prevSelectedWares, ware];
      }
    });
  };

  const handleRemoveWare = (index) => {
    setSelectedWares((prevSelectedWares) => {
        if (index!==-1){
            const newWares = [...prevSelectedWares];
            const currentItem = listedwares.find(i=>{return i.id===prevSelectedWares[index].id} )
            if (prevSelectedWares[index].price > currentItem.price){
                newWares[index] = {
                    ...prevSelectedWares[index], 
                    price: prevSelectedWares[index].price - currentItem.price
                }
                return newWares
            }
            else{
                newWares.splice(index, 1);
                return newWares;
            }
            
        } 
    });
  };

  const handlePickup = () => {
    startTransitionPickup(async()=>{
      try{
          const auth = getAuth();
          const activeUser = auth.currentUser;
          if (!activeUser) {
            throw new Error("No active user");
          }
          const activeUserId = activeUser.uid;
          const docRef = doc(db, 'wares', activeUserId);
          const docRefSnapshot = await getDoc(docRef);


          if (selectedWares){
            
            const addedPickup = [...pickup, selectedWares]
            setPickup(addedPickup)
            // const newlist = selectedWares.map(item=>({
            //   id: item.id,
            //   name: item.name,
            //   price: item.price
            // }))
            if (docRefSnapshot.exists()){
              await updateDoc(docRef, {
                pickup: addedPickup.map(i=>({
                  index: i
                }))
              }, {merge: true})
            }else{
              await setDoc(docRef, {
                pickup: addedPickup.map(i=>({
                  index: i
                }))
              }, {merge: true})
            }
            
          }


        
        setSelectedTab('pickups')
      }
      catch(err){
        console.error(err.message, "Unable to Schedule Pickups")
      }
      
    })
  }

  const handleSave = () => {
    startTransitionSave(async()=>{
      try {
        const auth = getAuth();
        const activeUser = auth.currentUser;
        if (!activeUser) {
          throw new Error("No active user");
        }
        const activeUserId = activeUser.uid;
        const docRef = doc(db, 'wares', activeUserId);
        const docRefSnapshot = await getDoc(docRef);
        
        
         // Ensure `selectedWares` is properly defined
        
        if (selectedWares){
  
          const waresArray = selectedWares.map(ware => ({
            id: ware.id,
            name: ware.name,
            price: ware.price,
          }));

        
          if (docRefSnapshot.exists()) {
            await updateDoc(docRef, {
              wares: waresArray,//arrayUnion(...waresArray),
              name: username || "", // Ensure username is handled properly
              email: email || ""    // Ensure email is handled properly
            });
            alert('Wares saved successfully');
          } else {
            console.log(selectedWares)
            await setDoc(doc(db, 'wares', activeUserId), {
              wares: waresArray,
              name: username || "", // Ensures username is handled properly
              email: email || ""    // Ensures email is handled properly
            });
            alert('Wares saved successfully');
          }
        }
      } catch (err) {
        console.error(err.message, "Unable to save wares");
      }
    
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Info:', { name, email });
    console.log('Selected Wares:', selectedWares);
  };

  return (
      <>
    {isPendingPickup ? (
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
    ) : 
      
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Laundry Pickup Form</h1>
      <form onSubmit={handleSubmit}>
      {isPendingUser ? (
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
      ) :
        (
        <>
        <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
        </>
              )
              }
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Select Wares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            wares && wares.map((ware) => {
              return(
                <div
                key={ware.id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddWare(ware)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{ware.icon}</div>
                  <div className="text-lg">{ware.name}</div>
                </div>
                <div className="text-lg">${ware.price}</div>
              </div>
              )
              
            }) 
         )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Selected Wares</h2>
          <ul>
            {selectedWares && selectedWares.map((ware, index) => (
              <li key={index} className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center">
                  <div className="text-xl mr-3">{ware.icon}</div>
                  <div>{ware.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3">${ware.price}</div>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveWare(index)}
                  >
                    <FaTrash/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-center gap-x-4 gap-y-4 xsm:max-sm:flex-col'>
            <button
                onClick={handleSave}
                type="button"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
                {isPendingSave? <FaSpinner className='animate-spin mx-auto'/> : 'Save' }
            </button>
            <button
                onClick={handlePickup}
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Schedule Pickup
            </button>
        </div>
      </form>
    </div>
          
        
        }
    </>  
  );

};

// export default LaundryPickupForm;



