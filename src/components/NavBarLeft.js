import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBarLeft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FaRegCompass } from "react-icons/fa";
import { SiAirplayaudio } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";
import axios from "axios";
import PlaylistScreen from "../../src/screens/Playlist/PlaylistScreen";
import ModalAddPlaylist from "./ModalAddPlaylist";

const NavBarLeft = (props) => {
  const access_token = localStorage.getItem("access_token");
  const key = process.env.REACT_APP_API_KEY;
  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [dataPlaylistPrev, setDataPlaylistPrev] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

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
  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true&key=${key}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,

            Accept: `application/json`,
          },
        }
      );
      if (JSON.stringify(res.data.items) !== JSON.stringify(dataPlaylistPrev)) {
        setDataPlaylist(res.data.items);
        setDataPlaylistPrev(res.data.items);
      }
    }

    if (access_token !== null && props.profile !== null) {
      fecthData();
    }
  }, [dataPlaylistPrev]);

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

      <div className="list-music" onClick={handleOpenModal}>
        <div className="icon-add-list"></div>
        <span>Danh sách phát mới</span>
      </div>

      {access_token !== null && props.profile !== null ? (
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

          <div className="btn-logout" onClick={props.logOut}>
            Log Out
          </div>
        </>
      ) : (
        <div className="btn-login" onClick={props.login}>
          Sign Up
        </div>
      )}
      <ModalAddPlaylist
        isOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default NavBarLeft;
