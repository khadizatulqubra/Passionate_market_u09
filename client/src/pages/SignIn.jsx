import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  
  const [formData, setFormData]= useState({});
  const [error, setError]= useState (null);
  const [loading,setLoading]= useState (false);
  const navigate = useNavigate();
     
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{ 
      setLoading(true);
      const res =await fetch ('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success===false){
        setError(data.message);
        setLoading(false);
        return;
      };
      setLoading(false);
      setError(null);
      navigate('/');
  
      
      
    }catch (error){
      setLoading (false);
      setError (error.message)
      
    };
  }
   

  
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center text-pink-700 my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} action=""  className='flex flex-col gap-4'>
       
        <input type="email"  placeholder='email' className='p-3 border rounded-lg ' id='email'  onChange={handleChange}/>
        <input type="password"  placeholder='password' className='p-3 border rounded-lg ' id='password'  onChange={handleChange}/>
        <button disabled={loading} className='p-3 text-white uppercase bg-pink-900 rounded-lg hover:opacity-95 disabled:opacity-80'> {loading? 'loading...':'Sign Up'} </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont you have en account?</p>
        <Link to= { "/signup"}>
          <span className='text-pink-700'> Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
