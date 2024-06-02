import React, { useEffect, useId, useState } from "react";

import Modal from "react-modal";
import "../../components/ModalAddPlaylist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import Song from "../../Theme/Song";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
    position: "absolute",
    backgroundColor: "rgb(84 84 84)",
    color: "white",
  },
};
let subtitle;
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = "#f00";
}

const DialogAddSongPlaylist = (props) => {
  // const history = useNavigate();
  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [addPlaylist, setAddPlaylist ] = useState([]);
  const [saveMusic, setSaveMusic] = useState("");
  const key = process.env.REACT_APP_API_KEY;
  const access_token = localStorage.getItem("access_token");
  // const idSong = props.idSong;
  //  const videoID = props.videoId;

  const afterCloseModal = () => {
    setSelectedPlaylist([]);
    props.handleCloseModal();
  };

  // ham check box
  const handleChecked = (playlistId) => {
    console.log('id playlist: ',playlistId)
    setSelectedPlaylist((prev) => {
      const isChecked = selectedPlaylist.includes(playlistId);
      if (isChecked) {
        return selectedPlaylist.filter((id) => id !== playlistId);
      } else {
        return [...prev, playlistId];
      }
    });
  };
  // http get
  useEffect(() => {
    async function fecthData() {
      let res = await axiosClient.get(`/playlists`);
      setDataPlaylist(res.data);
    }
    fecthData();
  }, []);


  //http Post
  const handleAddSongPlaylist = async (e) => {
    e.preventDefault();
    try {
      if (access_token) {
        
        let response = await axiosClient.post(`/music`, {
          videoId: `${props.Song.id}`,
          channelId:  `${props.Song.snippet.channelId}`,
          title:`${ props.Song.snippet.title}`,
          description: `${props.Song.snippet.description}`,
          thumbnails:`${props.Song.snippet.thumbnails.standard.url}` ,
          channelTitle:`${props.Song.snippet.channelTitle}` 
        });
        setSaveMusic ([response.data, ...saveMusic]);
        console.log("Thêm bài hát  thành công!");
        const newMusic = response.data;
        console.log("id song : ",newMusic.id);
        console.log("id song 1 : ",selectedPlaylist);


        let res = await axiosClient.post(`/playlistItems`, {
          playlistId: `${selectedPlaylist}`,
          musicId: `${newMusic.id}`,
        });
        setAddPlaylist([res.data, ...addPlaylist]);
        alert("Thêm vào playlist thành công!");
        props.handleCloseModal();
      }
    } catch (error) {
      console.log(error);
      alert("Thêm  vào playlist thất bài!");
    }
  };
 

  return (
    <Modal
      afterOpenModal={afterOpenModal}
      isOpen={props.isOpen}
      style={customStyles}
    >
      <h2
        ref={(_subtitle) => (subtitle = _subtitle)}
        style={{ marginBottom: "10px", fontSize: "20px", color: "white" }}
      >
        Thêm Vào playlist
      </h2>

      <form onSubmit={handleAddSongPlaylist}>
        {dataPlaylist?.map((item,index) => (
          <div >
            <label className=" text-white flex">
              <input
                type="checkbox"
                checked={selectedPlaylist.includes(item.id)}
                onChange={() => handleChecked(item.id)}
              />
              {item.title}
            </label>
          </div>
        ))}
      </form>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button type="submit" className="btn" onClick={handleAddSongPlaylist}>
          Thêm
        </button>
        <button className="btn" onClick={afterCloseModal}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default DialogAddSongPlaylist;
