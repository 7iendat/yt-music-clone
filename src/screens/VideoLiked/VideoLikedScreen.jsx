import { useContext,useEffect, useState } from "react";
import "./VideoLikedScreen.css";
import axios from "axios";
import Song from "../../components/Song";
import { AuthContext } from "../../Context/AuthProvider";
import axiosClient from "../../api/axiosClient";

const VideoLikedScreen = () => {
  const access_token = localStorage.getItem("access_token");

  const key = process.env.REACT_APP_API_KEY;

  const [videoLiked, setVideoLiked] = useState([]);
  const [dataLikedPlaylist, setLikedDataPlaylist] = useState([]);

  const user = useContext(AuthContext);
  console.log("USER", user);
  console.log("USER ID", user.id);

  async function fetchDataLikedPlaylist(){
    try{
      let result = await axios.get(
        `http://localhost:5050/playlists/liked/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("RESULT", result.data);
      setLikedDataPlaylist(result.data);
    }catch (error){
      console.log("error fetchLikedPlaylist");
    }
  }
  
  async function fecthData() {
    if(dataLikedPlaylist.length > 0){
      let res = await axiosClient.get(`/playlists/playlistItem/${dataLikedPlaylist[0].id}`);
      console.log("SONG LIKED", res);
      if(res.data.length > 0){
        setVideoLiked(res.data);
      }
    }
  }

  useEffect(() => {

    fetchDataLikedPlaylist();
    // fecthData();
  }, []);

  useEffect(() => {
    fecthData();
  })

  console.log("MY LOVE", videoLiked);

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
