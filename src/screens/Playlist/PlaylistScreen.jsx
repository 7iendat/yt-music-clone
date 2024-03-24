import { useEffect, useState } from "react";
import "./PlaylistScreen.css";
import axios from "axios";
import Song from "../../components/Song";

const PlaylistScreen = () => {
  const access_token = localStorage.getItem("access_token");
  console.log("Access Token: ", access_token);
  const key = process.env.REACT_APP_API_KEY;

  const [dataPlaylist, setDataPlaylist] = useState([]);
  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${key}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,

            Accept: `application/json`,
          },
        }
      );

      setDataPlaylist(res.data.items);
    }

    fecthData();
  }, []);

  console.log("PLAYLIST", dataPlaylist);
  return (
    <div className="playlist-screen">
      {dataPlaylist.length > 0 ? (
        <div className="playlist-item">
          <h2 style={{ fontSize: "24px" }}>Danh sách phát</h2>
          {dataPlaylist.map((item, index) => {
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

export default PlaylistScreen;
