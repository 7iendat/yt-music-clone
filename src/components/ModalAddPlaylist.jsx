import React, { useEffect,useContext, useState } from "react";

import Modal from "react-modal";
import "./ModalAddPlaylist.css";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../Context/AuthProvider";
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

const ModalAddPlaylist = (props) => {
  const [namePlaylist, setNamePlaylist] = useState("");
  const user = useContext(AuthContext);
  const afterCloseModal = () => {
    setNamePlaylist("");
    props.handleCloseModal();
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");

    try {
      if (access_token) {
        const response = await axiosClient.post(`/playlist`,
          {
              title: `${namePlaylist}`,
              userId: `${user.id}`
          },
        );
        // console.log("Playlist created:", response.data);
        alert("Tạo playlist thành công!");
        props.handleCloseModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Tạo playlist thất bài!");
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
        Tạo danh sách phát mới
      </h2>
      {/* <button onClick={closeModal}>close</button> */}

      <form onSubmit={handleCreatePlaylist}>
        <label style={{ marginBottom: "15px" }}>Nhập tên playlist: </label>
        <input
          className="input-name"
          type="text"
          value={namePlaylist}
          onChange={(e) => setNamePlaylist(e.target.value)}
        />
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
        <button type="submit" className="btn" onClick={handleCreatePlaylist}>
          Tạo
        </button>
        <button className="btn" onClick={afterCloseModal}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddPlaylist;
