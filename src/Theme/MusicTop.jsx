import React from "react";
import { songs } from "../utils/songs";
import "./Trending.css";
import Song from "./Song";
const MusicTop = (props) => {
  return (
    <div className="text-white  max-w-[70vw]  mx-auto mt-8  ">
      {/*Title  */}
      <div className="">
        <div>
          <p className="text-[32px] font-bold -mb-1">BÀI HÁT MỚI VÀ HOT</p>
        </div>
      </div>
      {/* Songs */}
      <div
        style={{ overflowX: "auto", scrollbarColor: "gray black" }}
        className="grid grid-rows-3 grid-flow-col  mt-4 pl-[20px] pb-1 "
      >
        {props.songNew?.map((item, index) => (
          <Song
            key={index}
            idSong={item.id.videoId}
            channelId={item.snippet.channelId}
            title={item.snippet.title}
            thumb={item.snippet.thumbnails.high.url}
            singer={item.snippet.channelTitle}
          />
          // <div className="">

          // </div>
        ))}
      </div>
    </div>
  );
};

export default MusicTop;
