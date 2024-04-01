import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
const SongOfChannel = (props) => {
  console.log("channel", props);
  const history = useNavigate();
  const [songOfChannel, setSongOfChannel] = useState([]);
  const key = process.env.REACT_APP_API_KEY;

  async function fecthDataSongOfChannel() {
    let res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${props.channelId[0].id.channelId}&maxResults=20&type=video&key=${key}`
    );

    setSongOfChannel(res.data.items);
  }
  useEffect(() => {
    fecthDataSongOfChannel();
  }, []);

  console.log("songlof", songOfChannel);

  return songOfChannel.length > 0 ? (
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
        return (
          <Link
            to={
              "/watch/" +
              item.id.videoId +
              "?title=" +
              item.snippet.title +
              "&channel=" +
              item.snippet.channelId
            }
          >
            <div key={index} className="video-of-channel">
              <div
                className="thumb"
                style={{
                  backgroundImage: `url(${item.snippet.thumbnails.high.url})`,
                }}
              ></div>
              <div className="title">{item.snippet.title}</div>
            </div>
          </Link>
        );
      })}
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

export default SongOfChannel;
