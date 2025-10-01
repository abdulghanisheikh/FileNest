import React from 'react'
import { Link } from 'react-router-dom';

const NavButton=({name,to})=>{
    function renderIcon(){
        if(name==="Documents"){
            return <img src="/documentation.png" alt="" />
        }
        else if(name==="Dashboard"){
            return <img src="/dashboard.png" alt="" />
        }
        else if(name==="Images"){
            return <img src="/gallery.png" alt="" />
        }
        else if(name==="Video, Audio"){
            return <img src="/multimedia.png" alt="" />
        }
        else return <img src="/others.png" alt="" />
    }
    return(
        <Link to={to}>
            <div className={`p-3 rounded-full flex items-center hover:bg-pink-900 hover:text-white duration-500 ease-in-out justify-center gap-1 text-center`}
            >
            <div className='h-6 w-6 rounded-full'>
                {renderIcon()}
            </div>
            <p>{name}</p>
            </div>
        </Link>
    )
}

export default NavButton;