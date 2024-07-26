import { useState, useEffect, startTransition } from 'react';
import { doc, getDoc } from 'firebase/firestore';
// import { db, app } from '../firebaseConfig'; // Adjust the path to your Firebase configuration
import { db, app } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useContext } from 'react';
import { authContext } from './AuthComponent';

const ProfileUpload = () => {
  const authO = useContext(authContext)
  const [formData, setFormData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      startTransition(async () => {
        try {
          const authP = getAuth(app);
          const userP = authP && authP.currentUser;
          const userPid = userP && userP.uid;

          if (userPid) {
            const userRef = doc(db, 'users', userPid);
            const userRefsnapshot = await getDoc(userRef);

            if (userRefsnapshot.exists()) {
              const data = userRefsnapshot.data();
              setFormData(data);
            }
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsPending(false);
        }
      });
    };

    fetchUserData();
  }, [authO]);

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
                className="rounded-full shadow-xl overflow-hidden bg-center object-fill max-w-[50px] max-h-[50px]"
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
            {/* Add more user details here */}
          </div>
        )
      )}
    </div>
  );
};

export default ProfileUpload;
