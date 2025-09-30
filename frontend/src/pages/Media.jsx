import React from 'react';
import {ToastContainer} from "react-toastify";
import NavButton from "../components/NavButton";
import Navbar from "../components/Navbar";

const Media=()=>{
  return(
    <div className='flex w-full min-h-screen gap-5'>
			<div className='flex flex-col w-[20%] gap-10 px-2 h-full'>
			<h1 className='text-4xl text-sky-950'>FileNest</h1>
			<div className='sidebar flex flex-col gap-5'>
				<NavButton name="Dashboard" to="/dashboard" bg="white"/>
				<NavButton name="Documents" to="/documents" bg="white" />
				<NavButton name="Images" to="/images" bg="white" />
				<NavButton name="Video, Audio" to="/media" bg="sky" />
				<NavButton name="Others" to="/others" bg="white" />
			</div>
			<div className="w-40 h-40 flex flex-col items-center self-center">
				<img className="object-cover" src="/folder.png" alt="" />
				<a href="http://github/abdulghanisheikh" className='text-sky-950 text-sm mt-2'>Github</a>
				<a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-sm'>ghanisheikh26@gmail.com</a>
			</div>
			</div>
			<div className='flex flex-col min-h-screen w-[80%] rounded-md gap-2'>
				<Navbar />
				<div className='main flex flex-col px-3 py-2 gap-5 bg-sky-100 rounded-md min-h-screen justify-around'>
					<h1 className="text-4xl">Images.</h1>
					<div className='flex gap-2 flex-wrap justify-start h-full w-full'>
					</div>
				</div>
			</div>
			<ToastContainer position="top-right"/>
	</div>
  )
}

export default Media;