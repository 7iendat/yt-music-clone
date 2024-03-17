import React, { useEffect, useState } from "react";
import "./SearchMusic.css";
import { useParams } from "react-router-dom";
import Song from "../../components/Song";
import axios from "axios";

const SearchMusic = () => {
  const [dataSongSearched, setdataSongSearched] = useState([]);

  const { keySearch } = useParams();
  console.log(keySearch);

  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCicMJd8w0G5XfYdqXpTK-ITzg4WaIdl74&part=snippet&q=${keySearch}&categoryId=10&maxResults=24&type=video&regionCode=VN`
      );

      setdataSongSearched(res.data.items);
    }

    fecthData();
  }, [keySearch]);

  console.log("dataSongSearched", dataSongSearched);
  return (
    <div className="search-screen">
      <h2 style={{ fontSize: "24px" }}>Kết quả tìm kiếm:</h2>
      {dataSongSearched.map((item, index) => {
        return <Song key={index} item={item} />;
      })}
    </div>
  );
};

export default SearchMusic;
