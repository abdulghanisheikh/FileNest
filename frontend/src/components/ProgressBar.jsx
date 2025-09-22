import React from 'react'
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar=({usedStorage})=>{
    return(
      <div className='progressCard text-white bg-sky-500 w-full h-50 flex justify-around px-2 items-center border-gray-800 rounded-xl'>
          <div style={{
              height:"10rem",
              width:"10rem",
          }}>
              <CircularProgressbar value={((usedStorage/1000000000)*100).toFixed(2)} text={`${((usedStorage/1000000000)*100).toFixed(2)}%`} styles={buildStyles({
              textColor:"white",
              trailColor:"#7dd3fc",
              pathColor:"white"
              })}/>
          </div>
          <div className='flex flex-col gap-2 items-center w-1/2'>
            <h1 className='text-2xl'>{`${((usedStorage/1000000000)*100).toFixed(2)}% storage used.`}</h1>
            <p className='tracking-tighter text-sm'>You have <span className='font-semibold text-lg'>{((1000000000-usedStorage)/1000000).toFixed(2)} MB</span> of space left.</p>
          </div>
      </div>
    )
}

export default ProgressBar;