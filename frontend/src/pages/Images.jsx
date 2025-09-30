import React,{useState,useEffect,useContext} from 'react';
import {ToastContainer,toast} from "react-toastify";
import NavButton from "../components/NavButton";
import Navbar from "../components/Navbar";
import Doc from "../components/Doc";
import axios from "axios";
import {UpdateContext} from "../context/Update";

const Images=()=>{
    const [imageFiles,setImageFiles]=useState([]);
    const {setRefresh}=useContext(UpdateContext);
    const fetchImages=async()=>{
        try{
            const token=localStorage.getItem("token");
            if(!token){
                toast.error("No token, auth denied");
            }
            const {data}=await axios.get("http://localhost:3000/file/get-images",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const {success,message,images}=data;
            if(success){
                setImageFiles(images);
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
            const token=localStorage.getItem("token");
            if(!token){
                toast.error("No token, auth denied");
            }
            const res=await axios.delete("http://localhost:3000/file/delete",{
                data:{filepath},
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const {success,message}=res.data;
            if(success){
                setRefresh(true);
                fetchImages();
            } 
            else{
                toast.error(message);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchImages();
    },[]);
    
    return(
        <div className='flex w-full min-h-screen gap-5'>
                <div className='flex flex-col w-[20%] gap-10 px-2 h-full'>
                <h1 className='text-4xl text-sky-950'>FileNest</h1>
                <div className='sidebar flex flex-col gap-5'>
                    <NavButton name="Dashboard" to="/dashboard" bg="white"/>
                    <NavButton name="Documents" to="/documents" bg="white" />
                    <NavButton name="Images" to="/images" bg="sky" />
                    <NavButton name="Video, Audio" to="/media" bg="white" />
                    <NavButton name="Others" to="/others" bg="white" />
                </div>
                <div className="w-40 h-40 flex flex-col items-center self-center">
                    <img className="object-cover" src="/folder.png" alt="" />
                    <a href="http://github/abdulghanisheikh" className='text-sky-950 text-sm mt-2'>Github</a>
                    <a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-sm'>ghanisheikh26@gmail.com</a>
                </div>
                </div>
                <div className='flex flex-col min-h-screen w-[80%] rounded-md gap-2'>
                    <Navbar />
                    <div className='main flex flex-col px-3 py-2 gap-5 bg-zinc-100 rounded-md min-h-screen justify-around'>
                        <h1 className="text-4xl">Images.</h1>
                        <div className='flex gap-2 flex-wrap justify-start h-full w-full'>
                            {imageFiles.length===0?<p className='text-sm'>No image uploaded yet.</p>:
                            imageFiles.map((item,idx)=>{
                                return <Doc
                                key={idx}
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
    )
}

export default Images;