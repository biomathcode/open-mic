import React, { useEffect, useState, useContext, createContext } from 'react'
import firebase from 'firebase/app';

import 'firebase/database'

import 'firebase/auth'

import 'firebase/firestore'
import { toast } from 'react-toastify';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTHDOMAIN_FIREBASE,
  projectId: process.env.REACT_APP_PROJECTID_FIREBASE,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET_FIREBASE,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_FIREBASE,
  appId: process.env.REACT_APP_APPID_FIREBASE
};

const app = firebase.initializeApp(firebaseConfig)



export const db = firebase.firestore()

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext)
}

// Provider hook that creates auth object and handles state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const [events, setEvents] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const auth = app.auth();

  


  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      if (query.docs.length === 0) {
        await db.collection("users").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      setUser(user);
      setIsAuthenticating(true);
      toast('you are logged in ')

      console.log(user, isAuthenticating)


    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const logout = () => {
   return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setIsAuthenticating(false);
        toast('you are logged out')
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    auth,
    user,
    isAuthenticating,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
