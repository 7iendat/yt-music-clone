import { useEffect, useState } from "react";
import "./Song.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Song = (props) => {
  const history = useNavigate();
  //const [chanel, setChanel] = useState({});

  // useEffect(() => {
  //   async function fecthData() {
  //     let res = await axios.get(
  //       `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${props.item.snippet.channelId}&key=AIzaSyCicMJd8w0G5XfYdqXpTK-ITzg4WaIdl74`
  //     );

  //     setChanel(res.data.items);
  //   }

  //   fecthData();
  // }, []);

  // console.log("chanel", chanel.items[0].snippet.thumbnails.high.url);
  console.log(props);

  const handleClickSong = () => {
    history(
      `/watch/${props.item.id.videoId}?title=${props.item.snippet.title}`
    );
  };

  return (
    <div className="song" onClick={handleClickSong}>
      <div
        className="thumb-song"
        style={{
          backgroundImage: `url(${props.item.snippet.thumbnails.high.url})`,
        }}
      ></div>
      <div className="detail-song">
        <span className="name-song">{props.item.snippet.title}</span>
        <div className="information-song">
          <div className="chanel-singer">
            {/* <div
              className="avatar"
              style={{
                backgroundImage: `url(${chanel.items[0].snippet.thumbnails.high.url})`,
              }}
            ></div> */}
            <span style={{ color: "gray", fontSize: "14px" }}>
              {props.item.snippet.channelTitle}
            </span>
          </div>
          <span className="custom-decripton">
            Mô tả: {props.item.snippet.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Song;
