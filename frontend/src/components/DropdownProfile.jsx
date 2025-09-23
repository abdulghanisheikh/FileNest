import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { SlLogout } from "react-icons/sl";

const DropdownProfile=()=>{
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const username=JSON.parse(localStorage.getItem("loggedInUser")).fullname;

    function handleLogout(e){
        e.preventDefault();
        try{
            localStorage.removeItem("token");
            localStorage.removeItem("loggedInUser");
            toast.success("You are being logged out");
            setTimeout(()=>{
                navigate("/login-page");
            },1000);
        }
        catch(err){
            toast.error(err.message);
        }
    }

    return(
        <div className='flex flex-col gap-1 rounded-md'>
            <button type="button" onClick={()=>setOpen(!open)} className='px-5 py-1 rounded-md shadow-sm shadow-black/10 cursor-pointer bg-white'>👋 {username}</button>
            {
            open&&<ul className='cursor-pointer text-red-600 bg-white rounded-md shadow-sm shadow-black/10'>
                    <li onClick={handleLogout} className='flex gap-1 px-5 py-1 justify-center items-center'>
                        <SlLogout />
                        <p>Log Out</p>
                    </li>
                </ul>
            }
        </div>
    )
}

export default DropdownProfile;