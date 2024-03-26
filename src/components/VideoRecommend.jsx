import "./VideoRecommend.css";
import { useNavigate } from "react-router-dom";

const VideoRecommend = (props) => {
  console.log("props songs", props);
  const history = useNavigate();

  const handleClickSong = () => {
    history(
      `/watch/${props.item.id.videoId}?title=${props.item.snippet.title}&channel=${props.item.snippet.channelId}`
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

export default VideoRecommend;
