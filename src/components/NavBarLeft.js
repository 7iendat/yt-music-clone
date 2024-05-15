import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBarLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FaRegCompass } from "react-icons/fa";
import { SiAirplayaudio } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";
import axios from "axios";
import PlaylistScreen from "../../src/screens/Playlist/PlaylistScreen";
import ModalAddPlaylist from "./ModalAddPlaylist";
import axiosClient from "../api/axiosClient";
import LoginScreen from "../screens/Auth/Login";
import firebase from "../firebase/config";
import { googleLogout } from "@react-oauth/google";
import { AuthContext } from "../Context/AuthProvider";

const NavBarLeft = () => {
  const access_token = localStorage.getItem("access_token");
  const key = process.env.REACT_APP_API_KEY;
  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [dataPlaylistPrev, setDataPlaylistPrev] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = useContext(AuthContext);
  // console.log(user);
  const LinkActive = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "red" : "white",
      backgroundColor: isActive ? "red" : "white",
    };
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenLoginModal = () => {
    setLoginIsOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginIsOpen(false);
  };

  useEffect(() => {
    async function fecthData() {
      let res = await axiosClient.get(`/playlists`);
      if (JSON.stringify(res.data) !== JSON.stringify(dataPlaylistPrev)) {
        setDataPlaylist(res.data);
        setDataPlaylistPrev(res.data);
      }
    }

    if (access_token !== null) {
      fecthData();
    }
  }, [dataPlaylistPrev]);

  const logOut = () => {
    googleLogout();

    localStorage.removeItem("access_token");
    localStorage.removeItem("isLoginWithAcc");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="nar-bar-left w-[16.3%]">
      <div className="pb-[20px]">
        <NavLink style={LinkActive} to="/" className="z-40">
          <div className="option">
            <div className="icon-option ">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span>Trang chủ</span>
          </div>
        </NavLink>

        <NavLink style={LinkActive} to="/discover" className="z-40">
          <div className="option">
            <div className="icon-option text-[20px]">
              <FaRegCompass />
            </div>
            <span>Khám phá</span>
          </div>
        </NavLink>

        <NavLink style={LinkActive} to="/library" className="z-40">
          <div className="option">
            <div className="icon-option lib">
              <MdLibraryMusic />
            </div>
            <span>Thư viện</span>
          </div>
        </NavLink>

        <NavLink style={LinkActive} to="/upgrade" className="z-40">
          <div className="option">
            <div className="icon-option update">
              <SiAirplayaudio />
            </div>
            <span>Nâng cấp</span>
          </div>
        </NavLink>
      </div>

      <div className="bound"></div>

      <div className="list-music" onClick={handleOpenModal}>
        <div className="icon-add-list"></div>
        <span>Danh sách phát mới</span>
      </div>

      {access_token !== null || Object.keys(user).length !== 0 ? (
        <>
          <Link to="/video-liked">
            {" "}
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
          </Link>

          {dataPlaylist.map((item, index) => {
            return <PlaylistScreen key={index} item={item} />;
          })}
          <div className="btn-logout" onClick={() => logOut()}>
            Log Out
          </div>
        </>
      ) : (
        <div className="btn-login" onClick={() => handleOpenLoginModal()}>
          Sign Up
        </div>
      )}
      <ModalAddPlaylist
        isOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
      />

      <LoginScreen
        isOpen={modalLoginIsOpen}
        handleCloseLoginModal={handleCloseLoginModal}
      />
    </div>
  );
};

export default NavBarLeft;
