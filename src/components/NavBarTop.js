import InputSearch from "./inputSearch";
import "./NavBarTop.css";

const NavBarTop = (props) => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-top-left">
        <div className="menu-bar"></div>
        <div className="logo">
          <div className="icon-app"></div>
          <span>Music</span>
        </div>
      </div>
      <InputSearch />
      <div className="nav-bar-top-right">
        <div className="connect-device"></div>
        {props.profile !== null ? (
          <div className="profile">
            <img src={props.profile.picture} />
          </div>
        ) : (
          <div className="btn-login" onClick={props.login}>
            Sign Up
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarTop;
