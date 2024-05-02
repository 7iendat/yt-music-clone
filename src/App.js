import "./App.css";
import React, { useState, useEffect } from "react";
import NavBarLeft from "./components/NavBarLeft";
import NavBarTop from "./components/NavBarTop";

import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import ExploreScreen from "./screens/Discover/discovers";
import Library from "./screens/library/Library";
import NotFound from "./page/notFound/NotFound";

import {
  googleLogout,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";

import SearchMusic from "./page/searchMusic/SearchMusic";
import PlaySong from "./screens/PlaySong/PlaySong";
import TopicScreen from "./screens/Topic/TopicScreen";
import { useNavigate } from "react-router-dom";

import VideoLikedScreen from "./screens/VideoLiked/VideoLikedScreen";
import PlayAlbumScreen from "./screens/Albums/PlayAlbumScreen";

import PlaylistDetailScreen from "./screens/PlaylistDetail/PlaylistDetailScreen";
import Channel from "./screens/channel/Channel";
import GetAlbum from "./screens/Albums/GetAlbum";
import Author from "./page/author/Author";
import AuthProvider from "./Context/AuthProvider";
function App() {
  const MainLayout = ({ children }) => {
    const auth = btoa(
      `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`
    );

    useEffect(() => {
      const getAccessToken = async () => {
        try {
          const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            null,
            {
              params: {
                grant_type: "client_credentials",
              },

              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              data: {
                grant_type: "client_credentials",
                client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
                client_secret: process.env.REACT_APP_SPOTIFY_SECRET,
              },
            }
          );
          const access_token_spotify = response.data.access_token;
          if (access_token_spotify) {
            localStorage.setItem("access_token_spotify", access_token_spotify);
          }
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      };
      getAccessToken();
    }, []);

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
        <NavBarTop />
        <NavBarLeft />
        {children}
      </>
    );
  };
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <AuthProvider>
          <MainLayout>
            <Routes>
              <Route element={<HomeScreen />} path="/" />

              <Route element={<ExploreScreen />} path="/discover" />
              <Route element={<Library />} path="/library" />
              <Route path="/search/:keySearch" element={<SearchMusic />} />
              <Route path="/watch/:idSong" element={<PlaySong />} />
              <Route
                path="/watch/album/:idSong"
                element={<PlayAlbumScreen />}
              />
              <Route path="/topic/:topicName" element={<TopicScreen />} />
              <Route element={<VideoLikedScreen />} path="/video-liked" />
              <Route element={<Channel />} path="/channel/:nameChannel" />
              <Route element={<PlaylistDetailScreen />} path="/playlist/*" />
              <Route element={<Author />} path="/author/:idAuthor" />
              <Route element={<GetAlbum />} path="/album/:albumName" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
