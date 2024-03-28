import { useNavigate } from "react-router-dom";

const SongOfChannel = (props) => {
  const history = useNavigate();

  const handleClickSong = () => {
    history(
      `/watch/${props.item.id.videoId}?title=${props.item.snippet.title}&channel=${props.item.snippet.channelId}`
    );
  };

  return (
    <div key={props.key} className="video-of-channel">
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

export default SongOfChannel;
