import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickTheme.css";

import SongTRending from "../components/SongTRending";

const SimpleSlider = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  

  return (
    <Slider {...settings} className="container-slider">
      {props.dataMusicPopular ? (
        props.dataMusicPopular?.map((item, index) => {
          return (
           <SongTRending key={index} data = {item}/>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </Slider>
  );
};

export default SimpleSlider;
