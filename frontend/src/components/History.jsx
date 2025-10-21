import React from 'react';

const History=({uploadHistory})=>{
    const docType=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.  document","text/plain","application/json","text/csv","text/markdown"];
    const imageType=["image/png","image/gif","image/jpeg","image/svg+xml","image/x-icon","image/webp"];

    const getMinutesAgo=(dateObj)=>{
        const date=new Date(dateObj);
        const diff=(Date.now()-date)/1000/60;
        if(diff<1) return "now";
        if(diff<60) return `${Math.floor(diff)} mins ago`;
        if(diff<1440) return `${Math.floor(diff/60)} hrs ago`;
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
      <div className='history bg-white rounded-xl px-5 flex flex-col h-screen/90 w-1/2 gap-5 py-5'>
          <h1 className='text-3xl font-semibold'>Recent Uploads.</h1>
          {uploadHistory.length>0?
          <ul className='space-y-2'>
            {uploadHistory.map((item,idx)=>{
                return <li
                key={idx}
                className='flex w-full h-12 rounded-full px-5 items-center justify-between shadow-sm shadow-black/20 bg-sky-800 text-white text-xs hover:bg-sky-700 duration-300 ease-in-out'>
                    <div className='flex justify-center items-center p-1 text-lg rounded-full'>{renderIcon(item.fileType)}</div>
                    <p>You added <span className='font-semibold'>{item.originalname}</span></p>
                    <p>{getMinutesAgo(item.addedOn)}</p>
                </li>
            })}
          </ul>:<p className='text-center text-sm'>No actions today.</p>}
      </div>
    )
}

export default History;