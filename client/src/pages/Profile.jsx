import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center text-pink-900 my-7'>Profile</h1>
      <form  className='flex flex-col'>
        <img className='self-center object-cover w-24 h-24 my-0 mt-2 rounded-full cursor-pointer' src={ currentUser.avatar}alt="profile" />
        <input type="text" placeholder='username' id='username' className='p-3 border rounded-lg'/>
        <input type="text" placeholder='email'  id='email' className='p-3 border rounded-lg'/>
        <input type="text" placeholder='password' id='password' className='p-3 border rounded-lg'/>
        <button className='p-3 text-white uppercase bg-pink-900 rounded-lg hover:opacity-80'> update</button>
      </form>
      <div className='flex justify-between mt-5'>
       
      <span className='cursor-pointer text-slate-700'>Delete account</span>
      <span className='cursor-pointer  text-slate-700'>Sign Out</span>
      </div>
    </div>
  )
}
// bg-pink-900
