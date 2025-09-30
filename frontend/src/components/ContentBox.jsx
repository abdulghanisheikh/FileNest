import React from 'react';
import { IoDocuments } from "react-icons/io5";
import { PiImages } from "react-icons/pi";
import { FiVideo } from "react-icons/fi";
import { FaChartPie } from "react-icons/fa";
import { Link } from "react-router-dom";

//Images,Media,Others
const ContentBox=({title,storage,to,time,date})=>{
    function renderIcon(){
        if(title==="Documents"){
            return <IoDocuments size={22} />
        }
        else if(title==="Images"){
            return <PiImages size={22} />
        }
        else if(title==="Media"){
            return <FiVideo size={22} />
        }
        else return <FaChartPie size={22} />
    }
    return(
        <Link to={to}>
            <div className='contentBox bg-white w-55 h-45 shadow-md shadow-black/10 rounded-md flex flex-col py-3 px-5 gap-1'>
                <div className='flex flex-col justify-between h-1/2 w-full items-center'>
                <div className='flex justify-between items-center w-full h-[10%]'>
                    {renderIcon()}
                    <p className='text-sm'>{storage} MB</p>
                </div>
                <h1 className='font-semibold'>{title}</h1>
                </div>
                <hr className='border-t text-black/50'/>
                <div className='flex flex-col items-center mt-2 gap-1'>
                    <p className='text-xs text-gray-500'>Last Update on</p>
                    <p className='text-sm'>{!time?"Time":time}, {!date?"Date":date}</p>
                </div>
            </div>
        </Link>
    )
}

export default ContentBox;