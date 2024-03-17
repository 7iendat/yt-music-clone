import React,{ useState} from "react";
import { Link } from "react-router-dom";
import "./NavBarLeft.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FaRegCompass } from "react-icons/fa";
import { SiAirplayaudio } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";


const NavBarLeft = (props) => {
  
  
  console.log("profile:", props.profile);

  const LinkActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "red" : "blue",
      fontWeight: isActive ? "bold" : "normal",
    };
  };

  return (
    <div className="nar-bar-left w-[16.3%]">
      <div className="pb-[20px]">
      <Link to="/"  >
        <div className="option active ">
          <div className="icon-option "><FontAwesomeIcon icon={faHome}/></div>
          <span>Trang chủ</span>
        </div>
      </Link>

      <Link to="/discover">
        <div className="option ">
          <div className="icon-option text-[20px]"><FaRegCompass /></div>
          <span>Khám phá</span>
        </div>
      </Link>



        <Link to="/library">
      <div className="option">
          <div className="icon-option lib"><MdLibraryMusic /></div>
          <span>Thư viện</span>
        </div>
      </Link>

      <Link style={LinkActive} to="/">
        <div className="option">
          <div className="icon-option update"><SiAirplayaudio /></div>
          <span>Nâng cấp</span>
        </div>
      </Link>
      </div>
      <div className="bound"></div>

      <div className="list-music">
        <div className="icon-add-list"></div>
        <span>Danh sách phát mới</span>
      </div>

      {props.profile !== null ? (
        <>
          <div className="list-music-liked">
            <div className="list-music-liked-text">
              <span>Nhạc đã thích</span>
              <div className="text-child">
                <div className="icon-text-child"></div>
                <span>Danh sách tự động</span>
              </div>
            </div>
            <div className="list-music-icon"></div>
          </div>

          <div className="btn-logout" onClick={props.logOut}>
            Log Out
          </div>
        </>
      ) : (
        <div className="btn-login" onClick={props.login}>
          Sign Up
        </div>
      )}
    </div>
  );
};

export default NavBarLeft;
