import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SongOfAlbum = (props) => {

  console.log("SongOfAlbum", props);
  console.log("SongOfAlbum LENGHT", props.dataAlbumItems.length);

  return props.dataAlbumItems.length > 0 ? (
    <div
      className="list-song"
      style={{
        width: "100%",
        position: "absolute",
        height: "350px",
        overflowY: "scroll",
        scrollbarColor: "gray black",
      }}
    >
      {props.dataAlbumItems.map((item, index) => {
        return (
          <Link
            to={
              "/watch/album/" +
              item.snippet.resourceId.videoId+
              "?title=" +
              item.snippet.title +
              "&channel=" +
              item.snippet.channelId
            }
            state={{songs: props.dataAlbumItems, idx:index}}
          >
            <div key={index} className="video-of-channel">
              <div
                className="thumb"
                style={{
                  backgroundImage: `url(${item.snippet.thumbnails.high.url})`,
                }}
              ></div>
              <div className="title">{item.snippet.title}</div>
            </div>
          </Link>
        );
      })}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default SongOfAlbum;
