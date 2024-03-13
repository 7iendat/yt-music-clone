import React from "react";
import { Link } from 'react-router-dom';
import { categories } from "../../utils/categories"


import './category.css'

const category = () => {
        return (
        <div className="theme">
            <div className="head-theme">
                <h1 className="text-3xl font-medium">Tâm Trạng và Thể Loại</h1>
                <div className="more-view">Xem Thêm</div>
            </div>
            <div className="w-[100%] mt-6">
                <div className="">
                    <ul className="category-ul categories-scoll scrollbox">
                        {categories.map((main, i) => (
                            <li style={{borderLeftColor:main.color}} className={`  inline-block mt-[5px] border-l-[6px] border-l-${main.color} leading-7 scroll-ml-96 bg-[#292929] rounded hover:bg-[#212121]  `}>
                                <Link to={`${main.link}`} className="color-category flex justify-start normal-case text-center ">
                                    
                                    <span className=" leading-[44px]  text-start   border-none text-white text-[14px] font-medium px-[12px] text-center w-[100%]">
                                        {main.name}
                                        </span>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>

    );
}
export default category;