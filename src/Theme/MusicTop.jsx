import React from 'react'
import { songs } from '../utils/songs'
import "./Trending.css"
import Song from './Song'
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
      {songs?.map((isong) => (
         <div className=''>
          <Song title={isong.title} link={isong.link} icon={isong.icon} cover={isong.cover} singer={isong.singer}/>
         </div>
        ))}
      </div>
    </div>
  )
}

export default MusicTop