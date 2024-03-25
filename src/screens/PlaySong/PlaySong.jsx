import { useSearchParams, useParams } from "react-router-dom";
import "./PlaySong.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlaySong = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  const channelId = params.get("channel");

  const [channel, setChannel] = useState([]);
  const [song, setSong] = useState([]);

  async function fecthData() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&maxResults=25&key=${process.env.REACT_APP_API_KEY}`
    );

    setChannel(res.data.items);
  }

  async function fecthDataSong() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics%2CcontentDetails&id=${idSong}&key=${process.env.REACT_APP_API_KEY}`
    );

    setSong(res.data.items);
  }
  useEffect(() => {
    fecthData();
    fecthDataSong();
  }, []);

  console.log("channel", channel);
  console.log("song", song);

  const urlPlaySong = `https://www.youtube.com/embed/${idSong}?rel=0&amp;autoplay=1`;
  return channel[0] !== undefined && song[0] !== undefined ? (
    <div className="play-song">
      <div className="video-playing">
        <iframe
          width="680"
          height="440"
          src={urlPlaySong}
          title={params.get("title")}
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope"
        ></iframe>
      </div>

      <div className="more-infor">
        <div className="infor-song">
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
            {params.get("title")}
          </h2>
        </div>

        <div style={{ display: "flex", width: "700px", alignItems: "center" }}>
          <div className="channel" style={{ width: "50%" }}>
            <div
              className="channel-inf"
              style={{
                backgroundImage: `url(${channel[0].snippet.thumbnails.high.url})`,
              }}
            ></div>
            <div className="inf-singer">
              <span>{channel[0].snippet.title}</span>
              <span style={{ color: "gray", fontSize: "13px" }}>
                {channel[0].statistics.subscriberCount} Người đăng kí
              </span>
            </div>
          </div>

          <div
            className="statistics"
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              height: "38px",
            }}
          >
            <div
              className="like-dislike "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                backgroundColor: "#3d3c3c",
                width: "150px",
                height: "100%",
                borderRadius: "20px",
              }}
            >
              <div
                className="liked "
                style={{
                  height: "100%",
                  width: "50%",
                  fontSize: "24px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: "pointer",
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <i class="fa-solid fa-thumbs-up"></i>
                <span style={{ fontSize: "14px", marginLeft: "7px" }}>
                  {song[0].statistics.likeCount}
                </span>
              </div>
              &#124;
              <i
                class="fa-solid fa-thumbs-down"
                style={{
                  fontSize: "24px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: "pointer",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>LOADING....</>
  );
};

export default PlaySong;
