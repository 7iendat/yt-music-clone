import MusicTop from "../../Theme/MusicTop";
import Records from "../../Theme/Records";
import Theme from "../../Theme/Theme";
import Trending from "../../Theme/Trending";
import "./HomeScreen.css";
const HomeScreen = () => {
  const title = "Theme";
  return (
    <div className="home-screen pl-[80px] text-white px-10  max-w-[78vw]  mx-auto">
      <div className="">
        <Trending/>
        <Records />
        <MusicTop/>
        <Theme title={title} />
        <Theme title={title} />
        <Theme title={title} />
        <Theme title={title} />
      </div>
    </div>
  );
};

export default HomeScreen;
