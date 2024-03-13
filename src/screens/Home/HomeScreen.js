import Theme from "../../Theme/Theme";
import Trending from "../../Theme/Trending";
import "./HomeScreen.css";
const HomeScreen = () => {
  const title = "Theme";
  return (
    <div className="home-screen pl-[80px] text-white px-10  max-w-[78vw]  mx-auto">
      <div className="">
        <Trending/>
        <Theme title={title} />
        <Theme title={title} />
        <Theme title={title} />
        <Theme title={title} />
      </div>
    </div>
  );
};

export default HomeScreen;
