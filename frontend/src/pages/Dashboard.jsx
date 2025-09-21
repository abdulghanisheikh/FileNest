import React,{useEffect,useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import { SlLogout } from "react-icons/sl";
import {ToastContainer,toast} from "react-toastify";
import ProgressBar from '../components/ProgressBar';
import { FiUploadCloud } from "react-icons/fi";
import History from "../components/History";
import ContentBox from "../components/ContentBox";
import NavButton from '../components/NavButton';

function Dashboard(){
  const navigate=useNavigate();
  const [usedStorage,setUsedStorage]=useState(0);

  async function fetchUsedStorage(){
    try{
      const {data}=await axios.get("http://localhost:3000/user/files-storage",{
        withCredentials:true
      });
      const {success,totalSize}=data;
      if(success){
        setUsedStorage(totalSize);
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  
  useEffect(()=>{
    fetchUsedStorage();
  },[]);
  
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
      console.log(err.message);
    }
  }
  return (
    <>
      <div className='flex w-full min-h-screen gap-5'>
        <div className='flex flex-col w-[20%] gap-10 px-2 h-full'>
          <h1 className='text-4xl text-sky-950'>FileNest</h1>
          <div className='sidebar flex flex-col gap-5'>
            <NavButton name="Dashboard" to="/dashboard" bg="sky"/>
            <NavButton name="Documents" to="/documents" bg="white" />
            <NavButton name="Images" to="/documents" bg="white" />
            <NavButton name="Media" to="/documents" bg="white" />
            <NavButton name="Others" to="/documents" bg="white" />
          </div>
          <div className="w-40 h-40 flex flex-col items-center self-center">
            <img className="object-cover" src="/folder.png" alt="" />
            <a href="http://github/abdulghanisheikh" className='text-sky-950 text-sm mt-2'>Github</a>
            <a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-sm'>ghanisheikh26@gmail.com</a>
          </div>
        </div>
        <div className='flex flex-col h-full w-[80%] bg-zinc-100 rounded-md'>
          <div className='navbar flex w-full justify-between items-center'>
            <input className='h-10 w-1/2 rounded-full outline-none bg-white px-5' type="text" placeholder='search' />
            <form action="" encType='multipart/form-data' className='flex w-1/2 gap-5 justify-end items-center'>
              <Link to="/upload-file">
                <div className='flex items-center gap-2 py-2 px-5 rounded-full bg-sky-800 text-white'>
                  <FiUploadCloud size={20} />
                  <h1>Upload</h1>
                </div>
              </Link>
              <button className='cursor-pointer' onClick={handleLogout}><SlLogout size={26} /></button>
            </form>
          </div>
          <div className='main flex p-5 rounded-xl justify-around'>
            <div className='flex flex-col w-1/2 px-15 gap-3 h-full'>
              <ProgressBar usedStorage={usedStorage} />
              <div className='flex gap-2 flex-wrap h-full w-full'>
                <ContentBox title="Documents" storage={20} />
                <ContentBox title="Images" storage={20} />
                <ContentBox title="Media" storage={20} />
                <ContentBox title="Others" storage={20} />
              </div>
            </div>
            <History />
          </div>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default Dashboard;