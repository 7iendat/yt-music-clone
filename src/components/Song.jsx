import "./Song.css";

import { useNavigate } from "react-router-dom";

const Song = (props) => {
  const history = useNavigate();

  const handleClickSong = () => {
    history(
      `/watch/${props.videoId}?title=${props.title}&channel=${props.channelId}`
    );
  };
  // console.log("PROPSSS", props);

  return (
    <div
      className="song"
      onClick={handleClickSong}>
      <div
        className="thumb-song"
        style={{
          backgroundImage: `url(${props.thumbnails})`,
        }}
      ></div>
      <div className="detail-song">
        <span className="name-song">{props.title}</span>
        <div className="information-song">
          <div className="chanel-singer">
            <span style={{ color: "gray", fontSize: "14px" }}>
              {props.channelTitle}
            </span>
          </div>
          <span className="custom-decripton">
            Mô tả: {props.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Song;
