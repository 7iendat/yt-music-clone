import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { BiStation } from "react-icons/bi";
import SongList from '../../Theme/SongList';
import covera from "../../accests/images/unnamed.jpg"
import Theme from '../../Theme/Theme';
import "./Author.css"
import axios from "axios";
const Author = () => {
  const trending = "Các bài hát thịnh hành";

  const [dataMusicPopular, setDataMusicPopular] = useState([]);

  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&key=AIzaSyCicMJd8w0G5XfYdqXpTK-ITzg4WaIdl74&regionCode=VN&maxResults=25&videoCategoryId=10"
      );

      setDataMusicPopular(res.data.items);
    }

    fecthData();
  }, []);
  return (

    <div className='container authour-container  w-full '>

      <div className='relative'>
        <div className=''>
          <img src={covera} alt="" className=' h-full w-full opacity-50' />
        </div>
        <div className=' px-[96px] absolute bottom-[30px]  text-white '>
          <div className=''>
            <h1 className='text-[32px] leading-[2.5] items-center font-bold mb-2 '>Hòa Minzy</h1>
            <p className='text-wrap w-[85%] text-[14px] font-medium mb-6'>Nguyễn Thị Hòa, thường được biết đến với nghệ danh Hòa Minzy, sinh năm 1995, là một nữ ca sĩ kiêm diễn viên người Việt Nam.</p>
          </div>

          <div className='flex bg-transparent  '>
            <div className='btn-author-banner text-black mr-2'><button >
              <FontAwesomeIcon icon={faShuffle} className='mr-2 text-[20px] font-extralight' /> Trộn Bài</button></div>
            <div className='btn-author-banner text-black mr-2'><button className='flex items-center' ><div className='mr-2 text-[20px] font-extralight'><BiStation /></div>Đài Phát</button></div>
            <div className='btn-author-subscribe text-[#ff0000] '><button >Đăng Kí 1,74 Tr</button></div>
          </div>
        </div>

      </div>


      {/* Bài Hát Theo Tác Giả */}
      <div className=' px-[96px]'>
        <SongList />
        <div className='mt-10'>
        <Theme title={trending} dataMusicPopular={dataMusicPopular} />
        </div>
      </div>
    </div>

  )
}

export default Author