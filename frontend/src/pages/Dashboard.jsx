import React,{useEffect,useState,useContext} from 'react';
import {UpdateContext} from "../context/Update";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";
import ProgressBar from '../components/ProgressBar';
import History from "../components/History";
import ContentBox from "../components/ContentBox";
import Navbar from "../components/Navbar";
import Sidepanel from "../components/Sidepanel";

function Dashboard(){
    const [usedStorage,setUsedStorage]=useState(0);
    const [docsSize,setDocsSize]=useState(0);
    const [imagesSize,setImagesSize]=useState(0);
    const [mediaSize,setMediaSize]=useState(0);
    const [otherSize,setOtherSize]=useState(0);
    const MB=1000000;
    const {refresh,setRefresh}=useContext(UpdateContext);
    const [docTime,setDocTime]=useState(null);
    const [imageTime,setImageTime]=useState(null);
    const [mediaTime,setMediaTime]=useState(null);
    const [otherTime,setOtherTime]=useState(null);

    async function fetchUsedStorage(){
        try{
            const {data}=await axios.get("http://localhost:3000/user/usedStorage",{
                withCredentials:true
            });
            const {success,totalSize}=data;
            if(success) setUsedStorage(totalSize);
        }
        catch(err){
            toast.error(err.message);
        }
    }

    function getDateString(now){
        const shortMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const day=String(now.getDate()).padStart(2,"0");
        const month=shortMonths[now.getMonth()];
        return `${day} ${month}`;
    }

    function getTimeStamp(now){
        let hours=now.getHours();
        const minutes=now.getMinutes().toString().padStart(2,"0");
        const ampm=hours>=12?"pm":"am";
        hours=hours%12;
        if(hours===0) hours=12;
        return `${hours}:${minutes} ${ampm}`;
    } 

    async function fetchEachStorage(){
        try{
            const {data}=await axios.get("http://localhost:3000/file/eachStorage",{
                withCredentials:true
            });
            const {
                success,
                message,
                docStorage,
                imageStorage,
                mediaStorage,
                otherStorage,
                docUpdate,
                imageUpdate,
                mediaUpdate,
                otherUpdate
            }=data;
            if(success){
                setDocsSize(docStorage);
                setImagesSize(imageStorage);
                setMediaSize(mediaStorage);
                setOtherSize(otherStorage);
                setDocTime(new Date(docUpdate));
                setImageTime(new Date(imageUpdate));
                setMediaTime(new Date(mediaUpdate));
                setOtherTime(new Date(otherUpdate));
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
            fetchUsedStorage();
        }
    },[refresh,setRefresh]);

    return(
        <div className='flex w-full min-h-screen'>
            <Sidepanel/>
            <div className='flex flex-col min-h-screen w-[80%] rounded-md'>
            <Navbar />
            <div className='main flex rounded-2xl justify-between bg-zinc-100 px-10 py-5'>
                <div className='flex flex-col items-center justify-center w-1/2 px-15 gap-3 h-full'>
                <ProgressBar usedStorage={usedStorage} />
                <div className='flex gap-2 flex-wrap h-full w-full'>
                    <ContentBox title="Documents" storage={(docsSize/MB).toFixed(2)} to="/documents" time={docTime?getTimeStamp(docTime):""} date={docTime?getDateString(docTime):""} />
                    <ContentBox title="Images" storage={(imagesSize/MB).toFixed(2)} to="/images" time={imageTime?getTimeStamp(imageTime):""} date={imageTime?getDateString(imageTime):""} />
                    <ContentBox title="Media" storage={(mediaSize/MB).toFixed(2)} to="/media" time={mediaTime?getTimeStamp(mediaTime):""} date={mediaTime?getDateString(mediaTime):""} />
                    <ContentBox title="Others" storage={(otherSize/MB).toFixed(2)} to="/others" time={otherTime?getTimeStamp(otherTime):""} date={otherTime?getDateString(otherTime):""}/>
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