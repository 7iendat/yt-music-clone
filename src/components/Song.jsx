import "./Song.css";

import { useNavigate } from "react-router-dom";

const Song = (props) => {
  const history = useNavigate();
  const channelId = props.item.snippet.channelId;

  const handleClickReSong = () => {
    history(
      `/watch/${props.item.snippet.resourceId.videoId}?title=${props.item.snippet.title}&channel=${props.item.snippet.videoOwnerChannelId
      }`
    );
  };
  const handleClickSong = () => {
    history(
      `/watch/${props.item.id}?title=${props.item.snippet.title}&channel=${channelId}`
    );
  };
  const handleClickSongInSearchScreen = () => {
    history(
      `/watch/${props.item.id.videoId}?title=${props.item.snippet.title}&channel=${channelId}`
    );
  };

  console.log("PROPSSS", props);

  let functionChosed;
  if (props.item.id.videoId) {
    functionChosed = handleClickSongInSearchScreen;
  } else if (props.item.snippet.resourceId.videoId) {
    functionChosed = handleClickReSong;
  } else {
    functionChosed = handleClickSong;
  }

  return (
    <div
      className="song"
      onClick={functionChosed}
      // props.item.id
      //   ? handleClickSong
      //   : props.item.id.videoId
      //   ? handleClickSongInSearchScreen
      //   : handleClickReSong
    >
      <div
        className="thumb-song"
        style={{
          backgroundImage: `url(${props.item.snippet.thumbnails.high.url})`,
        }}
      ></div>
      <div className="detail-song">
        <span className="name-song">{props.item.snippet.title}</span>
        <div className="information-song">
          <div className="chanel-singer">
            <span style={{ color: "gray", fontSize: "14px" }}>
              {props.item.snippet.channelTitle}
            </span>
          </div>
          <span className="custom-decripton">
            Mô tả: {props.item.snippet.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Song;
