import React from 'react'
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar=()=>{
  return(
    <div className='progressCard text-white bg-sky-500 w-full h-60 flex justify-around px-2 items-center border-gray-800 rounded-xl'>
        <div style={{
            height:"10rem",
            width:"10rem",
        }}>
            <CircularProgressbar value={66} text="66%" styles={buildStyles({
            textColor:"white",
            trailColor:"#7dd3fc",
            pathColor:"white"
            })}/>
        </div>
        <h1 className='text-2xl'>66% Space Used</h1>
    </div>
  )
}

export default ProgressBar