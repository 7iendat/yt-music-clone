import React from 'react'
import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <div className='container text-white'>
            
            <div >Không Tồn Tại Trang Này</div>
            <div  ><Link to="/">Quay Về Trang Chủ </Link></div>
        </div>
    )
}

export default NotFound