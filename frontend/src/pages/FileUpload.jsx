import React, { useState,useContext } from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";
import {UpdateContext} from "../context/Update";

const FileUpload=()=>{
    const [file,setFile]=useState(null);
    const {setRefresh}=useContext(UpdateContext);
    const baseUrl=import.meta.env.VITE_BASE_URL;

    async function handleUpload(e){
        e.preventDefault();
        try{
            let user=JSON.parse(localStorage.getItem("loggedInUser"));
            if(!user){
                toast.error("No User");
                return;
            }
            const formData=new FormData();
            if(!file){
                toast.error("Upload the file first");
                return;
            }
            formData.append("uploaded-file",file);
            formData.append("user",JSON.stringify(user));
            const {data}=await axios.post(`${baseUrl}/user/upload`,formData,{
                withCredentials:true
            });
            const {success,message}=data;
            if(success){
                toast.success(message);
                setRefresh(true);
                setFile(null);
            }
            else toast.error(message);
        }
        catch(err){
            toast.error(err.message);
        }
    }
    return(
        <div className='flex flex-col gap-5 relative justify-center items-center main h-screen w-full bg-zinc-100 p-10'>
            <div className='px-5 py-1 rounded-md bg-blue-500 text-white absolute top-5 right-5 cursor-pointer active:scale-[95%] duration-300 ease-in-out'>
                <Link to="/dashboard">Back to dashboard</Link>
            </div>
            <h1 className='text-3xl text-sky-950 tracking-tighter'>Upload Your File</h1>
            <form onSubmit={handleUpload} encType="multipart/form-data" className='flex border-b-4 border-r-4 border-b-black/20 border-r-black/20 flex-col duration-300 ease-linear justify-center align-center gap-2 items-center h-60 w-120 bg-white rounded-3xl p-5'>
                <label 
                className='cursor-pointer px-5 py-3 w-2/3 rounded-md outline-none border border-gray-800 truncate'
                >
                    <input
                    hidden
                    type="file"
                    onChange={(e)=>setFile(e.target.files[0])}
                    name="uploaded-file"
                    />
                    {file?`${file.name}`:"Drag & drop or Choose a file"}
                </label>
                <p className="text-sm font-semibold text-black/80">Max. size 10MB</p>
                <button type="submit" className="w-2/3 py-3 mt-6 duration-300 ease-in-out cursor-pointer text-blue-600 border-2 border-blue-500 rounded-xl active:scale-[95%] font-semibold hover:border-0 hover:bg-blue-600 hover:text-white">Upload</button>
            </form>
            <ToastContainer position="top-left"/>
        </div>
  )
}

export default FileUpload;