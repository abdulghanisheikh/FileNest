import React from 'react';
import { IoDocuments } from "react-icons/io5";
import { PiImages } from "react-icons/pi";
import { FiVideo } from "react-icons/fi";
import { FaChartPie } from "react-icons/fa";

//Images,Media,Others
const ContentBox=({title,storage})=>{
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
        <div className='contentBox bg-white w-55 h-45 border rounded-md flex flex-col py-3 px-5'>
            <div className='flex flex-col justify-between h-1/2 w-full items-center'>
            <div className='flex justify-between items-center w-full h-[10%]'>
                {renderIcon()}
                <p className='text-sm'>{storage}GB</p>
            </div>
            <h1>{title}</h1>  
            </div>
        </div>
    )
}

export default ContentBox;