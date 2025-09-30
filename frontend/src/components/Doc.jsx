import React,{useState} from 'react';
import { GrDocumentPdf } from "react-icons/gr";
import { GrDocumentTxt } from "react-icons/gr";
import { BsFiletypeDocx } from "react-icons/bs";
import { LuImage } from "react-icons/lu";
import { FaFileWord } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { LiaFileAudioSolid } from "react-icons/lia";
import { CiVideoOn } from "react-icons/ci";

function getDateString(addedOn){
    const date=new Date(addedOn);
    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2,"0");
    const day=String(date.getDay()+1).padStart(2,"0");
    return `${year}/${month}/${day}`;
}

function getTimeStamp(addedOn){
    const date=new Date(addedOn);
    let hours=date.getHours();
    const minutes=String(date.getMinutes()).padStart(2,"0");
    const ampm=hours>=12?"PM":"AM"  //if hours are 13,14,15 etc than its PM otherwise AM
    hours=hours%12; //24hr -> 12hr format
    if(hours===0){
        hours=12;
    }
    return `${hours}:${minutes} ${ampm}`;
}

const Doc=({filename,filesize,filetype,addedOn,publicUrl,deleteFile})=>{
    const [open,setOpen]=useState(false);
    const imageTypes=["image/png","image/gif","image/jpeg","image/svg+xml","image/x-icon","image/webp"];
    function renderIcon(){
        if(filetype==="application/pdf"){
            return <GrDocumentPdf size={26} />;
        }
        else if(filetype==="text/plain"){
            return <GrDocumentTxt size={26} />;
        }
        else if(filetype==="application/msword"){
            return <FaFileWord size={26} />;
        }
        else if(filetype==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            return <RiFileExcel2Line size={26} />;
        }
        else if(filetype==="audio/mpeg"){
            return <LiaFileAudioSolid size={26} />;
        }
        else if(filetype==="video/mp4"){
            return <CiVideoOn size={26} />
        }
        else if(imageTypes.includes(filetype)){
            return <LuImage size={26} />;
        }
        else return <BsFiletypeDocx size={22} />;
    }
    const formattedDate=getDateString(addedOn);
    const time=getTimeStamp(addedOn);
    const MB=1000000;
    return(
      <div className="doc justify-between shadow-sm shadow-black/20 flex flex-col p-5 bg-white h-40 min-w-50 text-sm rounded-2xl tracking-tighter">
          <div className="flex justify-between items-center">
              <div className='rounded-full p-3 bg-pink-700 text-white'>
                {renderIcon()}
              </div>
              <div className='flex flex-col justify-between h-15 items-end gap-1'>
                <div onClick={()=>setOpen(!open)} className='relative cursor-pointer p-1 rounded-full bg-sky-700 text-white'>
                    <BsThreeDotsVertical size={18} />
                    {open&&<div className='absolute top-0 right-7 p-1 flex flex-col justify-center items-start rounded-md bg-sky-800 opacity-90 text-white'>
                        <a href={publicUrl} target="_blank" className='w-full cursor-pointer text-xs hover:bg-sky-500 active:scale-95 duration-300 ease-in-out px-1 rounded-md'>View</a>
                        <button className='cursor-pointer w-full text-xs hover:bg-sky-500 active:scale-95 duration-300 ease-in-out px-1 rounded-md'>Download</button>
                        <button onClick={deleteFile} className='cursor-pointer w-full text-xs hover:bg-sky-500 active:scale-95 duration-300 ease-in-out px-1 rounded-md'>Delete</button>
                    </div>}
                </div>
                <p>{(filesize/MB).toFixed(2)} MB</p>
              </div>
          </div>
          <div className="flex flex-col">
              <p className='font-semibold'>{filename}</p>
              <p className="text-black/60 text-xs">{formattedDate}, {time}</p>
          </div>
      </div>
    )
}

export default Doc;