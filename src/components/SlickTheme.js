import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickTheme.css";
const SimpleSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="container-slider">

      <div className="option-slick">
        <div className="thumb"></div>
        <div className="infor">
          <span>title</span>
          <div className="description">
            <span>Singer</span>.<span>Views</span>
          </div>
        </div>
      </div>

      <div className="option-slick">
        <div className="thumb"></div>
        <div className="infor">
          <span>title</span>
          <div className="description">
            <span>Singer</span>.<span>Views</span>
          </div>
        </div>
      </div>

      <div className="option-slick">
        <div className="thumb"></div>
        <div className="infor">
          <span>title</span>
          <div className="description">
            <span>Singer</span>.<span>Views</span>
          </div>
        </div>
      </div>

      <div className="option-slick">
        <div className="thumb"></div>
        <div className="infor">
          <span>title</span>
          <div className="description">
            <span>Singer</span>.<span>Views</span>
          </div>
        </div>
      </div>

      <div className="option-slick">
        <div className="thumb"></div>
        <div className="infor">
          <span>title</span>
          <div className="description">
            <span>Singer</span>.<span>Views</span>
          </div>
        </div>
      </div>
      
      <div className="option-slick">
        <div className="thumb"></div>
        <div className="infor">
          <span>title</span>
          <div className="description">
            <span>Singer</span>.<span>Views</span>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default SimpleSlider;
