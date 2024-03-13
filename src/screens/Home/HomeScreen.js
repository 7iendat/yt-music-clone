import Theme from "../../Theme/Theme";
import "./HomeScreen.css";
const HomeScreen = () => {
  const title = "Theme";
  return (
    <div className="home-screen">
      <div className="container">
        <Theme title={title} />
        <Theme title={title} />
        <Theme title={title} />
        <Theme title={title} />
      </div>
    </div>
  );
};

export default HomeScreen;
