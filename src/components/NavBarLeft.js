import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBarLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FaRegCompass } from "react-icons/fa";
import { SiAirplayaudio } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";

const NavBarLeft = (props) => {
  console.log("profile:", props.profile);

  const LinkActive = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "red" : "white",
      backgroundColor: isActive ? "red" : "white",
    };
  };

  return (
    <div className="nar-bar-left w-[16.3%]">
      <div className="pb-[20px]">
        <NavLink style={LinkActive} to="/">
          <div className="option">
            <div className="icon-option ">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span>Trang chủ</span>
          </div>
        </NavLink>

        <NavLink style={LinkActive} to="/discover">
          <div className="option">
            <div className="icon-option text-[20px]">
              <FaRegCompass />
            </div>
            <span>Khám phá</span>
          </div>
        </NavLink>

        <NavLink style={LinkActive} to="/library">
          <div className="option">
            <div className="icon-option lib">
              <MdLibraryMusic />
            </div>
            <span>Thư viện</span>
          </div>
        </NavLink>

        <NavLink style={LinkActive} to="/upgrade">
          <div className="option">
            <div className="icon-option update">
              <SiAirplayaudio />
            </div>
            <span>Nâng cấp</span>
          </div>
        </NavLink>
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
