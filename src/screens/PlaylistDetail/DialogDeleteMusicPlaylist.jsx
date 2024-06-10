import React from "react";
import axiosClient from "../../api/axiosClient";
import Modal from "react-modal";
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
const DialogDeleteMusicPlaylist = (props) => {
  const history = useNavigate();
  const afterCloseModal = () => {
    props.handleCloseModal();
  };
  const handleDeleteitemPlaylist = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    try {
      if (access_token) {
        await axiosClient.delete(
          `/api/playlists/${props.playlistId}/music/${props.musicId}`
        );
        alert("Xóa bài hát thành công!");
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
      style={customStyles}
    >
      <h2
        ref={(_subtitle) => (subtitle = _subtitle)}
        style={{
          marginBottom: "10px",
          fontSize: "20px",
          color: "white",
        }}
      >
        Xóa Bài Hát
      </h2>

      <form onSubmit={handleDeleteitemPlaylist}>
        <label style={{ marginBottom: "15px" }}>
          Bạn chắn chắc muốn xóa bài hát?{" "}
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
        <button
          type="submit"
          className="btn"
          onClick={handleDeleteitemPlaylist}
        >
          Xóa
        </button>
        <button className="btn" onClick={afterCloseModal}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default DialogDeleteMusicPlaylist;
