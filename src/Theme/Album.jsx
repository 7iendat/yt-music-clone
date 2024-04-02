import React from 'react'
// import { recordes } from '../utils/records'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Records.css"
import { albumItems } from '../utils/albums'
const Album = () => {
  return (
    <div className='text-white  max-w-[70vw]  mx-auto mt-8  '>
      {/*Title  */}
      <div className=''>
        <div>
          <p className='text-[32px] font-bold'>Những Album nhạc đình đám</p>
        </div>
      </div>
      {/* Music */}
      <div className='w-[94%] h-full mx-auto my-0 mt-6  ml-6'>
        {/*   */}
        <div className='category-div categories-scoll Records-scrollbox '>
          {albumItems?.map((item) => (
            <div className=''>
              <Link to={item.link} className='mr-1 group relative' state={{infoAlbum: item}}>
                <div className='relative'>
                  <img src={item.cover} alt='' className='w-64 h-32' />
                  <div className='absolute bottom-[20%] right-[10%] overflow-hidden hidden  w-[35px] h-[35px] bg-black border-[1px] border-solid border-stone-800 rounded-full  group-hover:block'>
                    <FontAwesomeIcon icon={item.icon} className='pl-3 pt-2'/>
                  </div>
                </div>
                <div className=''>
                  <p className='w-40 text-wrap font-bold text-center'>{item.title}</p>
                  <p className='text-center font-light' >{item.singer}</p>
                  
                </div>

              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Album