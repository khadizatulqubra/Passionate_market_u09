import { useSelector } from 'react-redux'
import{useRef, useState ,useEffect}from 'react'
import{getStorage}from 'firebase/storage';
import {ref,uploadBytesResumable,getDownloadURL}from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess,updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function Profile() {
  const fileRef =useRef(null);
  const {currentUser,loading,error} = useSelector(state => state.user);
  const [file,setFile]= useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setUploadError]=useState (false);
  const [formData,setFormData]=useState({});
  const [updateSuccess, setUpdateSuccess]= useState(false)
  const dispatch = useDispatch();
  console.log (formData)
 
  
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload =(file)=>{
    const storage=getStorage(app);
    const fileName=new Date ().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);
  
    
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round (progress));
    },
    (error)=>{
      
      setUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       setFormData({...formData, avatar: downloadURL});
      });
    }
    
    )
  };
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
    
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();

    try{
      dispatch(updateUserStart());
     const res= await fetch (`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
     });
      const data= await res.json();
     if (data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
     }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      
    }catch (error){
      dispatch(updateUserFailure(error.message));
      
    }
    
  }

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='font-serif text-3xl font-semibold text-center text-pink-900 my-7'>Profile</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file"  ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className='self-center object-cover w-24 h-24 my-0 mt-2 rounded-full cursor-pointer' src={formData.avatar|| currentUser.avatar}alt="profile" />
        <p className='self-center text-sm'>
          {fileUploadError?   
          (<span className='text-red-700 '>
            Error image upload (image must be less than 2 mb)
          </span> ): 
          filePerc> 0 && filePerc <100 ? 
            (<span className='text-pink-900 '>
             { `Uploading ${filePerc}%`}
            </span>):
             filePerc===100 ?
              ( <span className='text-green-700 '>
              Uploaded Successfull
            </span>) : (""
            )
           
        }
        </p>
        <input type="text" placeholder='username' defaultValue={currentUser.username} id='username' className='p-3 m-2 border rounded-lg shadow-xl' onChange={handleChange}/>
        <input type="text" placeholder='email' defaultValue={currentUser.email} id='email' className='p-3 m-2 border rounded-lg shadow-xl' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='p-3 m-2 border rounded-lg shadow-xl'/>
        <button disabled ={ loading} className='p-3 m-2 text-white uppercase bg-pink-900 rounded-lg shadow-xl hover:opacity-80'> { loading? 'loading...':'update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
       
      <span className='font-serif text-lg cursor-pointer text-slate-700' >Delete account</span>
      <span className='font-serif text-lg cursor-pointer text-slate-700'>Signout</span>

      </div>
      <p className='mt-5 text-pink-900'>{error?error: ''}</p>
       <p className='mt-5 text-green-800'>{updateSuccess? 'User updated successfully':''}</p>
    </div>
  )
}
// bg-pink-900
