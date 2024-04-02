import "./PlayListAlbum.css";
import { useNavigate } from "react-router-dom";

const PlayListAlbum = (props) => {
  const history = useNavigate();
  // console.log("PLAY LIST ALBUM", props.item);
  const pos = props.item.snippet.position;
  console.log("INDEX", pos);

  const handleClickSong = () => {
    history(
      `/watch/album/${props.item.snippet.resourceId
        .videoId}?title=${props.item.snippet.title}&channel=${props.item.snippet.channelId}`,
        {state: {songs: props.songs, idx: pos}}
    );
  };
  return (
    props.curPlay === pos ? (
      <div className="video-recommend" onClick={handleClickSong} style={{backgroundColor: "rgba(89, 107, 99, 0.5)"}}>
        <div
          className="thumb"
          style={{
            backgroundImage: `url(${props.item.snippet.thumbnails.high.url})`,
          }}
        ></div>
        <div className="title" style={{fontWeight: "bold"}}>{props.item.snippet.title}</div>
      </div>
    ) : (
      <div className="video-recommend" onClick={handleClickSong}>
        <div
          className="thumb"
          style={{
            backgroundImage: `url(${props.item.snippet.thumbnails.high.url})`,
          }}
        ></div>
        <div className="title">{props.item.snippet.title}</div>
      </div>
    )
  );
};

export default PlayListAlbum;
