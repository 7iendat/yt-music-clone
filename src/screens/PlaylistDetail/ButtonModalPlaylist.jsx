import React, {useState} from "react";
import Modal from "react-modal";
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
      backgroundColor: "rgb(44 44 44)",
      color: "white",
     
    },
  };
  let subtitle;
 const UpdateTitlePlaylist = (props) => {
    const [namePlaylist, setNamePlaylist] = useState("");



  const handleUpdatePlaylist = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");

    try {
      if (access_token) {
        const res = await axiosClient.put(`/playlist/${props.playlistId}`,
          {
              title: `${namePlaylist}`,
          },
        );
        // console.log("Playlist created:", response.data);
        alert("Sửa playlist thành công!");
        props.closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Sửa playlist thất bài!");
    }
  };
  return (
    <div>
        <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
    >
      <h2
        ref={(_subtitle) => (subtitle = _subtitle )}
        className="mb-[10px] text-[20px] text-white"
      >
        {props.title}
      </h2>
      {/* <button onClick={closeModal}>close</button> */}

      <form onSubmit={handleUpdatePlaylist}>
        <label className='mb-[15px] ' >Tiêu Đề: </label><br></br>
        <input
          className="mt-2 p-1 block w-full bg-gray-900 border-0 border-b border-gray-600 focus:ring-0 focus:border-gray-500 text-white placeholder-gray-500"
          type="text"
          value={namePlaylist}
          onChange={(e) => setNamePlaylist(e.target.value)}
          
        />
      </form>
      <div className="w-full flex items-center justify-between mt-5">
        <button className="btn"  onClick={props.closeModal}> Hủy </button>
        <button onClick={handleUpdatePlaylist} type="submit" className="btn hover:bg-slate-700 text-black bg-white font-medium ml-4" >
          Lưu
        </button>
      </div>
    </Modal>
    </div>
  );
};


export default UpdateTitlePlaylist;
