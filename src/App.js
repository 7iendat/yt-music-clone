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


import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Author from "./page/author/Author";

function App() {
  const MainLayout = ({ children }) => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
      if (user) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
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
    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
      googleLogout();
      setProfile(null);
    };
    console.log(profile);
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
            <Route element={<HomeScreen />} path="/home" />
            <Route  element={<ExploreScreen />} path="/discover" />
            <Route element={<Library/>} path="/library"/>
            <Route element={<Author/>} path="/Tac-gia"/>
            <Route element={<NotFound />} path="*" />
          </Routes>
        </MainLayout>
      </BrowserRouter>

  );
}

export default App;
