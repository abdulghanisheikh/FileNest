import React, { useEffect, useState } from 'react';
import { IoDocuments } from 'react-icons/io5';
import { PiImages } from 'react-icons/pi';
import { FiVideo } from 'react-icons/fi';
import { FaChartPie } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';

const History=()=>{
    const [filesArray,setFilesArray]=useState([]);

    useEffect(()=>{

    },[])
    
    return (
      <div className='history bg-white rounded-xl px-5 flex flex-col h-scree/90 w-1/2 gap-10 py-5'>
          <h1 className='text-3xl font-semibold'>Recent Files Uploaded</h1>
          <ul className='space-y-2'>
            <li className='flex w-full h-12 rounded-full px-5 items-center justify-between shadow-md shadow-black/20 bg-gray-100 text-black text-sm'>
                <p>Icon</p>
                <p>You added <span className='font-semibold'>File Name</span></p>
                <p>9 min ago</p>
            </li>
          </ul>
      </div>
    )
}

export default History;