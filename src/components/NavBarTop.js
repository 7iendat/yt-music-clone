import InputSearch from "./inputSearch";
import "./NavBarTop.css";

const NavBarTop = () => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-top-left">
        <div className="menu-bar"></div>
        <div className="logo">
          <div className="icon-app"></div>
          <h3>Music</h3>
        </div>
      </div>
      <InputSearch />
      <div className="nav-bar-top-right">
        <div className="connect-device"></div>
        <div className="profile"></div>
      </div>
    </div>
  );
};

export default NavBarTop;
