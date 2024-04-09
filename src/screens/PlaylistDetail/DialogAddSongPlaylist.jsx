import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import "../../components/ModalAddPlaylist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
  const history = useNavigate();
  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const key = process.env.REACT_APP_API_KEY;
  const access_token = localStorage.getItem("access_token");
  const idSong = props.idSong;
  const afterCloseModal = () => {
    setSelectedPlaylist([]);
    props.handleCloseModal();
  };

  // ham check box
  const handleChecked = (playlistId) => {
    setSelectedPlaylist(prev =>{
      const isChecked =  selectedPlaylist.includes(playlistId);
      if(isChecked){
        return selectedPlaylist.filter(id => id !== playlistId)
      }else{
        return [...prev,playlistId]
      }
    })
  }
  // http get
  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=20&mine=true&key=${key}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }

      )
      setDataPlaylist(res.data.items)

    };
    fecthData();
  }, [])
console.log("kkk",idSong)
console.log("kkk",selectedPlaylist)
  //http Post
  const handleAddSongPlaylist = async (e) => {
    e.preventDefault();
    
    
    try {
      
      if (access_token) {
      
          let res = await axios.post(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}`,
            {
              snippet: {
                playlistId: `${selectedPlaylist}`,
                resourceId: {
                  kind: 'youtube#video',
                  videoId: `${idSong}`
                }
              }
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
              },
            }
          );
          
        setDataPlaylist([res.data, ...dataPlaylist]);
        console.log("Playlist created:", res.data);
        alert("Thêm vào playlist thành công!");
        props.handleCloseModal();
        history("/");
        window.location.reload();
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
      // onRequestClose={closeModal}
      style={customStyles}
    >
      <h2
        ref={(_subtitle) => (subtitle = _subtitle)}
        style={{ marginBottom: "10px", fontSize: "20px", color: "white" }}
      >
        Thêm Vào playlist
      </h2>
      {/* <button onClick={closeModal}>close</button> */}

      <form onSubmit={handleAddSongPlaylist}>
        {dataPlaylist?.map((addMusicPlaylist) => (
          <div key={addMusicPlaylist.id}>
            <label className=" text-white flex" >
              <input
                type="checkbox"
                checked={selectedPlaylist.includes(addMusicPlaylist.id)}
                onChange={() => handleChecked(addMusicPlaylist.id)}
              />
              {addMusicPlaylist.snippet.title}
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
        <button type="submit" className="btn" onClick={handleAddSongPlaylist} >Thêm</button>
        <button className="btn" onClick={afterCloseModal}>Hủy</button>
      </div>

    </Modal>
  );
};

export default DialogAddSongPlaylist;
