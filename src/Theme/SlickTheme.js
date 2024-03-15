import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickTheme.css";

const SimpleSlider = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  console.log("dataMusicPopular", props.dataMusicPopular);
  return (
    <Slider {...settings} className="container-slider">
      {props.dataMusicPopular?.map((item, index) => {
        return (
          <div key={index} className="option-slick">
            <div
              className="thumb"
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
      })}
    </Slider>
  );
};

export default SimpleSlider;
