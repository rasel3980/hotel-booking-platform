import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey as string,
  authDomain: import.meta.env.VITE_authDomain as string,
  projectId: import.meta.env.VITE_projectId as string,
  storageBucket: import.meta.env.VITE_storageBucket as string,
  messagingSenderId: import.meta.env.VITE_messagingSenderId as string,
  appId: import.meta.env.VITE_appId as string,
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export default app;