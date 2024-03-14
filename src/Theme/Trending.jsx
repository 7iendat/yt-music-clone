import React from 'react'
import { songs } from '../utils/songs'
import "./Trending.css"
import { Link } from 'react-router-dom'

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
        {songs.map((isong, isonges) => (
          <div className=" ">
            <Link to={isong.link} className='set-item-hover flex items-center justify-start  mr-10'>
              <div className='flex h-full '>
                <img src={isong.cover} alt="" className='w-24 object-cover  bg-white' />
              </div>
              <div className='pl-5 text-start -my-21 w-full h-full bg-transparent hover:bg-zinc-700 '>

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