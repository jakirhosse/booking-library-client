import { createContext, ReactNode, useEffect, useState } from "react";
import {
        UserCredential,
        createUserWithEmailAndPassword,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signInWithPopup,
        signOut,
        updateProfile,
      } from "firebase/auth";
  import { GoogleAuthProvider, getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";
   interface AuthInfo  {
        user:any;
        createUserEmail: (email: string, password: string) => Promise<any>;
        loginUser:(email:string, password:string) => Promise<any>;
        logingoogle:() =>Promise<UserCredential>;
        updateUserProfile:(name:string,photo:any)=> Promise<any>;
        logOut: () => Promise<void>;
        loading:boolean;
} 

const auth = getAuth(app)
const googleprovider = new GoogleAuthProvider();

 export const AuthContext = createContext<AuthInfo |null>(null);
 const AuthProvider:React.FC<{ children: ReactNode }> = ({children}) => {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        // console.log(user);


        // create user email and password
  const createUserEmail = (email: any, password: any) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
      };
       //   login user email and password
  const loginUser = (email: any, password: any) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
      };
    
//       login with google popup//
      const logingoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleprovider);
      };
   
// logout user
const logOut = () => {
        setLoading(true);
        return signOut(auth);
      };   


      // update user profile///
  const updateUserProfile = (name: string, photo: any) => {
        const currentUser: any = auth.currentUser;
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };

      // onauthchaned//// 

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser("current user",currentUser);
          if (currentUser) {
            axios.post("http://localhost:5000/json-web-token/jwt")
              .then((data) => {
                localStorage.setItem("access-token", data.data.token);
              })
              .finally(() => {
                setLoading(false);
              });
            } else {
              localStorage.removeItem("access-token");
              setLoading(false);
            }
          });
      
          return () => {
            unsubscribe();
          };
        }, []);


        const authInfo: AuthInfo ={
                user,
                loading,
                createUserEmail,
                loginUser,
                logingoogle,
                updateUserProfile, 
                logOut,
        }
        return (
                <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        );
 };
 
 export default AuthProvider;