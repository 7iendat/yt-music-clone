import MusicTop from "../../Theme/MusicTop";
import Records from "../../Theme/Records";
import React, { useState, useEffect } from "react";

import Theme from "../../Theme/Theme";
import Trending from "../../Theme/Trending";
import "./HomeScreen.css";
import axios from "axios";
const HomeScreen = () => {
  const frequently = "Chào mừng";
  const recommend = "Video nhạc đề xuất";
  const trending = "Các bài hát thịnh hành";
  const disc = "Đĩa nhạc đề xuất";

  const [dataMusicPopular, setDataMusicPopular] = useState({});

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
    <div className="home-screen pl-[80px] text-white px-10  max-w-[78vw]  mx-auto">
      <div className="">
        <nav className="cat-navbar">
              <ul>
                <li><a href="#">Nạp năng lượng</a></li>
                <li><a href="#">Thư giãn</a></li>
                <li><a href="#">Vui tươi</a></li>
                <li><a href="#">Tập thể dục</a></li>
                <li><a href="#">Trên đường đi làm</a></li>
                <li><a href="#">Tiệc tùng</a></li>
                <li><a href="#">Tập trung</a></li>
                <li><a href="#">Lãng mạn</a></li>
                <li><a href="#">Buồn</a></li>
                <li><a href="#">Dễ ngủ</a></li>
              </ul>
          </nav>
        
        <Trending/>
        <Records/>
        <MusicTop/>
        <Theme title={frequently} />
        <Theme title={recommend} />
        <Theme title={trending} dataMusicPopular={dataMusicPopular} />
        <Theme title={disc} />
      </div>
    </div>
  );
};

export default HomeScreen;
