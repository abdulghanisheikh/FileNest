import React from 'react';

const History=()=>{
  return (
    <div className='history bg-white rounded-xl p-2 flex flex-col h-full w-1/2 gap-2 py-5'>
        <h1 className='text-3xl'>Recent Files Uploaded</h1>
        <div className='flex flex-col gap-1'>
            <div className='w-full h-15 rounded-xl border border-gray-800'></div>
        </div>
    </div>
  )
}

export default History;