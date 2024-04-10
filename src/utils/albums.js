// const albumId = {
//   "99%": "PLSaac19x1K73ilf4uHaad6-9sf3hjfcI8",
//   "LOI CHOI": "PLXMY36-jumXiA2oaUvxG_vSOL8jMatyHu",
//   "VŨ TRỤ CÒ BAY": "PL3duv3p3SjKVPp7Lhte8RxnnY6P1lAZXl",
//   "AI CŨNG PHẢI BẮT ĐẦU TỪ ĐÂU ĐÓ": "PLfxWNJNjpAS8WWuZ1Nh1ea4Va0DTQYl8d",
//   "420ent Mixtape": "PL-lOSdhV0833zldHYs9akuKkoWaWrmK1V",
//   "ái": "PL9DCmatxxAsz44ZuGxon-prdXjGASGAGq",
//   "Đánh Đổi": "PLgIS1MvgCaOVR07APOp8zfBLHbh7VGllX",
// };

// export default albumId;
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export const albumItems = [
    {
        title: "99%",
        link: "/album/99%",
        id: "PLSaac19x1K73ilf4uHaad6-9sf3hjfcI8",
        singer:"MCK",
        cover: "https://i.ytimg.com/vi/sYSvC8tOgKE/hqdefault.jpg",
        icon: faPlay,
        background: "rgb(234, 32, 39)"
    },{
        title: "LOI CHOI",
        link: "/album/LOICHOI",
        id: "PLXMY36-jumXiA2oaUvxG_vSOL8jMatyHu",
        singer:"Wren Evans",
        cover:"https://i.ytimg.com/vi/B9otsRRe0BE/hqdefault.jpg",
        icon: faPlay,
        background: "rgb(179, 57, 57)"
    },{
        title: "VŨ TRỤ CÒ BAY",
        link: "/album/VUTRUCOBAY",
        id: "PL3duv3p3SjKVPp7Lhte8RxnnY6P1lAZXl",
        singer:"Phương Mỹ Chi",
        cover:"https://i.ytimg.com/vi/jhln5b4wOfI/hqdefault.jpg",
        icon: faPlay,
        background: "rgb(184, 233, 148)"
    },{
        title: "Ai Cũng Phải Bắt Đầu Từ Đâu Đó",
        link: "/album/AICUNGPHAIBATDAUTUDAUDO",
        id: "PLfxWNJNjpAS8WWuZ1Nh1ea4Va0DTQYl8d",
        singer:"HIEUTHUHAI",
        cover:"https://i.ytimg.com/vi/2rvMy0Itg1E/hqdefault.jpg",
        icon: faPlay,
        background: "rgb(238, 90, 36)"
    },{
        title: "420ent Mixtape",
        link: "/album/420entMixtape",
        id: "PL-lOSdhV0833zldHYs9akuKkoWaWrmK1V",
        singer:"Wxrdie",
        cover:"https://i.ytimg.com/vi/ZPTHCmUehHA/maxresdefault.jpg",
        icon: faPlay,
        background: "rgb(243, 104, 224)"
    },{
        title: "ái",
        link: "/album/ai",
        id: "PL9DCmatxxAsz44ZuGxon-prdXjGASGAGq",
        singer:"Tlinh",
        cover: "https://i.ytimg.com/vi/82ZTNQNEQgE/maxresdefault.jpg",
        icon: faPlay,
        background: "rgb(220, 221, 225)"
    },{
        title: "Đánh Đổi",
        link: "/album/DanhDoi",
        id: "PLgIS1MvgCaOVR07APOp8zfBLHbh7VGllX",
        singer:"Obito",
        cover:"https://i.ytimg.com/vi/PKEqsBIW41k/maxresdefault.jpg",
        icon: faPlay,
        background: "rgb(60, 99, 130)"
    },
]
