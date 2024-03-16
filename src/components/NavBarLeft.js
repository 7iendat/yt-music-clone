import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./NavBarLeft.css";
const NavBarLeft = (props) => {
  console.log("profile:", props.profile);

  const LinkActive = ({ isActive }) => {
    return {
      backgroundColor : isActive ? 'red' : 'blue',
      fontWeight : isActive ? 'bold'  : 'normal'
    }
  }

  return (
    <div className="nar-bar-left">

      <NavLink style={LinkActive} to="/home">
        <div className="option">
          <div className="icon-option home"></div>
          <span>Trang chủ</span>
        </div>
      </NavLink>

      <NavLink style={LinkActive} to="/discover">
        <div className="option">
          <div className="icon-option explore "></div>
          <span>Khám phá</span>
        </div>{" "}
      </NavLink>



        <NavLink style={LinkActive} to="/library">
          <div className="option">
            <div className="icon-option lib"></div>
            <span>Thư viện</span>
         </div>
      </NavLink>

      <NavLink style={LinkActive} to="/">
        <div className="option">
          <div className="icon-option update"></div>
          <span>Nâng cấp</span>
        </div>
      </NavLink>

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
