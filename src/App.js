import "./App.css";
import React, { useState, useEffect } from "react";
import NavBarLeft from "./components/NavBarLeft";
import NavBarTop from "./components/NavBarTop";

import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import ExploreScreen from "./screens/Discover/discovers";
import Library from "./screens/library/Library";
import NotFound from "./page/notFound/NotFound";

import {
  googleLogout,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import axios from "axios";

import SearchMusic from "./page/searchMusic/SearchMusic";
import PlaySong from "./screens/PlaySong/PlaySong";
import TopicScreen from "./screens/Topic/TopicScreen";
import { useNavigate } from "react-router-dom";

import Author from "./page/author/Author";
import VideoLikedScreen from "./screens/VideoLiked/VideoLikedScreen";

function App() {
  const MainLayout = ({ children }) => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const history = useNavigate();

    const login = useGoogleLogin({
      onSuccess: async (codeResponse) => {
        setUser(codeResponse);
        // const userInfo = await axios.get(
        //   "https://www.googleapis.com/oauth2/v3/userinfo",
        //   {
        //     headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        //   }
        // );

        // console.log(userInfo);

        localStorage.setItem("access_token", codeResponse.access_token);
      },
      scope: "openid https://www.googleapis.com/auth/youtube.readonly",
      onError: (e) => console.log(e),
    });

    const access_token_isChecked = localStorage.getItem("access_token");
    useEffect(() => {
      if (access_token_isChecked) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token_isChecked}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    }, [access_token_isChecked]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
      googleLogout();
      setProfile(null);
      localStorage.removeItem("user");
      setUser(null);
      localStorage.removeItem("access_token");
      history("/");
    };
    console.log("user is ", user);
    console.log("profile is ", profile);

    //url path của trang web
    const location = useLocation();

    //khai báo url path không xài header footer
    const excludeRoutes = ["/*/:id"];

    // kiểm tra bằng vòng lặp
    const isExist = excludeRoutes.some((routes) => {
      // trả về liệu có tồn tại location nào khớp với phần tử url nào trong excludeRoutes hay không
      return matchPath({ path: routes, exact: true }, location.pathname);
    });

    // nếu có thì trả về children không xài header và footer
    if (isExist) {
      return <>{children}</>;
    }
    //nếu không thì trả về children xài cùng header và footer
    return (
      <>
        <NavBarTop login={login} profile={profile} logOut={logOut} />
        <NavBarLeft login={login} profile={profile} logOut={logOut} />
        {children}
      </>
    );
  };
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<HomeScreen />} path="/" />

          <Route element={<ExploreScreen />} path="/discover" />
          <Route element={<Library />} path="/library" />
          <Route path="/search/:keySearch" element={<SearchMusic />} />
          <Route path="/watch/:idSong" element={<PlaySong />} />
          <Route path="/topic/:topicName" element={<TopicScreen />} />
          <Route element={<VideoLikedScreen />} path="/video-liked" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
