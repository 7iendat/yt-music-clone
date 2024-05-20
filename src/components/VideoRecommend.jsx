import "./VideoRecommend.css";
import { useNavigate } from "react-router-dom";

const VideoRecommend = (props) => {
  const history = useNavigate();
  // console.log("Prop song recom: ", props.item);
  const handleClickSong = () => {
    history(
      `/watch/${props.videoId}?title=${props.title}&channel=${props.channelId}`
    );
  };
  return (
    <div className="video-recommend" onClick={handleClickSong}>
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${props.thumbnails})`,
        }}
      ></div>
      <div className="title">{props.title}</div>
    </div>
  );
};

export default VideoRecommend;
