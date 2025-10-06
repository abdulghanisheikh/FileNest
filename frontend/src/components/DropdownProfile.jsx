import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
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
            const res=await axios.post("http://localhost:3000/auth/logout",{},{
                withCredentials:true //to send httpOnly cookie to backend
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

    async function handleProfile(e){
        e.preventDefault();
        try{
            const formData=new FormData();
            formData.append("profile",profile);
            const res=await axios.post("http://localhost:3000/user/uploadProfile",formData,
            {
                withCredentials:true,
                headers:{"Content-Type":"multipart/form-data"}
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

    async function fetchProfile(){
        try{
            const res=await axios.get("http://localhost:3000/user/getProfile",{
                withCredentials:true
            });
            const {success,message,profileUrl}=res.data;
            if(success){
                setProfileUrl(profileUrl);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        fetchProfile();
    },[])

    return(
        <div className='relative flex flex-col gap-1 rounded-md'>
            <button type="button" onClick={()=>setOpen(!open)} className='px-5 py-1 rounded-md shadow-sm hover:scale-103 duration-300 ease-in-out shadow-black/30 cursor-pointer bg-white active:scale-95'>👋 {username}</button>
            {
            open&&<div className='absolute top-10 right-10 h-90 w-90 flex flex-col gap-1 justify-between p-5 text-black bg-white rounded-md shadow-sm shadow-black/20 text-center'>
                <div onClick={()=>setOpen(!open)} className='absolute hover:bg-red-500 hover:text-white duration-300 ease-in-out rounded-full top-5 right-5 cursor-pointer text-red-500'>
                    <IoMdCloseCircleOutline size={22} />
                </div>
                <form onSubmit={handleProfile} encType="multipart/form-data" className='flex flex-col gap-2 items-center justify-around'>
                    <h1 className='text-sm'>{email}</h1>
                    <div className='profilePicture h-25 w-25 bg-cover border-none overflow-hidden rounded-full flex justify-center items-center'>
                        <img src={profileUrl||"/default-profile.jpg"} className="text-xs" alt="profile" />
                    </div>
                    <label className='flex flex-col justify-center items-center cursor-pointer'>
                        <input type="file" name="profile" hidden onChange={(e)=>setProfile(e.target.files[0])} />
                        {profile?<p className='text-sm'>{profile.originalname}</p>:<p className='text-sm px-5 hover:bg-blue-600 hover:scale-102 duration-300 ease-in-out rounded-full bg-blue-500 text-white'>Select Profile</p>}
                    </label>
                    <button type='submit' className='px-5 text-sm cursor-pointer hover:scale-102 hover:bg-green-700 duration-300 ease-in-out rounded-full bg-green-600 text-white'>Click to Add</button>
                </form>
                <div className='flex flex-col gap-1'>
                    <div className='text-red-500 px-5 py-1 border rounded-xl font-semibold text-sm cursor-pointer hover:bg-red-500 border-red-500 hover:text-white duration-300 ease-in-out' onClick={handleLogout}>
                        <p>Log Out</p>
                    </div>
                    <div className='text-red-500 border-red-500 px-5 py-1 border rounded-xl font-semibold text-sm cursor-pointer hover:bg-red-500  hover:text-white duration-300 ease-in-out'>
                        <p>Delete Account</p>
                    </div>
                </div>
                <ToastContainer position="top-left" />
            </div>
            }
        </div>
    )
}

export default DropdownProfile;