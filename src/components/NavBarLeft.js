import { Link } from "react-router-dom";
import "./NavBarLeft.css";
const NavBarLeft = (props) => {
  console.log("profile:", props.profile);
  return (
    <div className="nar-bar-left">
      <Link to="/">
      <div className="option ">
        <div className="icon-option home"></div>
        <span>Trang chủ</span>
       </div></Link>

        <Link to="/discover">
      <div className="option active">
          <div className="icon-option explore "></div>
          <span>Khám phá</span>
       </div> </Link>

        <Link to="/">
      <div className="option">
          <div className="icon-option lib"></div>
          <span>Thư viện</span>
        </div></Link>

        <Link to="/">
      <div className="option">
          <div className="icon-option update"></div>
          <span>Nâng cấp</span>
        </div></Link>


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
