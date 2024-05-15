import { useNavigate } from "react-router-dom";
const SongTRending = (props) => {
  const history = useNavigate();
  const handleClickSong = () => {
    history(
      `/watch/${props.videoId}?title=${props.title}&channel=${props.channelId}`
    );
  };
  return (
    <div className="option-slick" onClick={handleClickSong}>
      <div
        className="thumb_slick"
        style={{
          backgroundImage: `url(${props.thumbnails})`,
        }}
      ></div>
      <div className="infor">
        <span style={{ fontSize: "14px" }}>
          {props.title}
        </span>
        <div className="description">
          <span style={{ fontSize: "12px" }}>
            {props.channelTitle}
          </span>
          .
          <span style={{ marginLeft: "4px", fontSize: "14px" }}>
            Lượt xem: {props.viewCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongTRending;
