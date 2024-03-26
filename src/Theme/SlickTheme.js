import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickTheme.css";
import { useNavigate } from "react-router-dom";

const SimpleSlider = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const history = useNavigate();
  const handleClickSong = () => {
    history(
      `/watch/${props.item.id}?title=${props.item.snippet.title}&channel=${props.item.snippet.channelId}`
    );
  };

  return (
    <Slider {...settings} className="container-slider">
      {props.dataMusicPopular ? (
        props.dataMusicPopular?.map((item, index) => {
          return (
            <div key={index} className="option-slick" onClick={handleClickSong}>
              <div
                className="thumb_slick"
                style={{
                  backgroundImage: `url(${item.snippet.thumbnails.high.url})`,
                }}
              ></div>
              <div className="infor">
                <span style={{ fontSize: "14px" }}>
                  {item.snippet.localized.title}
                </span>
                <div className="description">
                  <span style={{ fontSize: "12px" }}>
                    {item.snippet.channelTitle}
                  </span>
                  .
                  <span style={{ marginLeft: "4px", fontSize: "14px" }}>
                    Lượt xem: {item.statistics.viewCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </Slider>
  );
};

export default SimpleSlider;
