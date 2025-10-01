import React, { useEffect,useState,useContext } from 'react';
import {ToastContainer,toast} from "react-toastify";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidepanel from "../components/Sidepanel";
import Doc from "../components/Doc";
import {UpdateContext} from "../context/Update";

const Media=()=>{
	const [mediaFiles,setMediaFiles]=useState([]);
	const {setRefresh}=useContext(UpdateContext);
	const fetchMediaFiles=async()=>{
		try{
			const token=localStorage.getItem("token");
			const res=await axios.get("http://localhost:3000/file/get-media",{
				headers:{
					Authorization:`Bearer ${token}`
				}
			});
			const {success,message,media}=res.data;
			if(success){
				setMediaFiles(media);
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
				return;
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
				fetchMediaFiles();
			}
			else toast.error(message);
		}
		catch(err){
			toast.error(err.message);
		}
	}

	useEffect(()=>{
		fetchMediaFiles();
	},[]);
	
	return(
		<div className='flex w-full min-h-screen gap-5'>
				<Sidepanel/>
				<div className='flex flex-col min-h-screen w-[80%] rounded-md gap-2'>
					<Navbar />
					<div className='main flex flex-col px-3 py-2 gap-5 bg-sky-100 rounded-md min-h-screen justify-around'>
						<h1 className="text-4xl">Multimedia.</h1>
						<div className='flex gap-2 flex-wrap justify-start h-full w-full'>
							{mediaFiles.length===0?<p className='text-sm'>No file uploaded yet.</p>:mediaFiles.map((item,id)=>{
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

export default Media;