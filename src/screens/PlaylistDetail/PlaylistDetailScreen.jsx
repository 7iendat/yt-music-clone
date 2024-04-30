import { useEffect, useState } from "react";
import "./PlaylistDetailScreen.css";
import axios from "axios";
import Song from "../../components/Song";
import { useLocation, useNavigate } from "react-router-dom";
import DialogDeletePlaylist from "./DialogDeletePlaylist";
import axiosClient from "../../api/axiosClient";

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
      let res = await axiosClient.get(`/playlistItems`
        // `/playlistItems/${playlistId}`
      );

      setDataPlaylistItems(res.data);
    }

    fecthData();
  }, [playlistId]);

  return (
    <div className="playlistdetail-screen">
      {dataPlaylistItems.length > 0 ? (
        <div className="playlist-item">
          <h2 style={{ fontSize: "24px" }}>Danh sách phát</h2>
          {dataPlaylistItems.map((item, index) => {
            return <Song key={index} item={item} playlistItem = {dataPlaylistItems} />;
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
