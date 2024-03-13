import Theme from "../components/Theme";
import "./HomeScreen.css";

const HomeScreen = () => {
  const frequently = "Chào mừng";
  const recommend = "Video nhạc đề xuất";
  const trending = "Các bài hát thịnh hành";
  const disc = "Đĩa nhạc đề xuất"
  return (
    <div className="home-screen">

      <div className="container">

        <nav className="cat-navbar">
            <ul>
              <li><a href="#">Nạp năng lượng</a></li>
              <li><a href="#">Thư giãn</a></li>
              <li><a href="#">Vui tươi</a></li>
              <li><a href="#">Tập thể dục</a></li>
              <li><a href="#">Trên đường đi làm</a></li>
              <li><a href="#">Tiệc tùng</a></li>
              <li><a href="#">Tập trung</a></li>
              <li><a href="#">Lãng mạn</a></li>
              <li><a href="#">Buồn</a></li>
              <li><a href="#">Dễ ngủ</a></li>
            </ul>
        </nav>

        <Theme title={frequently} />
        <Theme title={recommend} />
        <Theme title={trending} />
        <Theme title={disc} />
      </div>
    </div>
  );
};

export default HomeScreen;
