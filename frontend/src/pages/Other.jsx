import React, { useEffect,useState,useContext } from 'react';
import {ToastContainer,toast} from "react-toastify";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidepanel from "../components/Sidepanel";
import Doc from "../components/Doc";
import {UpdateContext} from "../context/Update";

const Other=()=>{
    const [otherFiles,setOtherFiles]=useState([]);
    const {setRefresh}=useContext(UpdateContext);
    const fetchOtherFiles=async()=>{
        try{
            const res=await axios.get("http://localhost:3000/file/get-others",{
                withCredentials:true
            });
            const {success,message,others}=res.data;
            if(success){
                setOtherFiles(others);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const deleteFile=async(filepath)=>{
        try{
            const res=await axios.delete("http://localhost:3000/file/delete",{
                data:{filepath},
                withCredentials:true
            });
            const {success,message}=res.data;
            if(success){
                setRefresh(true);
                fetchOtherFiles();
            }
            else toast.error(message);
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        fetchOtherFiles();
    },[]);
    
    return(
        <div className='flex w-full min-h-screen gap-5'>
                <Sidepanel/>
                <div className='flex flex-col min-h-screen w-[80%] rounded-md gap-2'>
                    <Navbar />
                    <div className='main flex flex-col px-3 py-2 gap-5 bg-zinc-100 rounded-md min-h-screen justify-around'>
                        <h1 className="text-4xl">Others.</h1>
                        <div className='flex gap-2 flex-wrap justify-start h-full w-full'>
                            {otherFiles.length===0?<p className='text-sm'>No file uploaded yet.</p>:otherFiles.map((item,id)=>{
                                return <Doc 
                                key={id}
                                filename={item.originalname}
                                filesize={item.fileSize}
                                filetype={item.fileType}
                                addedOn={item.addedOn}
                                publicUrl={item.publicUrl}
                                deleteFile={()=>deleteFile(item.path)}
                                />
                            })}
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right"/>
        </div>
  );
}

export default Other;