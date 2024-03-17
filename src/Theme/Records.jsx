import React from 'react'
import { recordes } from '../utils/records'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Records.css"
const Records = () => {
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
          {recordes?.map((songs) => (
            <div className=''>
              <Link to={songs.link} className='  mr-1'>
                <div className=''>
                  <img src={songs.cover} alt='' className='' />
                  <div className=''>
                    <FontAwesomeIcon icon={songs.icon} />
                  </div>
                </div>
                <div className=''>
                  <p className='w-40 text-wrap'>{songs.title}</p>
                  <Link to='/Tac-gia'><p className='hover:underline ' >{songs.singer}</p></Link>
                  
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