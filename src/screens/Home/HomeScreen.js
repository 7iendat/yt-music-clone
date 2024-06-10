import React, { useState, useEffect } from "react";

import Theme from "../../Theme/Theme";
import Trending from "../../Theme/Trending";
import "./HomeScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Singers from "../../Theme/Singers";
import BeatLoader from "react-spinners/BeatLoader";
import MusicTop from "../../Theme/MusicTop";
import Album from "../../Theme/Album";
import  axiosClient, { axiosMusic } from "../../api/axiosClient";
const HomeScreen = () => {
  const frequently = "Chào mừng";
  const recommend = "Video nhạc đề xuất";
  const trending = "Các bài hát thịnh hành";
  const disc = "Đĩa nhạc đề xuất";

  const [dataMusicPopular, setDataMusicPopular] = useState([]);
  const [dataMusicPopularPrev, setDataMusicPopularPrev] = useState([]);
  const [songNew, setSongNew] = useState([]);
  const [songRecord, setSongRecord] =useState([])
  const key = process.env.REACT_APP_API_KEY;
  const access_token_spotify = localStorage.getItem("access_token_spotify");
  const [singers, setSingers] = useState([]);

  useEffect(() => {
    async function fecthData() {
      let res = await axiosMusic.get(`/videos?`,
      {
        params: {
          key: key,
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          regionCode: 'VN',
          maxResults:27,
          videoCategoryId: 10
        }
      }
      );

      if (
        JSON.stringify(res.data.items) !== JSON.stringify(dataMusicPopularPrev)
      ) {
        setDataMusicPopular(res.data.items);
        setDataMusicPopularPrev(res.data.items);
      }
    }
    

    fecthData();
    // fecthNewSong();
    // fechRecord();
  }, [dataMusicPopularPrev, songRecord ]);
  const BASE_URL = "https://api.spotify.com/v1";
  const searchArtists = async (accessToken, query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          q: query,
          type: "artist",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.artists.items;
    } catch (error) {
      console.error("Error searching artists:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchDataSinger = async () => {
      if (access_token_spotify) {
        const query = 'genre:"vietnamese pop"';
        const searchResult = await searchArtists(access_token_spotify, query);
        setSingers(searchResult);
      }
    };
    fetchDataSinger();
  }, []);

  // console.log("singers", singers);

  // async function fecthNewSong() {
  //   let res = await axiosMusic.get(`/search`,
  //   {   
  //     params:{
  //       part: 'snippet',
  //       maxResults:30,
  //       order:'viewCount',
  //       publishedAfter: '2024-01-01T00,3A00,3A00Z',
  //       q:'nh,E1,BA,A1c,20m,E1,BB,9Bi',
  //       regionCode:'VN',
  //       type: 'video',
  //       videoDuration:'medium',
  //       key:key
  //     }
  //   }
  // );

  //   setSongNew(res.data.items);
  // }
  
  return (
    <div className="home-screen pl-[80px] text-white px-10  max-w-[78vw]  mx-auto ">
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

        <Trending dataMusicPopular={dataMusicPopular} />
        {singers.length > 0 ? (
          <Singers dataSingers={singers} />
        ) : (
          <BeatLoader
            color="#f90200"
            cssOverride={{
              display: "flex",
              width: "100%",
              // margin: "0 auto",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "red",
            }}
            size={15}
            aria-label="Loading "
            data-testid="loader"
          />
        )}
        {/* <Album /> */}
        <Theme title={trending} dataMusicPopular={dataMusicPopular} />
        {/* <MusicTop songNew={songNew} /> */}
        {/* <Records songRecord={songRecord}/> */}
{/*
        <Theme title={frequently} />
        <Theme title={recommend} />
        <Theme title={disc} /> */}
      </div>
    </div>
  );
};

export default HomeScreen;
