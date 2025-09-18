import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import {ToastContainer,toast} from "react-toastify";
import ProgressBar from '../components/ProgressBar';
import { PiImagesDuotone } from "react-icons/pi";
import { TiMediaPauseOutline } from "react-icons/ti";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoDocuments } from "react-icons/io5";
import { PiImages } from "react-icons/pi";
import { FiVideo } from "react-icons/fi";
import { FaChartPie } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

function Dashboard(){
  const navigate=useNavigate();
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
            <Link to="/dashboard">
              <div className='p-3 rounded-full flex items-center justify-center gap-1 bg-sky-600 text-center text-white shadow-md shadow-black/30'>
                <LuLayoutDashboard />
                <p>Dashboard</p>
              </div>
            </Link>
            <Link to="/document">
              <div className='p-3 rounded-full flex items-center justify-center gap-1 text-center bg-gray-100 shadow-md shadow-black/10'>
                <IoDocuments />
                <p>Document</p>
              </div>
            </Link>
            <Link to="/image">
              <div className='p-3 rounded-full flex items-center justify-center gap-1 text-center bg-gray-100 shadow-md shadow-black/10'>
                <PiImagesDuotone />
                <p>Images</p>
              </div>
            </Link>
            <Link to="/media">
              <div className='p-3 rounded-full flex items-center justify-center gap-1 text-center bg-gray-100 shadow-md shadow-black/10'>
                <TiMediaPauseOutline />
                <p>Media</p>
              </div>
            </Link>
            <Link to="/others">
              <div className='p-3 rounded-full bg-gray-100 shadow-md shadow-black/10 text-center flex items-center justify-center gap-1'>
                <FaChartPie />
                <p>Others</p>
              </div>
            </Link>
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
              <ProgressBar />
              <div className='flex gap-2 flex-wrap h-full w-full'>
                <div className='contentBox bg-white w-55 h-45 border rounded-md flex flex-col py-3 px-5'>
                  <div className='flex flex-col justify-between h-1/2 w-full items-center'>
                    <div className='flex justify-between items-center w-full h-[10%]'>
                        <IoDocuments size={22} />
                        <p className='text-sm'>20GB</p>
                    </div>
                    <h1>Documents</h1>
                  </div>
                </div>
                <div className='contentBox bg-white w-55 h-45 border rounded-md flex flex-col py-3 px-5'>
                  <div className='flex flex-col justify-between h-1/2 w-full items-center'>
                    <div className='flex justify-between items-center w-full h-[10%]'>
                        <PiImages size={22} />
                        <p className='text-sm'>20GB</p>
                    </div>
                    <h1>Images</h1>
                  </div>
                </div>
                <div className='contentBox bg-white w-55 h-45 border rounded-md flex flex-col py-3 px-5'>
                  <div className='flex flex-col justify-between h-1/2 w-full items-center'>
                    <div className='flex justify-between items-center w-full h-[10%]'>
                        <FiVideo size={22} />
                        <p className='text-sm'>20GB</p>
                    </div>
                    <h1>Media</h1>
                  </div>
                </div>
                <div className='contentBox bg-white w-55 h-45 border rounded-md flex flex-col py-3 px-5'>
                  <div className='flex flex-col justify-between h-1/2 w-full items-center'>
                    <div className='flex justify-between items-center w-full h-[10%]'>
                        <FaChartPie size={22} />
                        <p className='text-sm'>20GB</p>
                    </div>
                    <h1>Others</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='history bg-white rounded-xl p-2 flex flex-col h-full w-1/2 gap-2 py-5'>
              <h1 className='text-3xl'>Recent Files Uploaded</h1>
              <div className='flex flex-col gap-1'>
                <div className='w-full h-15 rounded-xl border border-gray-800'></div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default Dashboard;