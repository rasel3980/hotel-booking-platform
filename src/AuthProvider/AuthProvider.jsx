import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
export const authContext = createContext();


const AuthProvider = ({routes}) => {
    const provider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [loader,setLoader] = useState(true);

    const handleGoogleLogin = ()=>{
        setLoader(true);
        return signInWithPopup(auth,provider);
    }
    const handleSignIn=(Email,Password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,Email,Password);
    }
    const handleRegister = (Email,Password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth,Email,Password);
    }
    const handleLogout =()=>{
        setLoader(true)
        return signOut(auth)
    }
    const AuthInfo ={
        handleGoogleLogin,
        handleSignIn,
        handleRegister,
        handleLogout,
        user,
        loader,
        
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
          console.log(currentUser);
          if(currentUser){
            setUser(currentUser)
            setLoader(false)
          }
          else{
            setUser(null)
            setLoader(false)
          }
    
            return ()=>{
                unsubscribe();
            }
        })
      },[])
    
    return (
        <div>
           <authContext.Provider value={AuthInfo}>{routes}</authContext.Provider> 
        </div>
    );
};

export default AuthProvider;