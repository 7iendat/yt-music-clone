import React from 'react'
import { songs } from '../utils/songs'
import "./Trending.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Trending = () => {



  return (
    <div className='text-white  max-w-[70vw]  mx-auto mt-8  '>
      {/*Title  */}
      <div className=''>
        <div>
          <p className='text-[16px] -mb-1'>BẮT ĐẦU ĐÀI PHÁT BẰNG MỘT BÀI HÁT</p>
          <p className='text-[32px] font-bold'>Chọn nhanh đài phát</p>
        </div>
      </div>
      {/* Songs */}
      <div className='grid grid-cols-3 gap-3 mt-4 pl-[20px] py-5 pb-20'>
<<<<<<< Updated upstream
        {songs?.map((isong, isonges) => (
          <div className=" ">
            <Link to={isong.link} className='hover:bg-slate-600 rounded-md p-2 flex items-center justify-start  mr-5 relative group'>
              <div className='flex h-full relative justify-center items-center '>
                <img src={isong.cover} alt="" className='w-24 h-12 rounded-sm object-cover  bg-white  relative border border-gray-800' />
                <div className="overflow-hidden hidden  absolute group-hover:block transition-all" ><FontAwesomeIcon icon={isong.icon}/></div>
              </div>
              <div className='cursor-pointer pl-5 text-start -my-21 w-full h-full bg-transparent'>
                  
=======
        {songs.map((isong, isonges) => (
          <div className="set-item-hover flex items-center justify-between  mr-10 ">
            <div className='flex h-full '>
              <img src={isong.cover} alt="" className='w-24 object-cover p-[1px] bg-white' />
            </div>
            <div className='cursor-pointer pr-8 text-end -my-21 w-full h-full bg-transparent hover:bg-blue-900'>
>>>>>>> Stashed changes
                <p className=' text-lg'>{isong.title}</p>
                <p className='text-sm'>{isong.singer}</p>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trending