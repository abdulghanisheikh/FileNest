import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {ToastContainer} from "react-toastify";
import axios from "axios";

const DropdownProfile=()=>{
    const [open,setOpen]=useState(false);
    const [profileUrl,setProfileUrl]=useState("");
    const [profile,setProfile]=useState(null);
    const navigate=useNavigate();
    const username=JSON.parse(localStorage.getItem("loggedInUser")).fullname;
    const email=JSON.parse(localStorage.getItem("loggedInUser")).email;

    async function handleLogout(){
        try{
            const res=await axios.post("http://localhost:3000/auth/logout",{
                withCredential:true //to send httpOnly cookie to backend
            });
            const {success,message}=res.data;
            if(success){
                toast.success(message);
                localStorage.removeItem("loggedInUser");
                setTimeout(()=>{
                    navigate("/login-page");
                },2000);
            }
            else{
                toast.error(message);
            }
       }
        catch(err){
            toast.error(err.message);
        }
    }

    async function profileHandler(e){
        e.preventDefault();
        try{
            const formData=new FormData();
            formData.append("profile",profile);
            const res=await axios.post("http://localhost:3000/user/uploadProfile",formData,{
                withCredentials:true,
            });
            const {success,message,publicUrl}=res.data;
            if(success){
                toast.success(message);
                setProfileUrl(publicUrl);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    return(
        <div className='relative flex flex-col gap-1 rounded-md'>
            <button type="button" onClick={()=>setOpen(!open)} className='px-5 py-1 rounded-md shadow-sm hover:scale-103 duration-300 ease-in-out shadow-black/30 cursor-pointer bg-white active:scale-95'>👋 {username}</button>
            {
            open&&<div className='absolute top-10 right-10 h-90 w-90 flex flex-col gap-1 justify-between p-5 text-black bg-white rounded-md shadow-sm shadow-black/20 text-center'>
                <div onClick={()=>setOpen(!open)} className='absolute top-5 right-5 cursor-pointer text-red-500'>
                    <IoMdCloseCircleOutline size={22} />
                </div>
                <form onSubmit={profileHandler} encType="multipart/form-data" className='flex flex-col gap-2 items-center justify-around'>
                    <h1 className='text-sm'>{email}</h1>
                    <div className='profilePicture h-25 w-25 rounded-full border flex justify-center items-center border-gray-700'>
                        <img src={profileUrl} className="text-xs" alt="profile" />
                    </div>
                    <label className='flex flex-col justify-center items-center cursor-pointer'>
                        <input type="file" name="profile" hidden onChange={(e)=>setProfile(e.target.files[0])} />
                        <IoPersonAddOutline size={20} />
                    </label>
                    <button type='submit' className='px-5 text-sm cursor-pointer hover:scale-102 hover:bg-green-700 duration-300 ease-in-out rounded-full bg-green-600 text-white'>Set Profile</button>
                </form>
                <div className='flex flex-col gap-1'>
                    <div className='text-red-500 px-5 py-1 border border-black/10 rounded-xl font-semibold text-sm cursor-pointer hover:bg-red-500 hover:text-white duration-300 ease-in-out' onClick={handleLogout}>
                        <p>Log Out</p>
                    </div>
                    <div className='text-red-500 px-5 py-1 border border-black/10 rounded-xl font-semibold text-sm cursor-pointer hover:bg-red-500  hover:text-white duration-300 ease-in-out'>
                        <p>Delete Account</p>
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </div>
            }
        </div>
    )
}

export default DropdownProfile;