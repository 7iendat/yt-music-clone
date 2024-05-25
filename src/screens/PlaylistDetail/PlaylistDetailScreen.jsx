import { useEffect, useState } from "react";
import "./PlaylistDetailScreen.css";
import axios from "axios";
import Song from "../../components/Song";
import { useLocation } from "react-router-dom";
import DialogDeletePlaylist from "./DialogDeletePlaylist";
import axiosClient from "../../api/axiosClient";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import  UpdateTitlePlaylist  from "./ButtonModalPlaylist";
import { RiDeleteBin6Line } from "react-icons/ri";

const PlaylistDetailScreen = () => {
  const [dataPlaylistItems, setDataPlaylistItems] = useState([]);

  const location = useLocation();
  const { playlistId, title } = location.state;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    async function fecthData() {
      let res = await axiosClient.get(`/playlists/playlistItem/${playlistId}`);
      setDataPlaylistItems(res.data);
    }

    fecthData();
  }, [playlistId]);
  // console.log("item playlist" , dataPlaylistItems)
  return (
    // <div className="playlistdetail-screen">
    <div className="home-screen pl-[80px] text-white px-10  max-w-[78vw]  mx-auto ">
      {dataPlaylistItems.length > 0 ? (
        <div className="playlist-item">
          {/* <h2 style={{ fontSize: "24px" }}>Danh sách phát</h2> */}
          <div className="flex p-10">
            <div className="pr-12">
              <img
                src={`${dataPlaylistItems[0]?.music.thumbnails}  `}
                alt=""
                className="w-[370px] h-[240px] overflow-visible border-none bg-center bg-no-repeat bg-cover"
              />
            </div>
            <div className="pt-6">
              <div className="text-[40px] font-medium ">{title}</div>
              {/* <div>{user}</div> */}
              <div className="flex pt-10">
                <button
                  onClick={openModal}
                  className="flex items-center text-[14px] px-4 py-2 text-white rounded-full border-solid border border-white/35 font-normal hover:bg-gray-800 "
                >
                  <MdEdit className="mr-2 text-[18px] " />
                  Chỉnh sửa danh sách phát
                </button>
                <UpdateTitlePlaylist
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                  playlistId={playlistId}
                  title={title}
                />

                <button onClick={handleOpenModal} className="">
                  <RiDeleteBin6Line className="text-[20px] ml-4" />
                </button>
                <DialogDeletePlaylist
                  idPlaylist={playlistId}
                  isOpen={isOpen}
                  handleCloseModal={handleCloseModal}
                />
              </div>
            </div>
          </div>
          <div>
            {dataPlaylistItems?.map((item, index) => {
              return (
                <Song
                  key={index}
                  item={item}
                  playlistItem={dataPlaylistItems}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <h1 style={{ color: "white" }}>
            Danh sách phát rỗng! Hãy tạo ngay nào!!!
          </h1>
          <div onClick={handleOpenModal} className="btn-delete-Playlist">
            Xóa playlist
          </div>
          <DialogDeletePlaylist
            idPlaylist={playlistId}
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
          />
        </>
      )}
    </div>
  );
};

export default PlaylistDetailScreen;
