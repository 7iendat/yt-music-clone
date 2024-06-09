import "./Song.css";

import { useNavigate } from "react-router-dom";

const Song = (props) => {
  const history = useNavigate();

  const handleClickSongInSearchScreen = () => {
    history(
      `/watch/${props.item.music.videoId}?title=${props.item.music.title}&channel=${props.item.music.channelId}`,
      `/watch/${props.videoId}?title=${props.title}&channel=${props.channelId}`, 
      {playlistId: `${props.item.playlistId}`}
    );
  };
   
  // console.log("PROPSSS", props.thumbnails);
 
  return (
    <div
      className="song"
      onClick={handleClickSongInSearchScreen}>
      <div
        className="thumb-song "
        style={{
          backgroundImage: `url(${props?.item.music.thumbnails}), url(${props.thumbnails})`
        }}
      ></div>
      <div className="detail-song">
        <span className="name-song">{props.item.music.title}</span>
        <span className="name-song">{props.title}</span>
        <div className="information-song">
          <div className="chanel-singer">
            <span style={{ color: "gray", fontSize: "14px" }}>
              {props.item.music.channelTitle}
              {props.channelTitle}
            </span>
          </div>
          <div> 
            <span>Mô tả:  </span>   
            <span className="custom-decripton">
             {props.item.music.description}
             {props.description}
          </span>
          </div>
          
        </div>
      </div>
    </div>
    // <div className=""  onClick={handleClickSongInSearchScreen}>
    //   <div>
        
    //   </div>

    // </div>
  );
};

export default Song;