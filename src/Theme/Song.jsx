import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Song = ({title, link, cover, icon, singer}) => {
  return (
    <div>
         <div className=" ">
            <Link to={link} className='hover:bg-slate-600 rounded-md p-2 flex items-center justify-start  mr-5 relative group'>
              <div className='flex h-full relative justify-center items-center '>
                <img src={cover} alt="" className='w-24 h-12 rounded-sm object-cover  bg-white  relative border border-gray-800' />
                <div className="overflow-hidden hidden  absolute group-hover:block transition-all" ><FontAwesomeIcon icon={icon}/></div>
              </div>
              <div className='cursor-pointer pl-5 text-start -my-21 w-full h-full bg-transparent'>
                  
                <p className=' text-lg'>{title}</p>
                <p className='text-sm'>{singer}</p>

              </div>
            </Link>
          </div>
    </div>
  )
}

export default Song