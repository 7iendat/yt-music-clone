import { useEffect, useState } from "react";
import "./PlaylistDetailScreen.css";
import axios from "axios";
import Song from "../../components/Song";
import { useLocation, useNavigate } from "react-router-dom";

const PlaylistDetailScreen = () => {
  const access_token = localStorage.getItem("access_token");
  console.log("Access Token: ", access_token);
  const key = process.env.REACT_APP_API_KEY;
  const [dataPlaylistItems, setDataPlaylistItems] = useState([]);

  const location = useLocation();
  const {playlistId} = location.state;
  console.log("PLAYLIST ID", playlistId);

  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,

            Accept: `application/json`,
          },
        }
      );

      setDataPlaylistItems(res.data.items);
    }

    fecthData();
  }, []);
  console.log("PLAYLIST", dataPlaylistItems);

  return (
    <div className="playlistdetail-screen">
      {dataPlaylistItems.length > 0 ? (
        <div className="playlist-item">
          <h2 style={{ fontSize: "24px" }}>Danh sách phát</h2>
          {dataPlaylistItems.map((item, index) => {
            return <Song key={index} item={item} />;
          })}
        </div>
      ) : (
        <>
          <h1 style={{ color: "white" }}>Danh sách phát rỗng! Hãy tạo ngay nào!!!</h1>
        </>
      )}
    </div>
  );
};

export default PlaylistDetailScreen;
