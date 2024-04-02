import { useSearchParams, useParams } from "react-router-dom";
import "./PlayAlbumScreen.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PlayListAlbum from "../Albums/PlayListAlbum";

import VideoRecommend from "../../components/VideoRecommend";

const PlayAlbumScreen = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  const [song, setSong] = useState([]);
  const [channel, setChannel] = useState([]);
  const channelId = params.get("channel");

  const location = useLocation();
  const { songs } = location.state;
  console.log("ITEM SONG", songs);
  console.log("SONGS LENGTH", songs.length);

  const urlPlaySong = `https://www.youtube.com/embed/${idSong}?rel=0&amp;autoplay=1`;

  async function fecthDataSong() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics%2CcontentDetails&id=${idSong}&key=${process.env.REACT_APP_API_KEY}`
    );

    setSong(res.data.items);
  }

  async function fecthDataChannel() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&maxResults=25&key=${process.env.REACT_APP_API_KEY}`
    );

    setChannel(res.data.items);
  }

  useEffect(() => {
    fecthDataChannel();
    fecthDataSong();
  }, []);

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
            // borderBottom: "1px solid #494949",
          }}
        >
          Danh sách kết hợp
        </h1>
        <hr/>
        <div className="recommend-item">
          {songs.length > 0 ? (
            songs.map((item, index) => (
              <PlayListAlbum key={index} item={item} songs={songs} />
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

export default PlayAlbumScreen;
