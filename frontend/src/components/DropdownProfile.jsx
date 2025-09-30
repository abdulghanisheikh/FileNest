import React,{useState} from 'react';
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
        <div className='relative flex flex-col gap-1 rounded-md'>
            <button type="button" onClick={()=>setOpen(!open)} className='px-5 py-1 rounded-md shadow-sm shadow-black/10 cursor-pointer bg-white'>👋 {username}</button>
            {
            open&&<div className='absolute top-9 right-1 flex flex-col gap-2 justify-start p-1 text-black bg-white rounded-md shadow-sm shadow-black/20'>
                <div className='text-red-500 px-5 py-1 rounded-md font-semibold text-sm cursor-pointer hover:bg-red-500 hover:text-white duration-300 ease-in-out' onClick={handleLogout}>
                    <p>Log Out</p>
                </div>
                <div className='text-red-500 px-5 py-1 rounded-md font-semibold text-sm cursor-pointer hover:bg-red-500  hover:text-white duration-300 ease-in-out'>
                    <p>Delete Account</p>
                </div>
            </div>
            }
        </div>
    )
}

export default DropdownProfile;