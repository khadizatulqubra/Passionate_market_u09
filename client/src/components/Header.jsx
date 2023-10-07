import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
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
        <form action="" className="flex items-center p-3 rounded-lg bg-slate-200 ">
          <input
            type="text"
            placeholder="Search...."
            className="w-2 rounded-lg bg-slate-200 focus:outline-none sm:w-64 text-slate-800 "
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
            
        <Link to='/'>
        <li className="hidden text-pink-900 sm:inline hover:underline">Home</li>
        </Link>
        <Link to='/about'>
          <li className="hidden text-pink-900 sm:inline hover:underline"> About</li>
          </Link>
          <Link to='/signin'>
          <li className="text-pink-900 sm:inline hover:underline">SignIn </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
