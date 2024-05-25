import React, {useState} from "react";
import Modal from "react-modal";
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
  export const UpdateTitlePlaylist = (props) => {
    
  return (
    <div>
        <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
    >
      <h2>Modal Title</h2>
      <div>Modal Body</div>
      <button
        onClick={props.closeModal}
        className="px-4 py-2 mt-4 bg-red-500 text-white rounded"
      >
        Close
      </button>
    </Modal>
    </div>
  );
};


export default UpdateTitlePlaylist;
