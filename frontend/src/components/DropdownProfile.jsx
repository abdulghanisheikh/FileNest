import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {ToastContainer,toast} from "react-toastify";
import axios from "axios";

const DropdownProfile=()=>{
    const [open,setOpen]=useState(false);
    const [profileUrl,setProfileUrl]=useState("");
    const [profile,setProfile]=useState(null);
    const navigate=useNavigate();
    const userLS=JSON.parse(localStorage.getItem("loggedInUser")||"{}");
    const username=userLS.fullname;
    const email=userLS.email;
    const baseUrl=import.meta.env.VITE_BASE_URL;

    async function handleLogout(){
        try{
            const res=await axios.post(`${baseUrl}/auth/logout`,{},{
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
            toast.error(err.response?.data?.message);
        }
    }

    async function handleProfile(e){
        e.preventDefault();
        if(!profile) return;
        try{
            const formData=new FormData();
            formData.append("profile",profile);
            const {data}=await axios.post(`${baseUrl}/user/uploadProfile`,formData,
            {
                withCredentials:true,
                headers:{"Content-Type":"multipart/form-data"}
            });
            const {success,message,publicUrl}=data;
            if(success){
                setProfileUrl(publicUrl);
                setProfile(null);
                toast.success(message);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    async function fetchProfile(){
        try{
            const {data}=await axios.get(`${baseUrl}/user/getProfile`,{
                withCredentials:true
            });
            const {success,message,profileUrl}=data;
            if(success){
                setProfileUrl(profileUrl||"");
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            if(err.response?.status===401){ //Token expired -> logout
                localStorage.removeItem("loggedInUser");
                navigate("/login-page");
                return;
            }
            toast.error(err.response?.data?.message||"Failed to load profile.");
        }
    }

    async function handleAccountDelete(){
        try{
            const res=await axios.delete(`${baseUrl}/user/deleteAccount`,{
                withCredentials:true
            });
            const {success,message}=res.data;
            if(success){
                localStorage.clear();
                toast.success(message);
                setTimeout(()=>{
                    navigate("/signup-page");
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

    async function handleRemoveProfile(){
        try{
            const {data}=await axios.delete(`${baseUrl}/user/removeProfile`,{
                withCredentials:true
            });
            const {success,message}=data;
            if(success){
                setProfileUrl("");
                toast.success(message);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    useEffect(()=>{
        fetchProfile();
    },[]);
    
    return(
        <div className='relative flex flex-col gap-1 rounded-md z-[2]'>
            <button type="button" onClick={()=>setOpen(!open)} className='px-5 py-1 rounded-md shadow-sm hover:scale-103 duration-300 ease-in-out shadow-black/30 cursor-pointer bg-white active:scale-95'>👋 {username}</button>
            {
            open&&<div className='absolute top-10 right-10 h-90 w-90 flex flex-col gap-1 justify-between p-5 text-black bg-white rounded-md shadow-sm shadow-black/20 text-center font-semibold'>
                <div onClick={()=>setOpen(!open)} className='absolute hover:bg-red-500 hover:text-white duration-300 ease-in-out rounded-full top-5 right-5 cursor-pointer text-red-500'>
                    <IoMdCloseCircleOutline size={22} />
                </div>
                <form onSubmit={handleProfile} encType="multipart/form-data" className='flex flex-col gap-2 items-center justify-around'>
                    <h1 className='text-xs text-black/70'>{email}</h1>
                    <div className='profilePicture h-25 w-25 bg-cover border-none overflow-hidden rounded-full flex justify-center items-center'>
                        <img src={
                            profileUrl&&profileUrl!=="null"&&profileUrl.trim()!==""?profileUrl:"/default-profile.jpg"
                        } className="text-xs" alt="profile picture"/>
                    </div>
                    {profileUrl?<p onClick={handleRemoveProfile} className='px-5 text-sm cursor-pointer hover:bg-red-500 hover:text-white duration-300 border-2 border-red-400 hover:border-none ease-in-out rounded-md text-red-500 shadow-md active:scale-[95%] shadow-black/10'>Remove profile</p>:
                    <>
                    <label>
                        <input type="file" hidden onChange={(e)=>setProfile(e.target.files[0])}/>
                        {!profile&&<p className='px-5 text-sm cursor-pointer hover:scale-102 hover:bg-blue-700 hover:text-white duration-300 active:scale-[95%] ease-in-out rounded-full text-blue-600 shadow-md shadow-black/10'>Select profile</p>}
                    </label>
                    {profile&&<button type='submit' className='px-5 text-sm cursor-pointer hover:border-none hover:bg-green-700 hover:text-white duration-300 ease-in-out active:scale-[95%] border-2 border-green-700 rounded-full text-green-600 shadow-md shadow-black/10'>Click to Add</button>}
                    </>}
                </form>
                <div className='flex flex-col gap-2'>
                    <div className='text-red-500 px-5 py-1 rounded-md shadow-md shadow-black/10 text-sm cursor-pointer hover:bg-red-500 border-2 border-red-400 active:scale-[95%] hover:border-0 hover:text-white duration-300 ease-in-out' onClick={handleLogout}>
                        <p>Log Out</p>
                    </div>
                    <div onClick={handleAccountDelete} className='text-red-500 shadow-md shadow-black/10 px-5 py-1 rounded-md text-sm cursor-pointer border-2 border-red-400 active:scale-[95%] hover:border-0 hover:bg-red-500 hover:text-white duration-300 ease-in-out'>
                        <p>Delete Account</p>
                    </div>
                </div>
                <ToastContainer position="top-left"/>
            </div>
            }
        </div>
    )
}

export default DropdownProfile;