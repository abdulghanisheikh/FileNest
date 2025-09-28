import React,{useEffect,useState,useContext} from 'react';
import {UpdateContext} from "../context/Update";
import axios from "axios";
import {Link} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import ProgressBar from '../components/ProgressBar';
import { FiUploadCloud } from "react-icons/fi";
import History from "../components/History";
import ContentBox from "../components/ContentBox";
import NavButton from '../components/NavButton';
import DropdownProfile from '../components/DropdownProfile';
import Footer from "../components/Footer";

function Dashboard(){
    const [usedStorage,setUsedStorage]=useState(0);
    const [docsSize,setDocsSize]=useState(0);
    const [imagesSize,setImagesSize]=useState(0);
    const [mediaSize,setMediaSize]=useState(0);
    const [otherSize,setOtherSize]=useState(0);
    const MB=1000000;
    const {refresh,setRefresh}=useContext(UpdateContext);

    async function fetchUsedStorage(){
        try{
            const token=localStorage.getItem("token");
            if(!token){
                toast.error("User not logged in");
                return;
            }
            const {data}=await axios.get("http://localhost:3000/user/files-storage",{
                headers:{
                Authorization:`Bearer ${token}`
                }
            });
            const {success,totalSize}=data;
            if(success){
                setUsedStorage(totalSize);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    async function fetchEachStorage(){
        try{
            const token=localStorage.getItem("token");
            if(!token){
                toast.error("No token, auth denied");
                return;
            }
            const {data}=await axios.get("http://localhost:3000/file/eachStorage",{
                headers:{
                Authorization:`Bearer ${token}`
                }
            });
            const {success,message,docStorage,imageStorage,mediaStorage,otherStorage}=data;
            if(success){
                setDocsSize(docStorage);
                setImagesSize(imageStorage);
                setMediaSize(mediaStorage);
                setOtherSize(otherStorage);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }
    
    //Run once, when component mounts
    useEffect(()=>{
        fetchUsedStorage();
        fetchEachStorage();
    },[]);

    //Run whenever refresh becomes true
    useEffect(()=>{
        if(refresh){
            fetchEachStorage();
            setRefresh(false);
        }
    },[refresh,setRefresh]);

    return(
        <div className='flex w-full min-h-screen'>
            <div className='flex flex-col w-[20%] gap-10 px-2 min-h-screen'>
            <h1 className='text-4xl text-sky-950'>FileNest</h1>
            <div className='sidebar flex flex-col gap-5'>
                <NavButton name="Dashboard" to="/dashboard" bg="sky"/>
                <NavButton name="Documents" to="/documents" bg="white" />
                <NavButton name="Images" to="/documents" bg="white" />
                <NavButton name="Video, Audio" to="/documents" bg="white" />
                <NavButton name="Others" to="/documents" bg="white" />
            </div>
            <Footer />
            </div>
            <div className='flex flex-col min-h-screen w-[80%] rounded-md'>
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
            <div className='main flex rounded-2xl justify-between bg-gray-100 px-10 py-5'>
                <div className='flex flex-col items-center justify-center w-1/2 px-15 gap-3 h-full'>
                <ProgressBar usedStorage={usedStorage} />
                <div className='flex gap-2 flex-wrap h-full w-full'>
                    <ContentBox title="Documents" storage={(docsSize/MB).toFixed(2)} to="/documents"/>
                    <ContentBox title="Images" storage={(imagesSize/MB).toFixed(2)} to="/images" />
                    <ContentBox title="Media" storage={(mediaSize/MB).toFixed(2)} to="/media" />
                    <ContentBox title="Others" storage={(otherSize/MB).toFixed(2)} to="/others" />
                </div>
                </div>
                <History />
            </div>
            </div>
            <ToastContainer position="top-right" />
        </div>
    )
}
export default Dashboard;