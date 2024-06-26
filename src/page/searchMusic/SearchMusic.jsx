import React, { useEffect, useState } from "react";
import "./SearchMusic.css";
import { useParams } from "react-router-dom";
import Song from "../../components/Song";
import axios from "axios";

const SearchMusic = () => {
  const [dataSongSearched, setdataSongSearched] = useState([]);
  const [dataSongSearchedPrev, setdataSongSearchedPrev] = useState([]);

  const { keySearch } = useParams();
  const key = process.env.REACT_APP_API_KEY;

  // console.log("dataSongSearched", dataSongSearched);

  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&q=${keySearch}&categoryId=10&maxResults=24&type=video&regionCode=VN`
      );

      if (JSON.stringify(res.data.items) !== dataSongSearchedPrev) {
        setdataSongSearched(res.data.items);
        setdataSongSearchedPrev(res.data.items);
      }
    }

    fecthData();
  }, []);

  return (
    <div className="search-screen">
      <h2 style={{ fontSize: "24px" }}>Kết quả tìm kiếm:</h2>
      {dataSongSearched.map((item, index) => {
        return <Song 
          key={index} 
          videoId={item.id.videoId} 
          title={item.snippet.title} 
          channelId={item.snippet.channelId} 
          thumbnails={item.snippet.thumbnails.high.url} 
          channelTitle={item.snippet.channelTitle} 
          description={item.snippet.description}
        />;
      })}
    </div>
  );
};

export default SearchMusic;
