import { useEffect, useState } from "react";
import "./PlaylistDetailScreen.css";
import axios from "axios";
import Song from "../../components/Song";
import { useLocation, useNavigate } from "react-router-dom";
import DialogDeletePlaylist from "./DialogDeletePlaylist";

const PlaylistDetailScreen = () => {
  const access_token = localStorage.getItem("access_token");

  const key = process.env.REACT_APP_API_KEY;
  const [dataPlaylistItems, setDataPlaylistItems] = useState([]);

  const location = useLocation();
  const { playlistId } = location.state;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
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
  }, [playlistId]);

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
          <h1 style={{ color: "white" }}>
            Danh sách phát rỗng! Hãy tạo ngay nào!!!
          </h1>
        </>
      )}
      <div onClick={handleOpenModal} className="btn-delete-Playlist">
        Xóa playlist
      </div>
      <DialogDeletePlaylist
        idPlaylist={playlistId}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default PlaylistDetailScreen;
