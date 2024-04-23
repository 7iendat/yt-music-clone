import { Link } from "react-router-dom";
import "./PlaylistScreen.css";

const Playlist = (props) => {
  return (
    <Link to={`/playlist/${props.item.id}`} state={{playlistId: `${props.item.id}`}}>
      {/* <PlaylistDetailScreen playlistId = {props.item.id}/> */}
      <div className="list-music-liked">
        <div className="list-music-liked-text">
          <span>{props.item.title}</span>
          <div className="text-child">
            <span>{props.item.channelTitle}</span>
          </div>
        </div>
      <div className="list-music-icon"></div>
      </div>
    </Link>
  );
};

export default Playlist;