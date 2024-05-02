import "./VideoRecommend.css";
import { useNavigate } from "react-router-dom";

const VideoRecommend = (props) => {
  const history = useNavigate();

  const handleClickSong = () => {
    history(
      `/watch/${props.item.videoId}?title=${props.item.title}&channel=${props.item.channelId}`
    );
  };
  return (
    <div className="video-recommend" onClick={handleClickSong}>
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${props.item.thumbnails})`,
        }}
      ></div>
      <div className="title">{props.item.title}</div>
    </div>
  );
};

export default VideoRecommend;
