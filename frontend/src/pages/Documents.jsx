import React, { useEffect,useState,useContext } from "react";
import NavButton from '../components/NavButton';
import axios from "axios";
import Doc from "../components/Doc";
import Navbar from "../components/Navbar";
import { ToastContainer,toast } from "react-toastify";
import {UpdateContext} from "../Context/Update";

function Documents(){ 
	const [docs,setDocs]=useState([]);
	const {setRefresh}=useContext(UpdateContext);
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
				setRefresh(true);
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
		<div className='flex w-full min-h-screen gap-5'>
			<div className='flex flex-col w-[20%] gap-10 px-2 h-full'>
			<h1 className='text-4xl text-sky-950'>FileNest</h1>
			<div className='sidebar flex flex-col gap-5'>
				<NavButton name="Dashboard" to="/dashboard" bg="white"/>
				<NavButton name="Documents" to="/documents" bg="sky" />
				<NavButton name="Images" to="/images" bg="white" />
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
				<div className='main flex flex-col px-3 py-2 gap-5 bg-sky-100 rounded-md min-h-screen justify-around'>
					<h1 className="text-4xl">Documents.</h1>
					<div className='flex gap-2 flex-wrap justify-start h-full w-full'>
						{docs.length===0?<p className="text-sm">No documents uploaded yet.</p>:
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
	);
}

export default Documents;