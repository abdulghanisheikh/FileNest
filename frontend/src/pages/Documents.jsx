<<<<<<< HEAD
import React,{useState,useEffect,useContext} from "react";
=======
import React,{useState,useEffect} from "react";
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b
import {Link} from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import NavButton from '../components/NavButton';
import DropdownProfile from '../components/DropdownProfile';
import Doc from "../components/Doc";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import Footer from "../components/Footer";
<<<<<<< HEAD
import {UpdateContext} from "../context/Update";
=======
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b

function Documents(){ 
	const [docs,setDocs]=useState([]);
	const {setRefresh}=useContext(UpdateContext);

	async function fetchFiles(){
		try{
			const token=localStorage.getItem("token");
			if(!token){
				toast.error("No token, auth denied");
				return;
			}
			const {data}=await axios.get("http://localhost:3000/file/get-docs",{
<<<<<<< HEAD
				headers:{
					Authorization:`Bearer ${token}`
				}
=======
				withCredentials:true
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b
			});
			const {success,message,files}=data;
			if(success) setDocs(files);
			else toast.error(message);
		}
		catch(err){
			toast.error(err.message);
		}
	}
	async function deleteFile(filepath){
		try{
<<<<<<< HEAD
			const token=localStorage.getItem("token");
			if(!token){
				toast.error("No token, auth denied");
				return;
			}
			const {data}=await axios.delete(`http://localhost:3000/file/delete`,{
				data:{   //this is body of delete request
					filepath
				},
				headers:{
					Authorization:`Bearer ${token}`
				}
=======
			const {data}=await axios.delete(`http://localhost:3000/file/delete`,{
				data:{filepath}, //this is the body for delete
				withCredentials:true //this is for sending cookies/auth
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b
			});
			const {success,message}=data;
			if(success){
				fetchFiles();
<<<<<<< HEAD
				setRefresh(true);
=======
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b
				toast.success(message);
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
<<<<<<< HEAD
		<div className='flex w-full min-h-screen'>
=======
		<div className='flex w-full min-h-screen gap-5 py-2'>
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b
			<div className='flex flex-col w-[20%] gap-10 px-2 min-h-screen'>
			<h1 className='text-4xl text-sky-950'>FileNest</h1>
			<div className='sidebar flex flex-col gap-5'>
				<NavButton name="Dashboard" to="/dashboard" bg="white"/>
				<NavButton name="Documents" to="/documents" bg="sky" />
				<NavButton name="Images" to="/documents" bg="white" />
				<NavButton name="Video, Audio" to="/documents" bg="white" />
				<NavButton name="Others" to="/documents" bg="white" />
			</div>
			<Footer />
			</div>
			<div className='flex flex-col min-h-screen w-[80%] gap-1 rounded-md'>
			<div className='navbar flex w-full h-20 rounded-md px-5 justify-between items-center gap-2'>
				<input className='h-10 w-1/2 shadow-sm shadow-black/10 rounded-full outline-none bg-white px-5' type="text" placeholder='search' />
				<div className="flex gap-2 items-center">
				<Link to="/upload-file">
					<div className='flex self-end items-center gap-2 py-2 px-5 rounded-full bg-sky-800 text-white'>
					<FiUploadCloud size={20} />
					<h1>Upload</h1>
					</div>
				</Link>
				<DropdownProfile />
				</div>
			</div>
<<<<<<< HEAD
			<div className="main flex flex-col gap-3 justify-center bg-sky-100 min-h-screen px-10 py-5 rounded-xl">
=======
			<div className="main flex flex-col gap-3 justify-between bg-sky-100 h-screen px-10 py-5 rounded-xl">
>>>>>>> bdb1a059dd893981245327d71b247b6d0688546b
				<h1 className="text-4xl tracking-tighter font-semibold">Documents</h1>
				<div className="flex h-full w-full flex-wrap gap-3">
					{docs.length>0?docs.map((item,id)=>(
						<Doc
						key={id}
						deleteFile={()=>deleteFile(item.path)}
						filename={item.originalname}
						filesize={item.fileSize}
						filetype={item.fileType}
						addedOn={item.addedOn}
						publicUrl={item.publicUrl}
						/>
					)):<h1>No Documents Yet.</h1>
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