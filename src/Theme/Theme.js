import SimpleSlider from "./SlickTheme";
import "./Theme.css";

const Theme = (props) => {
  return (
    <div className="theme">
      <div className="head-theme">
        <h1>{props.title}</h1>
        {/* <div className="more-view">Xem Thêm</div> */}
      </div>
      <div className="slider">
        <SimpleSlider
          title={props.title}
          dataMusicPopular={props.dataMusicPopular}
        />
      </div>
    </div>
  );
};

export default Theme;
