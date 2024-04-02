import "./PlayListAlbum.css";
import { useNavigate } from "react-router-dom";

const PlayListAlbum = (props) => {
  const history = useNavigate();
  console.log("PLAY LIST ALBUM", props.item);

  const handleClickSong = () => {
    history(
      `/watch/album/${props.item.snippet.resourceId
        .videoId}?title=${props.item.snippet.title}&channel=${props.item.snippet.channelId}`,
        {state: {songs: props.songs}}
    );
  };
  return (
    <div className="video-recommend" onClick={handleClickSong}>
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${props.item.snippet.thumbnails.high.url})`,
        }}
      ></div>
      <div className="title">{props.item.snippet.title}</div>
    </div>
  );
};

export default PlayListAlbum;
