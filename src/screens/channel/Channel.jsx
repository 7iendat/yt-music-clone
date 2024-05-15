import { useParams } from "react-router-dom";
import "./Channel.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import SongOfChannel from "./SongOfChannel";
const Channel = () => {
  const { nameChannel } = useParams();
  const [channel, setChannel] = useState([]);

  const key = process.env.REACT_APP_API_KEY;

  async function fecthDataChannel() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${nameChannel}&type=channel&key=${key}`
    );

    setChannel(res.data.items);
  }

  useEffect(() => {
    fecthDataChannel();
  }, []);

  // console.log("chn", channel);

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
              height: "200px",
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
          {channel.length > 0 ? (
            <SongOfChannel channelId={channel[0].id.channelId} />
          ) : (
            <BeatLoader
              color="#f90200"
              cssOverride={{
                display: "flex",
                width: "100%",
                // margin: "0 auto",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "red",
              }}
              size={15}
              aria-label="Loading "
              data-testid="loader"
            />
          )}
        </div>
      ) : (
        <BeatLoader
          color="#f90200"
          cssOverride={{
            display: "flex",
            width: "100%",
            // margin: "0 auto",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "red",
          }}
          size={15}
          aria-label="Loading "
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default Channel;
