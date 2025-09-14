import React from 'react'
import {Link} from "react-router-dom";

const Dashboard=()=>{
  return(
    <>
    <div className='flex w-full min-h-screen p-5'>
      <div className='flex flex-col w-[20%] gap-10 h-full'>
        <h1 className='text-4xl self-center text-sky-950'>FileNest</h1>
        <div className='flex flex-col gap-5'>
          <Link to="/dashboard">
            <div className='p-3 rounded-full bg-sky-500 text-center text-white'>Dashboard</div>
          </Link>
          <Link to="/dashboard">
            <div className='p-3 rounded-full bg-sky-500 text-center text-white'>Document</div>
          </Link>
          <Link to="/dashboard">
            <div className='p-3 rounded-full bg-sky-500 text-center text-white'>Images</div>
          </Link>
          <Link to="/dashboard">
            <div className='p-3 rounded-full bg-sky-500 text-center text-white'>Media</div>
          </Link>
          <Link to="/dashboard">
            <div className='p-3 rounded-full bg-sky-500 text-center text-white'>Others</div>
          </Link>
        </div>
          <div className="w-40 h-40 flex flex-col items-center self-center">
            <img className="object-cover" src="/file-pic.png" alt=""/>
            <a href="http://github/abdulghanisheikh" className='text-sky-950 text-sm'>Github</a>
            <a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-sm'>ghanisheikh26@gmail.com</a>
          </div>
      </div>
      <div className='flex w-[80%]'>
      </div>
    </div>
    </>
  )
}

export default Dashboard;