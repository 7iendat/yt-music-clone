import React from "react";
import { songs } from "../utils/songs";
import Song from "./Song";
import "./Trending.css";

const Trending = (props) => {
  console.log("props", props.dataMusicPopular.length);

  return (
    <div className="text-white  max-w-[70vw]  mx-auto mt-8  ">
      {/*Title  */}
      <div className="">
        <div>
          <p className="text-[16px] -mb-1">BẮT ĐẦU ĐÀI PHÁT BẰNG MỘT BÀI HÁT</p>
          <p className="text-[32px] font-bold">Chọn nhanh đài phát</p>
        </div>
      </div>
      {/* Songs */}
      <div
        style={{ overflowX: "auto", scrollbarColor: "gray black" }}
        className="grid grid-rows-3 grid-flow-col  mt-4 pl-[20px] pb-1 "
      >
        {props.dataMusicPopular?.map((item, index) => (
          <Song
            key={index}
            idSong={item.id}
            title={item.snippet.localized.title}
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

export default Trending;
