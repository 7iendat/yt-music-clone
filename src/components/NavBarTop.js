import InputSearch from "./inputSearch";
import { FaChromecast } from "react-icons/fa6";

import "./NavBarTop.css";
import { Link } from "react-router-dom";

const NavBarTop = (props) => {
  const access_token = localStorage.getItem("access_token");

  return (
    <div className="w-full">
      <div className="nav-bar z-50">
        <div className="nav-bar-top-left w-[16.3%] ">
          <div className="menu-bar"></div>
          <Link to="/">
            <div className="logo">
              <div className="icon-app"></div>
              <span>Music</span>
            </div>
          </Link>
        </div>
        <div className="w-[70%]">
          <InputSearch />{" "}
        </div>

        <div className="nav-bar-top-right w-[13.7%]">
          <div className="connect-device">
            <FaChromecast />
          </div>
          {access_token !== null && props.profile !== null ? (
            <div className="profile">
              <img src={props.profile.picture} />
            </div>
          ) : (
            <div className="btn-login1" onClick={props.login}>
              Sign Up
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarTop;
