import "./App.css";
import React, { useState, useEffect } from "react";
import NavBarLeft from "./components/NavBarLeft";
import NavBarTop from "./components/NavBarTop";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function App() {
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
  return (
    <div className="main">
      <BrowserRouter>
        <NavBarTop login={login} profile={profile} logOut={logOut} />
        <NavBarLeft login={login} profile={profile} logOut={logOut} />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/explore" element={<ExploreScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
