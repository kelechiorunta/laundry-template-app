// // components/ChatBox.js
// 'use client'
// import React, { useState, useEffect, startTransition, useTransition } from 'react';
// import { app, db } from '../firebase/firebaseConfig';
// import Skeleton from 'react-loading-skeleton';
// import {
//     getDocs,
//   collection,
//   addDoc,
//   onSnapshot,
//   query,
//   orderBy,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';
// import { getAuth } from 'firebase/auth';


// const ChatBox = ({email}) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [allusers, setAllUsers] = useState([])
//   const [isPending, startTransition] = useTransition()
//   const [idRecipient, setIdRecipient] = useState('')
//   const [idSender, setIdSender] = useState('')
//   const auth = getAuth(app)
  
//   useEffect(() => {
//     const authenticateChats = async() =>{
//         startTransition(async() => {
//             try{
//                 const sender_id = auth.currentUser && auth.currentUser.uid
//                 setIdSender(sender_id)
//                 console.log(sender_id)
                
//                 const allusersRef = collection(db, 'users')
//                 const allusersSnapshot = await getDocs(allusersRef)
//             if (allusersSnapshot){
//                 const users = []
//                 allusersSnapshot.forEach(user => {
//                     users.push(user.data())
//                     setAllUsers(users)
//                 })
//                 // console.log(email)
//                     const findUser = users && users.filter(user=>{return user.email == decodeURIComponent(email)})
//                     const userId = findUser && findUser[0].userId
//                     console.log(userId)
//                     setIdRecipient(userId)
//                 ;
//                 }
                
//             }
//             catch(err){
//                 console.error(err.message, "No User found")
//             }
//         })
        
//     }
//     authenticateChats()
//     const recipient = query(collection(db, 'messages', idSender), orderBy('timestamp', 'asc'));
//     const unsubscribe = onSnapshot(recipient, (snapshot) => {
//       setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     });
//     return () => unsubscribe();
//   }, [auth]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       await addDoc(collection(db, 'messages', idRecipient), {
//         text: input,
//         timestamp: serverTimestamp(),
//       });
//       await addDoc(collection(db, 'messages', idSender), {
//         text: input,
//         timestamp: serverTimestamp(),
//       });
//       setInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen p-4 bg-gray-100">
//       <div className="flex flex-col flex-grow p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//       {isPending ? (
//         <div className="animate-pulse">
//           <div className="flex items-center space-x-4 mb-4">
//             <Skeleton circle={true} height={50} width={50} />
//             <div>
//               <Skeleton width={120} />
//               <Skeleton width={180} />
//             </div>
//           </div>
//           <Skeleton count={3} />
//         </div>
//       ) : (
//         <div className="flex flex-col flex-grow overflow-y-auto mb-4">
//           {messages.map(({ id, text }) => (
//             <div key={id} className="flex items-center mb-2">
//               <FaUserCircle className="text-gray-600" size={24} />
//               <p className="ml-2 p-2 bg-gray-200 rounded-lg">{text}</p>
//             </div>
//           ))}
//         </div>)}
//         <form onSubmit={sendMessage} className="flex items-center">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="Type your message..."
//           />
//           <button
//             type="submit"
//             className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           >
//             <FaPaperPlane />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
'use client'
import { useEffect, useState, useTransition, useRef, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy, onSnapshot, addDoc, where, serverTimestamp, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { db } from './firebase'; // Adjust the path to your Firebase configuration
import { app, db } from '../firebase/firebaseConfig';
import { FaPaperPlane } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { authContext } from './AuthComponent';

const ChatBox = ({ email }) => {
  const [authUser, setAuthUser] = useState(null);
  const [recipientUser, setRecipientUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isPending, startTransition] = useTransition()
  const [notification, setNotification] = useState('')
  const authC = useContext(authContext)

  const { isSent, setSent }  = authC

  const authChat = getAuth(app)
  
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getChats = () => {
        startTransition(async()=>{
            try{
                const auth = getAuth(app);
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setAuthUser(user);
            
            const allUsersSnapshot = await getDocs(collection(db, 'users'));
            const users = allUsersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            const recipient = users.find(u => {return u.email === decodeURIComponent(email)});
            if (recipient) {
              setRecipientUser(recipient);
              console.log(recipient)
    
              const chatDocId = [user.uid, recipient.id].sort().join('_');
              setChatId(chatDocId);
    
              const messagesQuery = query(
                collection(db, 'chats', chatDocId, 'messages'),
                orderBy('timestamp', 'asc')
              );

              console.log(recipientUser)
              console.log(authUser)
    
              const unsubscribe = onSnapshot(messagesQuery, async(snapshot) => {
                if (snapshot){
                    setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                }else{
                    await addDoc(doc(db, 'notifications', chatDocId))
                }
                
              });
    
              return () => unsubscribe();
            }
          }
        });
            }
            catch(err){
                console.error('Could not fetch Chats')
            }
        })
    
    }

    getChats()
    
  }, [email, authChat, chatId, authUser]);

  /////////////////////////////////

  useEffect(() => {
    const mergeIds = () => {
        startTransition(async()=>{
            try{
                const auth = getAuth(app);
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setAuthUser(user);
            
            const allUsersSnapshot = await getDocs(collection(db, 'users'));
            const users = allUsersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            const recipient = users.find(u => {return u.email === decodeURIComponent(email)});
            if (recipient) {
              setRecipientUser(recipient);
    
              const chatDocId = [user.uid, recipient.userId].sort().join('_');
              setChatId(chatDocId);
              console.log(chatDocId)
    
              const noteRef = doc(db, 'notifications', chatDocId)

              console.log(recipientUser)
              console.log(authUser)
              console.log(noteRef)
    
              const unsubscribe = onSnapshot(noteRef, async(snapshot) => {
                if (snapshot){
                    await updateDoc(doc(db, 'notifications', chatDocId), {
                        isRead: true
                    })
                }else{
                    return
                    // await addDoc(doc(db, 'notifications', chatDocId), {
                    //     message: "Hello"
                    // })
                }
                
              });
    
              return () => unsubscribe();
            }
          }
        });
            }
            catch(err){
                console.error('Could not merge Ids')
            }
        })
    
    }

    mergeIds()
    
  }, [chatId, email]);

