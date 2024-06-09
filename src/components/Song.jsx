import {  useState } from "react";
import "./Song.css";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import DialogDeleteMusicPlaylist from "../screens/PlaylistDetail/DialogDeleteMusicPlaylist"
const Song = (props) => {
  const history = useNavigate();
  const handleClickSongInSearchScreen = () => {
    history(
      `/watch/${props.item.music.videoId}?title=${props.item.music.title}&channel=${props.item.music.channelId}`,
      `/watch/${props.videoId}?title=${props.title}&channel=${props.channelId}`
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex">
      <div className="song w-[90%]" onClick={handleClickSongInSearchScreen}>
      <div
        className="thumb-song "
        style={{
          backgroundImage: `url(${props?.item.music.thumbnails}), url(${props.thumbnails})`,
        }}
      ></div>

      <div className="detail-song">
        <div className="w-full">
          <div className="w-[80%]">
            <span className="name-song">{props.item.music.title}</span>
            <span className="name-song">{props.title}</span>
          </div>
          
        </div>
        <div className="information-song">
          <div className="chanel-singer">
            <span style={{ color: "gray", fontSize: "14px" }}>
              {props.item.music.channelTitle}
              {props.channelTitle}
            </span>
          </div>
          <div>
            <span>Mô tả: </span>
            <span className="custom-decripton">
              {props.item.music.description}
              {props.description}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="w-[4%] float-right pt-[40px] text-[20px] ">
            <button onClick={handleOpenModal} className="block float-right">
              <RiDeleteBin6Line   className="text-[20px] ml-4 " />
            </button>
            <DialogDeleteMusicPlaylist
              playlistId={props.item.playlistId}
              musicId = {props.item.music.id}
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
            />
          </div>
    </div>
    
    // <div className=""  onClick={handleClickSongInSearchScreen}>
    //   <div>

    //   </div>

    // </div>
  );
};

export default Song;
