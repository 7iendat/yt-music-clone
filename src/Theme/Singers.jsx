import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";

import "./Singers.css";
const Singers = (props) => {
  console.log("singers", props);
  return (
    <div className="text-white  max-w-[70vw]  mx-auto mt-8  ">
      {/*Title  */}
      <div className="">
        <div>
          <p className="text-[32px] font-bold">Ca sĩ nổi tiếng</p>
        </div>
      </div>
      {/* Music */}
      <div className="w-[94%] h-full mx-auto my-0 mt-6  ml-6">
        {/*   */}
        <div className="category-div categories-scoll Records-scrollbox ">
          {props.dataSingers.length > 0 ? (
            props.dataSingers?.map((singer, index) => (
              <div key={index} className="">
                <Link
                  to={"/channel/" + singer.name}
                  className="  mr-1 group relative"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      backgroundImage: `url(${singer.images[0].url})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="">
                    <Link to="/Tac-gia">
                      <p className="hover:underline ">{singer.name}</p>
                    </Link>
                  </div>
                </Link>
              </div>
            ))
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
        </div>
      </div>
    </div>
  );
};

export default Singers;
