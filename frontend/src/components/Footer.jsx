import React from 'react';

const Footer=()=>{
  return(
    <div className="footer w-40 h-40 flex flex-col items-center self-center">
        <img className="object-cover" src="/folder.png" alt="" />
        <a href="http://github/abdulghanisheikh" className='text-sky-950 text-xs mt-2'>Github</a>
        <a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-xs'>ghanisheikh26@gmail.com</a>
    </div>
  )
}

export default Footer;