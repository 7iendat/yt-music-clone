import SimpleSlider from "./SlickTheme";
import "./Theme.css";

const Theme = ({ title }) => {
  return (
    <div className="theme">
      <div className="head-theme">
        <h1>{title}</h1>
        <div className="more-view">Xem Thêm</div>
      </div>
      <div className="slider">
        <SimpleSlider />
      </div>
    </div>
  );
};

export default Theme;
