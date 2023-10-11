import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup , } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
     
        try {
            const provider=new GoogleAuthProvider()
            const auth= getAuth (app)
            const result = await signInWithPopup(auth, provider)
            
            const res =await fetch ('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo: result.user.photoURL
                }),
               
            })
            const data =await res.json();
            dispatch (signInSuccess(data));
            navigate('/');
         
            
        } catch (error){
            console.log('could not signin with google account',error)
            
        };
  
}
return (
    <button 
    onClick={handleGoogleClick}
     type='button' 
     className='p-3 text-white uppercase rounded-lg bg-stone-700 hover:opacity-80'> Continue with google</button> 
     )
}
