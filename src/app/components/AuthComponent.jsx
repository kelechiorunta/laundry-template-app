'use client'
import React, { startTransition, useEffect, useRef, useState, useTransition } from 'react'
import { createContext } from 'react'
import { authUserEmail } from '../server actions/server actions'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app, db } from '../firebase/firebaseConfig'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { closeSession } from '../server actions/server actions'
import { signOut } from 'firebase/auth'
import { where, collection, query, getDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'


export const authContext = createContext(null)

export default function AuthComponent({children}) {

    const auth = getAuth(app)
    const pathname = usePathname()
    const router = useRouter()
    const { data: session, status } = useSession()

    const [authObject, setAuthObject] = useState({auth:null, status:''})
    const [isPendingProfile, startTransitionProfile] = useTransition()
    const [isPendingAlert, startTransitionAlert] = useTransition()
    const [notificationSenders, setNotificationSenders] = useState([])

    const [isPending, startTransition] = useTransition()
    const [user, setUser] = useState('')
    const [userA, setUserA] = useState('')
    const [active, setA] = useState('')
    const [isloggedOut, setLoggedOut] = useState(false)
    const [isSent, setSent] = useState(null)
    const [isAlert, setAlert] = useState(null)
    const [connects, setConnects] = useState(null)

    useEffect(()=>{
    
        const getcurrentUser = async() =>{
          // const authUser = await authUserEmail()
          // setUserA(authUser)
          if (session && status=='authenticated'){
            setUser(session.user)
            setUserA(session.user)
            setA(session.user)
          }
          startTransitionProfile(async()=>{
            onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser); 
              // setA(currentUser)
              
            });
          })
          
        }
        getcurrentUser()
      },[session])

      const clearCookies = () => {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      };

    useEffect(()=>{

        const validateAuth = async() =>{
          // startTransition(async() => {
            const authUser = await authUserEmail()
            
            setUserA(authUser)
             
                if ((!authUser) && (pathname==="/")) {
                  
                  
                    window.location.href = "/login"
                    router.push('/login')
                    await closeSession()
                    clearCookies()
                    setAuthObject(prevState => ({ ...prevState, status: "Session Expired"}));
                    setLoggedOut(false)
                    await signOut(auth)
                    setUserA(null)
                    // setA(null)

                }
                    
                // })
                
                 //setUserA(null)
                // return null
        }
          
            
          var interval = 30 * 24 * 60 * 60
        
          const timerid = setTimeout(validateAuth, interval )

          return () =>{
            clearTimeout(timerid)
          }

    }, [pathname, userA, active])

    useEffect (() => {

      onAuthStateChanged(auth, (currentUser) => {
        if (pathname!=="/login"){
          setUserA(currentUser)
        }  
      });
    }, [])


    /////////////////////////////////////////////////////

    useEffect(() => {
      const getUsersAndChats = () => {
        startTransition(async() => {
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
                // startTransitionAlert(() =>{
                //   setAlert(isSent)
                // })
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

                      const msgCollections = collection(db, 'chats', chatDocId, 'messages')
                      const q = query(msgCollections, where('recipientId', '==', authUser.uid ))
                      
                      const unsubscribe = onSnapshot(q, (querySnapshot) => {
                        const newNotifications = [];
                        querySnapshot.docChanges().forEach((change) => {
                          if (change.type === 'added' ) {
                            newNotifications.push({ id: change.doc.id, ...change.doc.data() });
                            // alert('New Changes made')
                            // setNotificationSenders(senders)
                            startTransitionAlert(() =>{
                              setSent(authUser.uid)
                              setAlert(isSent)
                           })
                            
                            console.log(notificationRefSnapshot.data)
                          }
                        });
                        //setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
                      
                          
                         
  
                          // updateDoc(notificationRef, {
                          //   notification: '',
                          //   // or use this to mark it as read
                          //   // read: true,
                          // });
                        
                        
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
    }, [auth, isSent,]);

    //////////////////////////////////////////////////////


    const authO = {authObject: authObject, setAuthObject:setAuthObject, isPendingAlert:{isPendingAlert}, connects:{connects},
     isAlert:{isAlert}, setAlert:setAlert, notificationSenders:{notificationSenders},
     startTransitionAlert:startTransitionAlert, setConnects:{setConnects}, setNotificationSenders:{setNotificationSenders},
    isSent:isSent, setSent:setSent, isloggedOut:{isloggedOut}, setLoggedOut:{setLoggedOut}, user:isPendingProfile?user:user, userA: userA, A: active}

  return (
    // <div>
        <authContext.Provider value={authO}>
          {/* {isPending? <div>Loading</div> : */}
           {children }
        </authContext.Provider>
    // </div>
  )
}
