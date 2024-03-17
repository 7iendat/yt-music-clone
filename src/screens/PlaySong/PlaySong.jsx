import { useSearchParams, useParams } from "react-router-dom";
import "./PlaySong.css";

const PlaySong = () => {
  const [params, setParams] = useSearchParams();
  const { idSong } = useParams();
  console.log("params", params.get("title"));
  console.log("params", idSong);

  const urlPlaySong = `https://www.youtube.com/embed/${idSong}?rel=0&amp;autoplay=1`;
  return (
    <div className="play-song">
      <div className="video-playing">
        <iframe
          width="640"
          height="480"
          src={urlPlaySong}
          title={params.get("title")}
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      <div className="more-infor">
        <div className="infor-song">
          <h2>{params.get("title")}</h2>
        </div>
      </div>
    </div>
  );
};

export default PlaySong;