//   useEffect(() => {
//     const getNotification = () => {
//       startTransition(async () => {
//         try {
//           const auth = getAuth(app);
//           const authuser = auth.currentUser;
//           const authuserId = authuser.uid;
//           const notificationRef = doc(db, 'notifications', authuserId);
//           const notificationSnapshot = await getDoc(notificationRef);

//           if (notificationSnapshot.exists()) {
//             const data = notificationSnapshot.data();

//             data.sender.forEach((d) => {
//                 if (recipientUser.userId == d) {
//                     const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
//                       const notificationData = snapshot.data();
//                       if (d == recipientUser.userId && notificationData.notification && notificationData.time) {
//                         setNotification(notificationData.notification + notificationData.time);
//                         alert(notificationData.notification + ' at ' + notificationData.time);
      
//                        // // Clear the notification after rendering it
//                       //   updateDoc(notificationRef, {
//                       //     notification: '',
//                       //     // or use this to mark it as read
//                       //     // read: true,
//                       //   });
//                       }
//                     });
      
//                     return () => {
//                       unsubscribe();
//                     };
//                   }
//             })
           
//           }
//         } catch (err) {
//           console.error(err.message, "No new notification");
//         }
//       });
//     };

//     getNotification();
//   }, [authChat, chatId, email]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() && chatId) {
        const userRef = doc(db, 'allchats', chatId)
        console.log(recipientUser && recipientUser.userId)
        console.log(authUser && authUser.uid)
        const usernotificationRef = doc(db, 'notifications', chatId)
        const usersnapshot = await getDoc(userRef)
        const usernotificationsnapahot = await getDoc(usernotificationRef)
        if (usernotificationsnapahot && recipientUser && authUser){
            console.log(recipientUser.displayName)
            await setDoc(doc(db, 'notifications', chatId), {
                notification: `${authUser.displayName} posted a chat to you ${recipientUser.displayName}`,
                sender: arrayUnion(authUser.uid),
                time: serverTimestamp(),
                merge: true,
            
            })
          }else{
            await addDoc(doc(db, 'notifications', chatId), {
                notification: `${authUser.displayName} posted a chat to you ${recipientUser.displayName}`,
                sender: arrayUnion[authUser.uid],
                time: serverTimestamp(),
            
            })
          }
        if (usersnapshot){
            await setDoc(doc(db, 'allchats', chatId), {
                id:chatId, merge: true,
              });
              
        }else{
            await addDoc(doc(db, 'allchats', chatId), {
                id:chatId,
              });
        }
        const messageRef = collection(db, 'chats', chatId, 'messages')
        const q = query(messageRef, where("recipientId", "==", authUser.uid))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    console.log('New message:', change.doc.data());
                    // alert('Changes made')
                    // Handle the new message notification here
                  }
            })
        })
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: input,
        senderId: authUser.uid,
        recipientId: recipientUser.userId,
        isRead: false,
        timestamp: serverTimestamp(),
      });
      setInput('');
      setSent(recipientUser.userId)
    //   console.log(isSent)

    return () => unsubscribe()
    }
  };

  return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            {console.log(isSent && isSent)}
            <h1 className='font-extrabold py-4 '>{authUser && authUser.displayName.toUpperCase()} is ready to chat and connect with {recipientUser && recipientUser.displayName.toUpperCase()}</h1>
          <div className="flex flex-col flex-grow p-4 bg-white shadow-lg rounded-lg overflow-hidden">
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
            <div className="flex flex-col h-full overflow-y-auto mb-4">
           {messages.map((msg) => (
            <div
              ref={messagesEndRef}
              key={msg.id}
              className={`flex ${msg.senderId === authUser.uid ? 'justify-end' : 'justify-start'} mb-2  border-y-gray-400 border-x-0 py-4`}
            >
              <div className="p-2 rounded-lg shadow-lg">
                {console.log(recipientUser)}
              {msg.senderId === authUser.uid ? <div><img src={authUser.photoURL} width={50} height={50} className='w-[50px] h-[50px] rounded-full' alt='S'/> {authUser.displayName}</div>
              :  <div><img src={recipientUser.photoURL} width={50} height={50} className='w-[50px] h-[50px] rounded-full' alt='R'/> {recipientUser.displayName}</div>}

                <p className={`${msg.senderId === authUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-2 rounded-lg`}>{msg.text}</p>
              </div>
            </div>
          ))}
         </div>)
          
}
            {/* <div ref={messagesEndRef} /> {/* This div will be used to scroll into view */}
                    {/* </div>  */}
            
            <form onSubmit={sendMessage} className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      );

//   return (
//     <div className="flex flex-col h-screen p-4 bg-gray-100">
//       <div className="flex-grow p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-col h-full overflow-y-auto mb-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.senderId === authUser.uid ? 'justify-end' : 'justify-start'} mb-2`}
//             >
//               <div className="p-2 rounded-lg shadow-lg">
//                 <p className={`${msg.senderId === authUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-2 rounded-lg`}>{msg.text}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={sendMessage} className="flex">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-grow p-2 border rounded-l-lg"
//           />
//           <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">Send</button>
//         </form>
//       </div>
//     </div>
//   );
  
};

export default ChatBox;
