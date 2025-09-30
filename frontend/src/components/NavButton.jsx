import React from 'react'
import { FcDocument } from "react-icons/fc";
import { FaImage } from "react-icons/fa";
import { TiMediaFastForwardOutline } from "react-icons/ti";
import { PiChartPie } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavButton=({name,to,bg})=>{
    function renderIcon(){
        if(name==="Documents"){
            return <FcDocument size={22} />
        }
        else if(name==="Dashboard"){
            return <MdOutlineDashboard size={22} />
        }
        else if(name==="Images"){
            return <FaImage size={22} />
        }
        else if(name==="Video, Audio"){
            return <TiMediaFastForwardOutline size={22} />
        }
        else return <PiChartPie size={22} />
    }
    return(
        <Link to={to}>
            <div className={`p-3 rounded-full flex items-center justify-center gap-1 ${bg==="sky"?"bg-sky-600 text-white shadow-md shadow-black/20":"bg-white text-black"} text-center`}>
            {renderIcon()}
            <p>{name}</p>
            </div>
        </Link>
    )
}

export default NavButton;