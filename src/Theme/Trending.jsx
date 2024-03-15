import React from 'react'
import { songs } from '../utils/songs'
import Song from './Song'
import "./Trending.css"

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
      {songs?.map((isong) => (
         <div className=''>
          <Song title={isong.title} link={isong.link} icon={isong.icon} cover={isong.cover} singer={isong.singer}/>
         </div>
        ))}
      </div>
    </div>
  )
}

export default Trending