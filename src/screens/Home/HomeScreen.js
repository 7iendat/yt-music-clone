import MusicTop from "../../Theme/MusicTop";
import Records from "../../Theme/Records";
import React, { useState, useEffect } from "react";

import Theme from "../../Theme/Theme";
import Trending from "../../Theme/Trending";
import "./HomeScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
const HomeScreen = () => {
  const frequently = "Chào mừng";
  const recommend = "Video nhạc đề xuất";
  const trending = "Các bài hát thịnh hành";
  const disc = "Đĩa nhạc đề xuất";

  const [dataMusicPopular, setDataMusicPopular] = useState([]);
  const key = process.env.REACT_APP_API_KEY;
  console.log(key);
  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&key=${key}&regionCode=VN&maxResults=25&videoCategoryId=10`
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
            <li>
              <Link to="/topic/country">Country</Link>
            </li>
            <li>
              <Link to="/topic/classical">Classical music</Link>
            </li>
            <li>
              <Link to="/topic/electronic">Electronic</Link>
            </li>
            <li>
              <Link to="/topic/hiphop">Hip hop</Link>
            </li>
            <li>
              <Link to="/topic/jazz">Jazz</Link>
            </li>
            <li>
              <Link to="/topic/pop">Pop music</Link>
            </li>
            <li>
              <Link to="/topic/r&b">Rhythm and blues</Link>
            </li>
            <li>
              <Link to="/topic/rock">Rock music</Link>
            </li>
            <li>
              <Link to="/topic/soul"> Soul music</Link>
            </li>
          </ul>
        </nav>

        <Trending />
        <Records />
        <MusicTop />
        <Theme title={frequently} />
        <Theme title={recommend} />
        <Theme title={trending} dataMusicPopular={dataMusicPopular} />
        <Theme title={disc} />
      </div>
    </div>
  );
};

export default HomeScreen;
