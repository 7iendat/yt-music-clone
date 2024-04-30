import { useNavigate } from "react-router-dom";
const SongTRending = (props) => {
  const history = useNavigate();
  const handleClickSong = () => {
    history(
      `/watch/${props.data.id}?title=${props.data.snippet.title}&channel=${props.data.snippet.channelId}`
    );
  };
  return (
    <div className="option-slick" onClick={handleClickSong}>
      <div
        className="thumb_slick"
        style={{
          backgroundImage: `url(${props.data.snippet.thumbnails.high.url})`,
        }}
      ></div>
      <div className="infor">
        <span style={{ fontSize: "14px" }}>
          {props.data.snippet.localized.title}
        </span>
        <div className="description">
          <span style={{ fontSize: "12px" }}>
            {props.data.snippet.channelTitle}
          </span>
          .
          <span style={{ marginLeft: "4px", fontSize: "14px" }}>
            Lượt xem: {props.data.statistics.viewCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongTRending;
