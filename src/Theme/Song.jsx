import React from "react";
import { Link } from "react-router-dom";
const Song = (props) => {
  const link = `watch/${props.videoId}?title=${props.title}&channel=${props.channelId}`;

  return (
    <Link
      to={link}
      className=" w-80 h-20 text-ellipsis hover:bg-slate-600 rounded-md p-2 flex items-center justify-start  mr-5 relative group"
    >
      <div
        style={{ height: "100%", width: "35%" }}
        className="flex  relative justify-center items-center "
      >
        <div
          style={{
            backgroundImage: `url(${props.thumbnails})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
          }}
          alt=""
          className=" rounded-sm object-cover  bg-white  relative border border-gray-800"
        />
        <div className="overflow-hidden hidden  absolute group-hover:block transition-all">
          <i class="fa fa-play" aria-hidden="true"></i>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
        className=" cursor-pointer pl-5 text-start -my-21 w-full h-full bg-transparent "
      >
        <p className=" text-sm h-2/3 text-ellipsis overflow-hidden ... w-full ">
          {props.title}
        </p>
        <p className="text-sm text-zinc-400 ">{props.channelTitle}</p>
      </div>
    </Link>
  );
};

export default Song;
