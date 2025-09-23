import React from "react";
import {Link} from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import NavButton from '../components/NavButton';
import DropdownProfile from '../components/DropdownProfile';
import Doc from "../components/Doc";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {toast,ToastContainer} from "react-toastify";

function Documents(){ 
	const [docs,setDocs]=useState([]);
	async function fetchFiles(){
		try{
			const {data}=await axios.get("http://localhost:3000/file/get-docs",{
				withCredentials:true
			}); 
			const {success,message,files}=data;
			if(success){
				setDocs(files);
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
		fetchFiles();
	},[])
	
	return(
		<>
		<div className='flex w-full min-h-screen gap-5 py-2'>
			<div className='flex flex-col w-[20%] gap-10 px-2 h-full'>
			<h1 className='text-4xl text-sky-950'>FileNest</h1>
			<div className='sidebar flex flex-col gap-5'>
				<NavButton name="Dashboard" to="/dashboard" bg="white"/>
				<NavButton name="Documents" to="/documents" bg="sky" />
				<NavButton name="Images" to="/documents" bg="white" />
				<NavButton name="Video, Audio" to="/documents" bg="white" />
				<NavButton name="Others" to="/documents" bg="white" />
			</div>
			<div className="w-40 h-40 flex flex-col items-center self-center">
				<img className="object-cover" src="/folder.png" alt="" />
				<a href="http://github/abdulghanisheikh" className='text-sky-950 text-sm mt-2'>Github</a>
				<a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-sm'>ghanisheikh26@gmail.com</a>
			</div>
			</div>
			<div className='flex flex-col h-full w-[80%] gap-1 rounded-md'>
			<div className='navbar flex w-full h-20 bg-gray-100 rounded-md px-5 justify-between items-center gap-2'>
				<input className='h-10 w-1/2 shadow-sm shadow-black/10 rounded-full outline-none bg-white px-5' type="text" placeholder='search' />
				<div className="flex gap-2 items-center">
				<Link to="/upload-file">
					<div className='flex  self-end items-center gap-2 py-2 px-5 rounded-full bg-sky-800 text-white'>
					<FiUploadCloud size={20} />
					<h1>Upload</h1>
					</div>
				</Link>
				<DropdownProfile />
				</div>
			</div>
			<div className="main flex flex-col gap-3 justify-center bg-gray-100 px-10 py-5 rounded-xl h-screen/90">
				<h1 className="text-4xl tracking-tighter font-semibold">Documents</h1>
				<div className="flex h-full w-full flex-wrap gap-3">
					{docs.map((item,id)=>(
						<Doc 
						key={id}
						filename={item.originalname}
						filesize={item.fileSize}
						fileType={item.fileType}
						addedOn={item.addedOn}
						/>
					))}
				</div>
			</div>
			</div>
			<ToastContainer position="top-right"/>
		</div>
		</>
	);
}

export default Documents;