import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickTheme.css";
import BeatLoader from "react-spinners/BeatLoader";
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
          return <SongTRending key={index} data={item} />;
        })
      ) : (
        <BeatLoader
          color="#f90200"
          cssOverride={{
            display: "flex",
            width: "100%",
            // margin: "0 auto",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "red",
          }}
          size={15}
          aria-label="Loading "
          data-testid="loader"
        />
      )}
    </Slider>
  );
};

export default SimpleSlider;
