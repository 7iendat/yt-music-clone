import { useSearchParams, useParams } from "react-router-dom";
import "./PlaySong.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import VideoRecommend from "../../components/VideoRecommend";
import DialogAddSongPlaylist from "../PlaylistDetail/DialogAddSongPlaylist";

import Comment from "../../components/Comment";
import { Avatar } from "antd";
import AuthProvider, { AuthContext } from "../../Context/AuthProvider";

const PlaySong = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  const channelId = params.get("channel");
  const [rating, setRating] = useState([]);

  const [comments, setComments] = useState();

  const [channel, setChannel] = useState([]);
  const [song, setSong] = useState([]);

  const [songsRecommed, setSongsRecommend] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [likecount, setLikeCount] = useState(0);
  const { image } = useContext(AuthContext);
  const [cmt, setCmt] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);

  const access_token = localStorage.getItem("access_token");
  // console.log("ChannelID", channelId);

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

  const handleClickBtnLike = async () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likecount - 1);
      handleNoneLikeOrDislike();
    } else {
      setLiked(true);
      setLikeCount(likecount + 1);
      setDisliked(false);
      handleLike();
    }
  };

  const handleClickBtnDislike = async () => {
    if (Disliked) {
      setDisliked(false);
      handleNoneLikeOrDislike();
    } else {
      setDisliked(true);
      setLiked(false);
      setLikeCount(likecount - 1);
      handleDislike();
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
    if (res.data.items[0] !== undefined) {
      if (res.data.items[0] !== undefined) {
        setLikeCount(Number(res.data.items[0].statistics.likeCount));
      }
    }
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
    // console.log("check2", liked);
  }

  async function fetchCommentOfVideo() {
    try {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Cid&order=time&videoId=${idSong}&key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,

            Accept: `application/json`,
          },
        }
      );
      if (res) {
        setComments(res.data.items);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    fecthDataSong();
    fecthDataSongsRecommend();
    fecthData();
    fetchRatingOfSong();
    fetchCommentOfVideo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    insertComment(cmt);
    console.log("com", cmt);
  };

  const insertComment = async (text) => {
    try {
      let res = await axios.post(
        `https://youtube.googleapis.com/youtube/v3/comments?key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,

            Accept: `application/json`,
          },
          data: {
            snippet: {
              textDisplay: text,
              textOriginal: text,
            },
          },
        }
      );
      console.log("d", res);
    } catch (error) {
      console.log("error");
    }
  };

  // console.log("rating", rating);
  // console.log("Song recom: ", songsRecommed);

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
                {/* <span style={{ color: "gray", fontSize: "13px" }}>
                  {channel[0].statistics.subscriberCount} Người đăng kí
                </span> */}
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
                  {liked ? (
                    <i
                      class="fa-solid fa-thumbs-up"
                      onClick={handleClickBtnLike}
                    ></i>
                  ) : (
                    <i
                      class="fa-regular fa-thumbs-up"
                      onClick={handleClickBtnLike}
                    ></i>
                  )}

                  <span style={{ fontSize: "14px", marginLeft: "7px" }}>
                    {likecount}
                  </span>
                </div>
                &#124;
                <div
                  className="disliked "
                  style={{
                    fontSize: "24px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    cursor: "pointer",
                  }}
                >
                  {Disliked ? (
                    <i
                      class="fa-solid fa-thumbs-down"
                      onClick={handleClickBtnDislike}
                    ></i>
                  ) : (
                    <i
                      class="fa-regular fa-thumbs-down"
                      onClick={handleClickBtnDislike}
                    ></i>
                  )}
                </div>
              </div>
              <div
                onClick={handleOpenModal}
                className="btn-add-song-to-playlist"
              >
                <i class="fa-solid fa-list-check"></i>
              </div>
              <DialogAddSongPlaylist
                idSong={idSong}
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>

          <h2
            style={{ marginTop: "20px", fontSize: "22px", fontWeight: "bold" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "40px" }}>
                <Avatar src={image} size="large">
                  {image ? "" : "?"}
                </Avatar>
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  width: "100%",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="comment"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: "1px solid #ffffff",
                      width: "500px",
                      color: "white",
                      fontSize: "15px",
                      padding: "7px",
                    }}
                    placeholder="Nhập bình luận"
                    value={cmt}
                    onChange={(e) => setCmt(e.target.value)}
                  />
                  <button
                    type="submit"
                    style={{
                      marginLeft: "8px",
                      borderRadius: "10px",
                      fontSize: "18px",
                      background: "gray",
                      padding: "5px",
                    }}
                  >
                    Bình luận
                  </button>
                </form>
              </div>
            </div>
            Bình luận
          </h2>
          {comments?.map((cmt, idx) => {
            return (
              <Comment key={idx} value={cmt.snippet.topLevelComment.snippet} />
            );
          })}
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
        <hr />
        <div className="recommend-item">
          {songsRecommed.length > 0 ? (
            songsRecommed.map((item, index) => (
              <VideoRecommend
                key={index}
                videoId={item.id.videoId}
                title={item.snippet.title}
                channelId={item.snippet.channelId}
                thumbnails={item.snippet.thumbnails.high.url}
              />
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
