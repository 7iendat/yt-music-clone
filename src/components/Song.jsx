import { useEffect, useState } from "react";
import "./Song.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Song = (props) => {
  const history = useNavigate();
  const channelId = props.item.snippet.channelId;
  console.log("channelId", channelId);
  console.log("day", props);

  const handleClickSong = () => {
    history(
      `/watch/${props.item.id.videoId}?title=${props.item.snippet.title}&channel=${channelId}`
    );
  };

  return (
    <div className="song" onClick={handleClickSong}>
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
