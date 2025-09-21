import React from 'react'
import { IoDocuments } from 'react-icons/io5';
import { PiImages } from 'react-icons/pi';
import { FiVideo } from 'react-icons/fi';
import { FaChartPie } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const NavButton=({name,to,bg})=>{
    function renderIcon(){
        if(name==="Documents"){
            return <IoDocuments size={22} />
        }
        else if(name==="Dashboard"){
            return <LuLayoutDashboard size={22} />
        }
        else if(name==="Images"){
            return <PiImages size={22} />
        }
        else if(name==="Media"){
            return <FiVideo size={22} />
        }
        else return <FaChartPie size={22} />
    }
    return(
        <Link to={to}>
            <div className={`p-3 rounded-full flex items-center justify-center gap-1 ${bg==="sky"?"bg-sky-600 text-white":"bg-white text-black"} text-center shadow-md shadow-black/30`}>
            {renderIcon()}
            <p>{name}</p>
            </div>
        </Link>
    )
}

export default NavButton;