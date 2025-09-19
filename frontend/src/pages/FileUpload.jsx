import React, { useState } from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";

const FileUpload=()=>{
    const [file,setFile]=useState(null);
    async function handleUpload(e){
        e.preventDefault();
        try{
            let user=JSON.parse(localStorage.getItem("loggedInUser"));
            const formData=new FormData();
            if(!file){
                toast.error("Upload the file first");
                return;
            }
            formData.append("uploaded-file",file);
            formData.append("user",JSON.stringify(user));
            const {data}=await axios.post("http://localhost:3000/user/upload",formData,{
                withCredentials:true
            });
            const {success,message}=data;
            if(success){
                toast.success(message);
                setFile(null);
            }
            else toast.error(message);
        }
        catch(err){
            toast.error(`Upload Error: ${err.message}`);
        }
    }
    return(
        <div className='flex flex-col gap-5 relative justify-center items-center main h-screen w-full bg-zinc-300 p-10'>
            <div className='px-5 py-1 rounded-md bg-blue-500 text-white absolute top-5 right-5 cursor-pointer'>
                <Link to="/dashboard">Back to dashboard</Link>
            </div>
            <h1 className='text-3xl text-sky-950 tracking-tighter'>Upload Your File</h1>
            <form onSubmit={handleUpload} encType="multipart/form-data" className='flex flex-col shadow-md shadow-black/10 justify-around items-center h-60 w-120 bg-white rounded-3xl p-5'>
                <label 
                className='cursor-pointer px-5 py-3 w-2/3 rounded-md outline-none border border-gray-800'
                >
                    <input
                    hidden
                    type="file"
                    onChange={(e)=>setFile(e.target.files[0])}
                    name="uploaded-file"
                    />
                    {file?`${file.name}`:"Drag & drop or choose a file"}
                </label>
                <button type="submit" className="px-5 py-2 bg-blue-500 cursor-pointer text-white rounded-md">Upload</button>
            </form>
            <ToastContainer position="top-right"/>
        </div>
  )
}

export default FileUpload;