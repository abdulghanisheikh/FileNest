import React, { useEffect } from 'react';
import { GrDocumentPdf } from "react-icons/gr";
import { GrDocumentTxt } from "react-icons/gr";
import { BsFiletypeDocx } from "react-icons/bs";

const Doc=({filename,filesize,fileType,addedOn})=>{
    function renderIcon(){
        if(fileType==="application/pdf"){
            return <GrDocumentPdf size={26} />
        }
        else if(fileType==="text/plain"){
            return <GrDocumentTxt size={26} /> 
        }
        else return <BsFiletypeDocx size={26} />
    }
    const date=new Date(addedOn);
    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2,"0");
    const day=String(date.getDay()+1).padStart(2,"0");
    let hours=date.getHours();
    const minutes=String(date.getMinutes()).padStart(2,"0");
    const ampm=hours>=12?"PM":"AM"  //if hours are 13,14,15 etc than its PM otherwise AM
    hours=hours%12; //24hr -> 12hr format
    if(hours===0){
        hours=12;
    }
    const formattedDate=`${year}/${month}/${day}`; 
    const time=`${hours}:${minutes} ${ampm}`
    useEffect(()=>{
        renderIcon();
    },[]);
    
    return (
      <div className="doc justify-between shadow-sm shadow-black/20 flex flex-col p-5 bg-white h-40 min-w-50 text-sm rounded-2xl tracking-tighter">
          <div className="flex justify-between">
              <div className='p-3 rounded-full bg-red-400 text-white'>
                {renderIcon()}
              </div>
              <p>{(filesize/1000000).toFixed(3)} MB</p>
          </div>
          <div className="flex flex-col">
              <p className='font-semibold'>{filename}</p>
              <p className="text-black/60 text-xs">{formattedDate}, {time}</p>
          </div>
      </div>
    )
}

export default Doc;