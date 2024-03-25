import { Link } from "react-router-dom";
import "./PlaylistScreen.css";
import { useNavigate } from "react-router-dom";

const Playlist = (props) => {
  console.log("PROPS PLAYLIST", props);
  const navigate = useNavigate();
  return (
    <Link to={`/playlist?list=${props.item.id}`} state={{playlistId: `${props.item.id}`}}>
      {/* <PlaylistDetailScreen playlistId = {props.item.id}/> */}
      <div className="list-music-liked">
        <div className="list-music-liked-text">
          <span>{props.item.snippet.title}</span>
          <div className="text-child">
            <span>{props.item.snippet.channelTitle}</span>
          </div>
        </div>
      <div className="list-music-icon"></div>
      </div>
    </Link>
  );
};

export default Playlist;