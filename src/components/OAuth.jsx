import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import {useDispatch} from 'react-redux'
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      console.log("Attempting Google Sign-In...");
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      const res = await fetch('/api/auth/google',{
        method :'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL,

        })
      })
      const data = await res.json()
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <button
    type="button"
    onClick={handleGoogleClick}
    className="w-full bg-black text-white rounded-lg p-3 hover:bg-gray-700 transition duration-200 ease-in-out"
  >
    Continue with Google
  </button>
  
  );
};

export default OAuth;
