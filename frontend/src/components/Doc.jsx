import React, { useEffect } from 'react';
import { GrDocumentPdf } from "react-icons/gr";
import { GrDocumentTxt } from "react-icons/gr";
import { BsFiletypeDocx } from "react-icons/bs";

const Doc=({filename,filesize,fileType,addedOn})=>{
    function renderIcon(){
        if(fileType==="application/pdf"){
            return <GrDocumentPdf size={22} />
        }
        else if(fileType==="text/plain"){
            return <GrDocumentTxt size={22} /> 
        }
        else return <BsFiletypeDocx size={22} />
    }
    
    useEffect(()=>{
        renderIcon();
    },[]);
    
    return (
      <div className="doc justify-between flex flex-col p-5 bg-white h-40 min-w-50 text-sm rounded-2xl tracking-tighter">
          <div className="flex justify-between">
              <div className='p-3 rounded-full bg-red-400 text-white'>
                {renderIcon()}
              </div>
              <p>{(filesize/1000000).toFixed(3)} MB</p>
          </div>
          <div className="flex flex-col">
              <p className='font-semibold'>{filename}</p>
              <p className="text-black/50 text-xs">{addedOn}</p>
          </div>
      </div>
    )
}

export default Doc;