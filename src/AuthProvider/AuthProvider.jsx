import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
export const authContext = createContext();


const AuthProvider = ({routes}) => {
    const provider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);

    const handleGoogleLogin = ()=>{
        return signInWithPopup(auth,provider);
    }
    const handleSignIn=(Email,Password)=>{
        return signInWithEmailAndPassword(auth,Email,Password);
    }
    const AuthInfo ={
        handleGoogleLogin,
        handleSignIn,
        user,
        
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
          console.log(currentUser);
          if(currentUser){
            setUser(currentUser)
          }
          else{
            setUser(null)
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