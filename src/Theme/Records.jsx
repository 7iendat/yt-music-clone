import React from 'react'
import { recordes } from '../utils/records'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Records.css"
import axios from 'axios'
const Records = (props) => {
  const key = process.env.REACT_APP_API_KEY;
  return (
    <div className='text-white  max-w-[70vw]  mx-auto mt-8  '>
      {/*Title  */}
      <div className=''>
        <div>
          <p className='text-[32px] font-bold'>Đĩa đơn và đĩa nhạc mới</p>
        </div>
      </div>
      {/* Music */}
      <div className='w-[94%] h-full mx-auto my-0 mt-6  ml-6'>
        {/*   */}
        <div className='category-div categories-scoll Records-scrollbox '>
          {props.songRecord?.map((songs) => (
            <div className=''>
              <Link to={songs.link} className='  mr-1 group relative'>
                <div className='relative'>
                  <img src={songs.snippet.thumbnails.standard.url} alt='' className='' />
                  <div className='absolute bottom-[20%] right-[10%] overflow-hidden hidden  w-[35px] h-[35px] bg-black border-[1px] border-solid border-stone-800 rounded-full  group-hover:block'>
                    <FontAwesomeIcon icon={songs.icon} className='pl-3 pt-2'/>
                  </div>
                </div>
                <div className=''>
                  <p className='w-40 text-wrap'>{songs.snippet.title}</p>
                  <Link to='/'><p className='hover:underline ' >{songs.singer}</p></Link>
                  
                </div>

              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Records