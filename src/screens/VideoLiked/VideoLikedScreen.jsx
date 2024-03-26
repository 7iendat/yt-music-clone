import { useEffect, useState } from "react";
import "./VideoLikedScreen.css";
import axios from "axios";
import Song from "../../components/Song";

const VideoLikedScreen = () => {
  const access_token = localStorage.getItem("access_token");

  const key = process.env.REACT_APP_API_KEY;

  const [videoLiked, setVideoLiked] = useState([]);
  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&mine=true&maxResults=25&myRating=like&key=${key}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,

            Accept: `application/json`,
          },
        }
      );

      setVideoLiked(res.data.items);
    }

    fecthData();
  }, []);

  return (
    <div className="video-liked-screen">
      {videoLiked.length > 0 ? (
        <div className="video-liked-item">
          <h2 style={{ fontSize: "24px" }}>Danh sách đã thích</h2>
          {videoLiked.map((item, index) => {
            return <Song key={index} item={item} />;
          })}
        </div>
      ) : (
        <>
          <h1 style={{ color: "white" }}>Bạn chưa thích video nào !</h1>
        </>
      )}
    </div>
  );
};

export default VideoLikedScreen;
