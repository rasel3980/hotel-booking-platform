import { createContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../Firebase/Firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import axios from 'axios';

interface AuthContextType {
  handleGoogleLogin: () => Promise<UserCredential>;
  handleSignIn: (email: string, password: string) => Promise<UserCredential>;
  handleRegister: (email: string, password: string) => Promise<UserCredential>;
  handleLogout: () => Promise<void>;
  user: User | null;
  loader: boolean;
}

interface AuthProviderProps {
  routes: ReactNode;
}

export const authContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ routes }: AuthProviderProps) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const handleGoogleLogin = (): Promise<UserCredential> => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

  const handleSignIn = (email: string, password: string): Promise<UserCredential> => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleRegister = (email: string, password: string): Promise<UserCredential> => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = (): Promise<void> => {
    setLoader(true);
    return signOut(auth);
  };

  const AuthInfo: AuthContextType = {
    handleGoogleLogin,
    handleSignIn,
    handleRegister,
    handleLogout,
    user,
    loader,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      setLoader(true);

      if (currentUser?.email) {
        setUser(currentUser);
        try {
          await axios.post(
            'https://hotel-booking-server-one-xi.vercel.app/jwt',
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (error) {
          console.error('Error while fetching JWT:', error);
        }
      } else {
        setUser(null);
        try {
          await axios.get('https://hotel-booking-server-one-xi.vercel.app/logout', {
            withCredentials: true,
          });
        } catch (error) {
          console.error('Error while logging out:', error);
        }
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