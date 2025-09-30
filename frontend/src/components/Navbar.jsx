import React from 'react';
import { FiUploadCloud } from "react-icons/fi";
import {Link} from "react-router-dom";
import DropdownProfile from "../components/DropdownProfile";

const Navbar=()=>{
  return(
    <div className='navbar flex w-full h-20 rounded-md px-5 justify-between items-center gap-2'>
        <input className='h-10 w-1/2 shadow-sm shadow-black/10 rounded-full outline-none bg-white px-5' type="text" placeholder='search' />
        <div className="flex gap-2 items-center">
            <Link to="/upload-file">
                <div className='flex self-end items-center gap-2 py-2 px-5 rounded-full bg-sky-800 text-white'>
                <FiUploadCloud size={20} />
                <h1>Upload</h1>
                </div>
            </Link>
            <DropdownProfile />
        </div>
    </div>
  )
}

export default Navbar;