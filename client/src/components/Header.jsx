import { FaSearch } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {

  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    
  };

  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-pink-600 shadow-md bg-opacity-10">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto ">
        <Link to="/" >
       <div className="top-0 flex items-center bg-pink-900 rounded-full bg-gradient-to-bl h-28 w-28 drop-shadow-2xl shadow-stone-400"  >
       <h1 className="flex flex-wrap items-center py-8 text-sm font-bold sm:text-xl">
          <span className="items-center inline-block font-mono text-sm italic font-bold text-red-400 align-middle -rotate-12 m-0.5 ">Pas</span>
          <span className="font-mono text-lg italic font-bold text-red-500 rotate-12">Sion</span>
          <span className="font-mono text-sm italic font-bold text-red-400 rotate-12">Nate</span>
          <span className="ml-4 font-mono text-lg italic text-red-500 -rotate-12">Mar</span>
          <span className="font-mono text-lg italic font-bold text-red-400 rotate-12">ket</span>
        </h1>
       </div>
        </Link>
        <form action="" className="flex items-center p-3 rounded-lg bg-slate-200 "    onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search...."
            className="w-2 rounded-lg bg-slate-200 focus:outline-none sm:w-64 text-slate-800 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        
          />
          <button> <FaSearch className="text-slate-600" /></button>
         
        </form>
        <ul className="flex gap-4">
            
        <Link to='/'>
        <li className="hidden text-pink-900 sm:inline hover:underline">Home</li>
        </Link>
        <Link to='/about'>
          <li className="hidden text-pink-900 sm:inline hover:underline"> About</li>
          </Link>
         
          <Link to='/profile'>
          {currentUser? (
            <img  className="object-cover w-12 h-12 my-0 rounded-full" src={currentUser.avatar} alt="profile"/>
          ): (<li className="text-pink-900 sm:inline hover:underline">SignIn </li>) }
         
          </Link>
        </ul>
      </div>
    </header>
  );
}
