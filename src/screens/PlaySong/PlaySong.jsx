import { useSearchParams, useParams } from "react-router-dom";
import "./PlaySong.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import VideoRecommend from "../../components/VideoRecommend";
import DialogAddSongInPlaylist from "./DialogAddSongInPlaylist";

const PlaySong = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  const channelId = params.get("channel");
  const [rating, setRating] = useState([]);

  const [channel, setChannel] = useState([]);
  const [song, setSong] = useState([]);

  const [songsRecommed, setSongsRecommend] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [liked, setLiked] = useState(false);

  const access_token = localStorage.getItem("access_token");

  const handleClickBtnLike = () => {
    console.log("check1", liked);
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }

    console.log("check", liked);
    if (!liked) {
      handleLike();
    } else {
      handleNoneLikeOrDislike();
    }
  };

  const handleLike = async () => {
    try {
      if (access_token) {
        let response = axios.post(
          `https://www.googleapis.com/youtube/v3/videos/rate?id=${idSong}&rating=like`,
          null,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleNoneLikeOrDislike = async () => {
    try {
      if (access_token) {
        let response = axios.post(
          `https://www.googleapis.com/youtube/v3/videos/rate?id=${idSong}&rating=none`,
          null,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const [Disliked, setDisliked] = useState(false);
  const handleClickBtnDislike = () => {
    if (Disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
    }

    if (!liked) {
      setLiked(false);

      handleDislike();
    } else {
      handleNoneLikeOrDislike();
    }
  };

  const handleDislike = async () => {
    try {
      if (access_token) {
        let response = axios.post(
          `https://www.googleapis.com/youtube/v3/videos/rate?id=${idSong}&rating=dislike`,
          null,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

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

  async function fetchRatingOfSong() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos/getRating?id=${idSong}&key=${process.env.REACT_APP_API_KEY}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,

          Accept: `application/json`,
        },
      }
    );
    setRating(res.data.items);
    if (res.data.items.length > 0 && res.data.items[0].rating === "like") {
      setLiked(true);
    } else {
      setLiked(false);
    }
    console.log("check2", liked);
  }

  useEffect(() => {
    fecthDataSong();
    fecthDataSongsRecommend();
    fecthData();
    fetchRatingOfSong();
  }, []);

  console.log("rating", rating);

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
                  onClick={handleClickBtnLike}
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
                  {/* {rating.length > 0 && rating[0].rating === "like" && liked ? (
                    <i class="fa-solid fa-thumbs-up"></i>
                  ) : (
                    <i class="fa-regular fa-thumbs-up"></i>
                  )} */}

                  {liked ? (
                    <i class="fa-solid fa-thumbs-up"></i>
                  ) : (
                    <i class="fa-regular fa-thumbs-up"></i>
                  )}

                  <span style={{ fontSize: "14px", marginLeft: "7px" }}>
                    {song[0].statistics.likeCount}
                  </span>
                </div>
                &#124;
                <i
                  onClick={handleClickBtnDislike}
                  class="fa-regular fa-thumbs-down"
                  style={{
                    fontSize: "24px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    cursor: "pointer",
                  }}
                ></i>
              </div>
              <div
                onClick={handleOpenModal}
                className="btn-add-song-to-playlist"
              >
                <i class="fa-solid fa-list-check"></i>
              </div>
              <DialogAddSongInPlaylist
                idSong={idSong}
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="list-video-recommend">
        <h1
          style={{
            marginLeft: "10px",
            marginBottom: "10px",
            fontSize: "24px",
            zIndex: "10",
            height: "30px",
            /* background-color: rgb(33 33 33); */
            borderBottom: "1px solid #494949",
          }}
        >
          Danh sách kết hợp
        </h1>

        <div className="recommend-item">
          {songsRecommed.length > 0 ? (
            songsRecommed.map((item, index) => (
              <VideoRecommend key={index} item={item} />
            ))
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
      </div>
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
  );
};

export default PlaySong;
