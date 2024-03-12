import Theme from "../components/Theme";
import "./HomeScreen.css";

const HomeScreen = () => {
  const title = "Themme";
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
