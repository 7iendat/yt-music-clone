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
import axiosClient from "../../api/axiosClient";

const PlaySong = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  const channelId = params.get("channel");
  const [comments, setComments] = useState();

  const [channel, setChannel] = useState([]);
  const [song, setSong] = useState([]);

  const [songsRecommed, setSongsRecommend] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { image } = useContext(AuthContext);
  const [cmt, setCmt] = useState("");
  const [dataLikedPlaylist, setLikedDataPlaylist] = useState({});
  const [addPlaylist, setAddPlaylist ] = useState([]);
  const [saveMusic, setSaveMusic] = useState("");
  const [liked, setLiked] = useState(false);

  const user = useContext(AuthContext);
  console.log("USER", user);
  console.log("USER ID", user.id);


  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const access_token = localStorage.getItem("access_token");

  // console.log("USER PLAYSONG", user);

  const handleLike = async () => {
    try {
      if (user !== undefined && dataLikedPlaylist !== undefined && song[0] !== undefined) {
        let response = await axiosClient.post(`/music`, {
          videoId: `${song[0].id}`,
          channelId:  `${song[0].snippet.channelId}`,
          title:`${song[0].snippet.title}`,
          description: `${song[0].snippet.description}`,
          thumbnails:`${song[0].snippet.thumbnails.standard.url}` ,
          channelTitle:`${song[0].snippet.channelTitle}` 
        });
        setSaveMusic ([response.data, ...saveMusic]);
        const newMusic = response.data;

        let res = await axiosClient.post(`/playlistItems`, {
          playlistId: `${dataLikedPlaylist.id}`,
          musicId: `${newMusic.id}`,
        });
        setAddPlaylist([res.data, ...addPlaylist]);
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleClickBtnLike = async () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      handleLike();
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

  async function fetchDataLikedPlaylist(){
    try{
      let result = await axios.get(
        `http://localhost:5050/playlists/liked/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("RESULT", result.data[0]);
      setLikedDataPlaylist(result.data[0]);
    }catch (error){
      console.log("error fetchLikedPlaylist");
    }
  }

  useEffect(() => {
    fecthDataSong();
    fecthDataSongsRecommend();
    fecthData();
    fetchCommentOfVideo();
    fetchDataLikedPlaylist();
  
  }, []);

  console.log("SONG", song[0]);
  // console.log("SONG ID", song[0]);
  console.log("LIKED PLAYLIST", dataLikedPlaylist);
  // console.log("LIKED PLAYLIST ID", dataLikedPlaylist.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    insertComment(cmt);
    // console.log("com", cmt);
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
                <div>
                  {liked ? (
                    <div onClick={handleClickBtnLike} style={{ cursor: "pointer"}}>
                      <i
                        class="fa-solid fa-heart" 
                        style={{
                          color: "#63E6BE"
                        }}
                      ></i>
                      <span style={{ fontSize: "17px", marginLeft: "7px", color:"#63E6BE", fontWeight: "bold"}}>
                        Đã yêu thích
                      </span>
                    </div>
                  ) : (
                    <div onClick={handleClickBtnLike} style={{ cursor: "pointer"}}>
                      <i
                        class="fa-regular fa-heart" 
                        style={{
                          color: "#ffffff"
                        }}
                      ></i>
                      <span style={{ fontSize: "17px", marginLeft: "7px", fontWeight: "bold"}}>
                        Yêu thích
                      </span>
                    </div>
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
                Song={song[0]}
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
