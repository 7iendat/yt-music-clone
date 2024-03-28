import { useParams } from "react-router-dom";
import "./Channel.css";
import { useEffect, useState } from "react";
import axios from "axios";

import SongOfChannel from "./SongOfChannel";
const Channel = () => {
  const { nameChannel } = useParams();
  const [channel, setChannel] = useState([]);
  const [songOfChannel, setSongOfChannel] = useState([]);

  const key = process.env.REACT_APP_API_KEY;

  async function fecthDataChannel() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${nameChannel}&type=channel&key=${key}`
    );

    setChannel(res.data.items);
  }

  async function fecthDataSongOfChannel() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel[0].id.channelId}&maxResults=20&type=video&key=${key}`
    );

    setSongOfChannel(res.data.items);
  }
  useEffect(() => {
    fecthDataChannel();
    fecthDataSongOfChannel();
  }, []);

  console.log("son", songOfChannel);
  return (
    <div className="channel-screen">
      {channel.length > 0 ? (
        <div
          className="channel-info"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <div
            className="channel-header"
            style={{
              width: "100%",
              height: "300px",
              display: "flex",
              marginTop: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="relative"
              style={{
                backgroundImage: `url(${channel[0].snippet.thumbnails.high.url})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginRight: "22px",
              }}
            ></div>
            <div className="info-singer">
              <h1 style={{ fontSize: "20px" }}>
                {channel[0].snippet.channelTitle}
              </h1>
              <span
                style={{
                  color: "gray",
                  fontSize: "13px",
                }}
              >
                {" "}
                {channel[0].snippet.description}
              </span>
            </div>
          </div>
          <div
            style={{ width: "100%", height: "1px", backgroundColor: "gray" }}
          ></div>

          <h1
            style={{
              fontSize: "22px",
              marginTop: "14px",
              marginBottom: "10px",
            }}
          >
            Bài hát{" "}
          </h1>
          {channel.length > 0 && songOfChannel.length > 0 ? (
            <div
              className="list-song"
              style={{
                width: "100%",
                position: "absolute",
                height: "300px",
                overflowY: "scroll",
                scrollbarColor: "gray black",
              }}
            >
              {songOfChannel.map((item, index) => {
                return <SongOfChannel key={index} item={item} />;
              })}
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      ) : (
        <h1>loading..</h1>
      )}
    </div>
  );
};

export default Channel;
