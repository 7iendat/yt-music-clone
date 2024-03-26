import { useSearchParams, useParams } from "react-router-dom";
import "./PlaySong.css";
import { useEffect, useState } from "react";
import axios from "axios";

import VideoRecommend from "../../components/VideoRecommend";

const PlaySong = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  const channelId = params.get("channel");

  const [channel, setChannel] = useState([]);
  const [song, setSong] = useState([]);

  const [songsRecommed, setSongsRecommend] = useState([]);

  async function fecthDataSongsRecommend() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet%20&channelId=${channelId}&maxResults=25&key=${process.env.REACT_APP_API_KEY}`
    );

    setSongsRecommend(res.data.items);
  }
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
    fecthDataSongsRecommend();
  }, []);

  const urlPlaySong = `https://www.youtube.com/embed/${idSong}?rel=0&amp;autoplay=1`;

  return channel[0] !== undefined && song[0] !== undefined ? (
    <div className="play-song">
      <div className="playing">
        <div className="video-playing" style={{ position: "relative" }}>
          <iframe
            width="680"
            height="440"
            src={urlPlaySong}
            title={params.get("title")}
            frameborder="0"
            allow="picture-in-picture;autoplay"
          ></iframe>
        </div>

        <div className="more-infor">
          <div className="infor-song">
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {params.get("title")}
            </h2>
          </div>

          <div
            style={{ display: "flex", width: "700px", alignItems: "center" }}
          >
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
      <div className="list-video-recommend">
        <h1
          style={{
            marginLeft: "10px",
            marginBottom: "8px",
            fontSize: "24px",
            zIndex: "10",
            height: "30px",
            /* background-color: rgb(33 33 33); */
            borderBottom: "1px solid #494949",
          }}
        >
          Danh sách tương tự
        </h1>

        <div className="recommend-item">
          {songsRecommed.length > 0 ? (
            songsRecommed.map((item, index) => (
              <VideoRecommend key={index} item={item} />
            ))
          ) : (
            <div> Loading...</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};

export default PlaySong;
