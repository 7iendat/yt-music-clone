import React from 'react'
import { songs } from '../utils/songs'
import "./Trending.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const MusicTop = () => {



  return (
    <div className='text-white  max-w-[70vw]  mx-auto mt-8  '>
      {/*Title  */}
      <div className=''>
        <div>
          <p className='text-[32px] font-bold'>Video nhạc hàng đầu</p>
        </div>
      </div>
      {/* Songs */}
      <div className='grid grid-cols-3 gap-3 mt-4 pl-[20px] py-5 pb-20'>
        {songs?.map((isong, isonges) => (
          <div className=" ">
            <Link to={isong.link} className='hover:bg-slate-600 rounded-md p-2 flex items-center justify-start  mr-5 relative group'>
              <div className='flex h-full relative justify-center items-center '>
                <img src={isong.cover} alt="" className='w-24 h-12 rounded-sm object-cover  bg-white  relative border border-gray-800' />
                <div className="overflow-hidden hidden  absolute group-hover:block transition-all" ><FontAwesomeIcon icon={isong.icon}/></div>
              </div>
              <div className='cursor-pointer pl-5 text-start -my-21 w-full h-full bg-transparent'>
                  
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

export default MusicTop