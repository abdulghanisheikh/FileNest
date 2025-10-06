import React from 'react';

const Footer=()=>{
  return(
    <div className="footer w-40 h-40 gap-5 flex flex-col items-center self-center">
        <img className="object-cover" src="/folder.png" alt="" />
        <div className='flex justify-center items-center gap-2 font-semibold'>
          <a href="http://github/abdulghanisheikh" className='text-sky-950 text-xs underline'>Github</a>
          <a href="mailto:ghanisheikh26@gmail.com" className='text-sky-950 text-xs underline'>ghanisheikh26@gmail.com</a>
        </div>
    </div>
  )
}

export default Footer;