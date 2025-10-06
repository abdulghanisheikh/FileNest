import React from 'react';
import {LuLayoutDashboard} from 'react-icons/lu';

const History=({uploadHistory})=>{
    const docType=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.  document","text/plain","application/json","text/csv","text/markdown"];
    const imageType=["image/png","image/gif","image/jpeg","image/svg+xml","image/x-icon","image/webp"];

    function getTimeString(dateObj){
        const date=new Date(dateObj);
        const day=date.getDate();
        const month=String(date.getMonth()+1).padStart(2,"0");
        const year=date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const renderIcon=(type)=>{
        if(docType.includes(type)){
            return "📕";
        }
        else if(imageType.includes(type)){
            return "🖼️";
        }
        else if(type.startsWith("video")){
            return "🎥";
        }
        else if(type.startsWith("audio")){
            return "🎵";
        }
        else if(type.includes("zip")){
            return "📦";
        }
        else return "📄";
    }

    return(
      <div className='history bg-white rounded-xl px-5 flex flex-col h-screen/90 w-1/2 gap-10 py-5'>
          <h1 className='text-3xl font-semibold'>Recent Uploads.</h1>
          {uploadHistory.length>0?
          <ul className='space-y-2'>
            {uploadHistory.map((item,idx)=>{
                return <li
                key={idx}
                className='flex w-full h-12 rounded-full px-5 items-center justify-between shadow-sm shadow-black/20 bg-sky-800 text-white text-xs'>
                    <div className='flex justify-center items-center text-sm p-1 rounded-full bg-sky-500'>{renderIcon(item.fileType)}</div>
                    <p>You added <span className='font-semibold'>{item.originalname}</span></p>
                    <p>{getTimeString(item.addedOn)}</p>
                </li>
            })}
          </ul>:<p className='text-center text-sm'>You have'nt uploaded any file yet.</p>}
      </div>
    )
}

export default History;