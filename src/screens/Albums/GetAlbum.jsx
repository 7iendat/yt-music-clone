import { useEffect, useState } from "react";
import "./GetAlbum.css";
import axios from "axios";
import Song from "../../components/Song";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import keyAl from "../../utils/keyAlbum";
import SongOfAlbum from "./SongOfAlbum";

const GetAlbum = () => {
  const access_token = localStorage.getItem("access_token");
  const key = process.env.REACT_APP_API_KEY;
  const [dataAlbumItems, setDataAlbumItems] = useState([]);
  const { albumName } = useParams();
  const location = useLocation();
  const { infoAlbum } = location.state;

  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${keyAl[albumName]}&key=${key}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
            Accept: `application/json`,
          },
        }
      );

      setDataAlbumItems(res.data.items);
    }

    fecthData();
  }, []);

  console.log("ALBUM: ", dataAlbumItems);
  console.log("INFO ALBUM: ", infoAlbum);

  return (
    <div className="channel-screen">
      {dataAlbumItems.length > 0 ? (
        <div
          className="channel-info"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <div
            className="channel-header"
            style={{
              width: "100%",
              height: "360px",
              display: "flex",
              // marginTop: "30px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="relative"
              style={{
                backgroundImage: `url(${infoAlbum.cover})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "480px",
                height: "360px",
                // borderRadius: "50%",
                marginRight: "50px",
              }}
            ></div>
            <div className="info-singer">
              <h4>Album</h4>
              <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
                {infoAlbum.title}
              </h1>
              <span
                style={{
                  color: "gray",
                  fontSize: "30px",
                }}
              >
                {" "}
                {infoAlbum.singer}
              </span>
              <div
                style={{
                  color: "gray",
                  fontSize: "20px",
                }}
              >
                {" "}
                {dataAlbumItems.length} bài hát
              </div>
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
            Danh sách phát{" "}
          </h1>
          <SongOfAlbum dataAlbumItems={dataAlbumItems}/>
        </div>
      ) : (
        <h1>loading..</h1>
      )
      }
    </div>
  );
};

export default GetAlbum;
