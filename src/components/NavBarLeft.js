import "./NavBarLeft.css";
const NavBarLeft = () => {
  return (
    <div className="nar-bar-left">
      <div className="option ">
        <div className="icon-option home"></div>
        <span>Trang chủ</span>
      </div>
      <div className="option active">
        <div className="icon-option explore "></div>
        <span>Khám phá</span>
      </div>
      <div className="option">
        <div className="icon-option lib"></div>
        <span>Thư viện</span>
      </div>
      <div className="option">
        <div className="icon-option update"></div>
        <span>Nâng cấp</span>
      </div>

      <div className="bound"></div>

      <div className="list-music">
        <div className="icon-add-list"></div>
        <span>Danh sách phát mới</span>
      </div>

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
    </div>
  );
};

export default NavBarLeft;
