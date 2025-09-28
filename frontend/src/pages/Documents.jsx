import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import NavButton from '../components/NavButton';
import axios from "axios";
import DropdownProfile from '../components/DropdownProfile';
import Doc from "../components/Doc";
import { ToastContainer,toast } from "react-toastify";

function Documents(){ 
	const [docs,setDocs]=useState([]);

	async function fetchFiles(){
		try{
			const token=localStorage.getItem("token");
			if(!token){
				toast.error("No token");
				return;
			}
			const {data}=await axios.get("http://localhost:3000/file/get-docs",{
				headers:{
					Authorization:`Bearer ${token}`
				}
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

	async function deleteFile(filepath){
		try{
			const token=localStorage.getItem("token");
			const {data}=await axios.delete("http://localhost:3000/file/delete",{
				data:{filepath},
				headers:{
					Authorization:`Bearer ${token}`
				}
			});
			const {success,message}=data;
			if(success){
				fetchFiles();
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
		<div className='flex w-full min-h-screen gap-5'>
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
			<div className='flex flex-col min-h-screen w-[80%] bg-sky-100 rounded-md'>
				<div className='navbar flex w-full bg-white py-3 px-2 gap-5 justify-end items-center'>
					<Link to="/upload-file">
						<div className='flex  self-end items-center gap-2 py-2 px-5 rounded-full bg-sky-800 text-white'>
						<FiUploadCloud size={20} />
						<h1>Upload</h1>
						</div>
					</Link>
					<DropdownProfile />
				</div>
				<div className='main flex flex-col p-5 gap-2 rounded-xl justify-around'>
					<h1 className="text-4xl">Documents.</h1>
					<div className='flex gap-2 flex-wrap h-full w-full'>
						{docs.length===0?<h1 className="text-sm">No documents uploaded yet.</h1>:
						docs.map((item,id)=>{
							return <Doc
							key={id}
							filename={item.originalname}
							filesize={item.fileSize}
							filetype={item.fileType}
							addedOn={item.addedOn}
							publicUrl={item.publicUrl}
							deleteFile={()=>deleteFile(item.path)}
							/>
						})
						}
					</div>
				</div>
			</div>
			<ToastContainer position="top-right"/>
		</div>
		</>
	);
}

export default Documents;