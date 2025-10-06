import React from 'react';
import {IoDocuments} from 'react-icons/io5';
import {PiImages} from 'react-icons/pi';
import {FiVideo} from 'react-icons/fi';
import {FaChartPie} from 'react-icons/fa';
import {LuLayoutDashboard} from 'react-icons/lu';

const History=({uploadHistory})=>{
    const docType=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.  document","text/plain","application/json","text/csv","text/markdown"];
    const imageType=["image/png","image/gif","image/jpeg","image/svg+xml","image/x-icon","image/webp"];
    const mediaType=["video/mp4","audio/mpeg"];

    function getTimeString(dateObj){
        const date=new Date(dateObj);
        const day=date.getDate();
        const month=String(date.getMonth()+1).padStart(2,"0");
        const year=date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const renderIcon=(filetype)=>{
        if(docType.includes(filetype)){
            return <IoDocuments size={16}></IoDocuments>
        }
        else if(imageType.includes(filetype)){
            return <PiImages size={16}></PiImages>
        }
        else if(mediaType.includes(filetype)){
            return <FiVideo size={16}></FiVideo>;
        }
        else return <FaChartPie size={16}></FaChartPie>;
    }

    return(
      <div className='history bg-white rounded-xl px-5 flex flex-col h-screen/90 w-1/2 gap-10 py-5'>
          <h1 className='text-3xl font-semibold'>Recent Uploads.</h1>
          {uploadHistory.length>0?
          <ul className='space-y-2'>
            {uploadHistory.reverse().map((item,idx)=>{
                return <li
                key={idx}
                className='flex w-full h-12 rounded-full px-5 items-center justify-between shadow-sm shadow-black/20 bg-gray-100 text-black text-xs'>
                    <p className='text-gray-800'>{renderIcon(item.fileType)}</p>
                    <p>You added <span className='font-semibold'>{item.originalname}</span></p>
                    <p>{getTimeString(item.addedOn)}</p>
                </li>
            })}
          </ul>:<p className='text-center text-sm'>You have'nt uploaded any file yet.</p>}
      </div>
    )
}

export default History;