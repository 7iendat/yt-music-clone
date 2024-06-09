import Theme from "../../Theme/Theme"
import Category from "./Category";
import "./discovers.css"
const discover = () => {
    const title = "Theme";
    return (
        <div className="container">
            <div className="row block">
                <button className="Release flex flex-row items-center">
                    <div className="p-[10px] font-semibold"><i className="fa-solid fa-music "></i></div>
                    <span>Bản Phát Hành Mới</span>
                </button>
                <button className="Release flex flex-row items-center">
                    <div className="p-[10px] font-semibold"><i className="fa-solid fa-arrow-trend-up "></i></div>
                    <span>Bảng Xếp Hạng</span>
                </button>
                <button className="Release flex flex-row items-center">
                    <div className="p-[10px] font-semibold"><i className="fa-regular fa-face-smile "></i></div>
                    <span>Tâm Trạng và Thể Loại</span>
                </button>
            </div>
            <div>
                <Theme title={title} />
               <div className="mb-[30px]"><Category/> </div>
               <Theme title={title} />
               <Theme title={title} />
            </div>
            
        </div>
    );
};

export default discover;