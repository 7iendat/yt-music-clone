import React from 'react'
import { Link } from 'react-router-dom'
import { songList } from '../utils/songList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const SongList = () => {
    return (

        <div className='text-white mt-10'>
            <div className='text-[25px] leading-[2] items-center font-bold mb-2'>
                <p >Bài Hát</p>
            </div>
            <div className='w-full'>

                {songList.map((songlist) => (

                    <Link to={songlist.link} className="flex items-center mt-2  justify-start   relative group border-b-[0.5px] border-b-slate-400/20">
                        <div className='h-full relative  items-center '>
                            <img src={songlist.image} alt="" className='w-14  rounded-sm object-cover  bg-white  relative border border-gray-800 group-hover:opacity-30' />
                            <div className='overflow-hidden hidden absolute bottom-[36%] left-[40%] z-100 group-hover:block  transition-all' >
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        </div>
                        <div className='ml-8 text-[16px] w-[37%] font-medium '><span>{songlist.title}</span></div>
                        <div className='truncate  text-[16px] w-[14%]'><span>{songlist.author}</span></div>
                        <div className='text-[16px] w-[14%]'><span>{songlist.view}</span></div>
                        <div className='text-[16px] w-[20%] '><Link to={songlist.linkList}><span className='hover:underline '>{songlist.nameList}</span></Link></div>
                    </Link>

                ))}

            </div>
        </div>
    )
}

export default SongList