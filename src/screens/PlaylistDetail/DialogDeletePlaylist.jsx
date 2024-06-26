import React from "react";

import Modal from "react-modal";
import "../../components/ModalAddPlaylist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

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

const DialogDeletePlaylist = (props) => {
  const history = useNavigate();
  const idPlaylist = props.idPlaylist;
  const afterCloseModal = () => {
    props.handleCloseModal();
  };

  const handleDeletePlaylist = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");

    try {
      if (access_token) {
        
        await axiosClient.delete(
          `/playlistDelete/${idPlaylist}`
        );
        await axiosClient.delete(
          `/playlist/${idPlaylist}`
        );

        alert("Xóa playlist thành công!");
        props.handleCloseModal();
        history("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Xóa playlist thất bài!");
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
        Xoa danh sách phát
      </h2>
      {/* <button onClick={closeModal}>close</button> */}

      <form onSubmit={handleDeletePlaylist}>
        <label style={{ marginBottom: "15px" }}>
          Bạn chắn chắc muốn xóa playlist?{" "}
        </label>
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
        <button type="submit" className="btn" onClick={handleDeletePlaylist}>
          Xóa
        </button>
        <button className="btn" onClick={afterCloseModal}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default DialogDeletePlaylist;
