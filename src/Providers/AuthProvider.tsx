import { createContext, ReactNode, useEffect, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";

interface AuthInfo {
  user: User | null;
  createUserEmail: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logingoogle: () => Promise<UserCredential>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext<AuthInfo | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserEmail = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logingoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name: string, photo: string) => {
    if (!auth.currentUser) throw new Error("No user is currently logged in.");
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        axios
          .post("http://localhost:5000/json-web-token/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
          })
          .catch((error) => {
            console.error("Failed to get JWT token:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo: AuthInfo = {
    user,
    loading,
    createUserEmail,
    loginUser,
    logingoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
