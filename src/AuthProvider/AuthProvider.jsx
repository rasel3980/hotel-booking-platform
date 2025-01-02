import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import axios from 'axios';

export const authContext = createContext();

const AuthProvider = ({ routes }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const handleGoogleLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

  const handleSignIn = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleRegister = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = () => {
    setLoader(true);
    return signOut(auth);
  };

  const AuthInfo = {
    handleGoogleLogin,
    handleSignIn,
    handleRegister,
    handleLogout,
    user,
    loader,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoader(true);
      if (currentUser?.email) {
        setUser(currentUser); 
        try {
          const { data } = await axios.post('https://hotel-booking-server-one-xi.vercel.app/jwt', {
            email: currentUser?.email,
          },{withCredentials:true}
        );
        //   console.log('JWT Data:', data);
        } catch (error) {
          console.error('Error while fetching JWT:', error);
        }
      } else {
        setUser(null);
        const { data } = await axios.get('https://hotel-booking-server-one-xi.vercel.app/logout',
        {withCredentials:true}
        );
      }
      setLoader(false); 
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  return (
    <authContext.Provider value={AuthInfo}>
      {routes} 
    </authContext.Provider>
  );
};

export default AuthProvider;
