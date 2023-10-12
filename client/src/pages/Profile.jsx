import { useSelector } from 'react-redux'
import{useRef, useState ,useEffect}from 'react'
import{getStorage}from 'firebase/storage';
import {ref,uploadBytesResumable,getDownloadURL}from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {
  const fileRef =useRef(null);
  const {currentUser} = useSelector(state => state.user);
  const [file,setFile]= useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setUploadError]=useState (false);
  const [formData,setFormData]=useState({});
 
  
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

  return (
    <div>
      <h1 className='text-3xl font-semibold text-center text-pink-900 my-7'>Profile</h1>
      <form  className='flex flex-col'>
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
        <input type="text" placeholder='username' id='username' className='p-3 border rounded-lg'/>
        <input type="text" placeholder='email'  id='email' className='p-3 border rounded-lg'/>
        <input type="text" placeholder='password' id='password' className='p-3 border rounded-lg'/>
        <button className='p-3 text-white uppercase bg-pink-900 rounded-lg hover:opacity-80'> update</button>
      </form>
      <div className='flex justify-between mt-5'>
       
      <span className='cursor-pointer text-slate-700'>Delete account</span>
      <span className='cursor-pointer text-slate-700'>Sign Out</span>
      </div>
    </div>
  )
}
// bg-pink-900
