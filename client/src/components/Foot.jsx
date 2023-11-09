import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
const  Foot=() =>{
  return (
    <footer className="w-full p-8 mt-auto bg-pink-600 shadow-md bg-opacity-10">
      <div className="flex flex-row flex-wrap items-center justify-center text-center bg-pink-600 bg-opacity-0 gap-y-6 gap-x-12 md:justify-between">
      <Link to="/" >
       <div className="top-0 flex items-center bg-pink-900 rounded-full h-28 w-28 bg-gradient-to-bl drop-shadow-2xl shadow-pink-400"  >
       <h1 className="flex flex-wrap items-center py-8 text-sm font-bold sm:text-xl">
          <span className="items-center inline-block font-mono text-xsitalic font-bold text-red-400 align-middle -rotate-12 m-0.5 text-xs">Pas</span>
          <span className="font-mono text-xs italic font-bold text-red-500 rotate-12">Sion</span>
          <span className="font-mono text-xs italic font-bold text-red-400 rotate-12">Nate</span>
          <span className="ml-4 font-mono text-xs italic text-red-500 -rotate-12">Mar</span>
          <span className="font-mono text-xs font-bold text-red-400 text-xsitalic rotate-12">ket</span>
        </h1>
       </div>
        </Link>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          
        
             
            
             <Link to='/about'>
          <li className="hidden text-pink-900 sm:inline hover:underline hover:text-pink-500 "> About</li>
          </Link>
          
          
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal text-pink-900 transition-colors hover:text-pink-500 hover:underline"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal text-pink-900 transition-colors hover:text-pink-500 hover:underline"
            >
              Contribute
            </Typography>
          </li>
          <Typography>
          <Link to='/contactList'>
          <li className="hidden text-pink-900 sm:inline hover:underline hover:text-pink-500"> Contact Us </li>
          </Link>
          </Typography>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="font-normal text-center">
        &copy; 2023 Passionate Market
      </Typography>
    </footer>
  );
}

export default Foot;