import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import axios from "axios";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  // useEffect(() => {
  //   const unSub = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const { displayName, photoURL } = user;
  //       setUser({ displayName, photoURL });
  //       const accessToken = user.multiFactor.user.accessToken;
  //       localStorage.setItem("access_token", accessToken);
  //       navigate("/");
  //       return;
  //     }
  //     setUser({});
  //   });
  //   return () => unSub();
  // }, [navigate]);

  const access_token_isChecked = localStorage.getItem("access_token");
  const isLoginWithAcc = localStorage.getItem("isLoginWithAcc");
  useEffect(() => {
    if (access_token_isChecked) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token_isChecked}`,
          {
            headers: {
              Authorization: `Bearer ${access_token_isChecked}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res) {
            setUser(res.data);
            console.log("user", res.data);

            return;
          }
          setUser({});
        })
        .catch((err) => console.log(err));
    }

    if (isLoginWithAcc === "true") {
      const BASEURL = "http://localhost:5050";

      fetch(`${BASEURL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.code === 401) {
            setUser({});
            // window.location.reload();
          } else if (data.code === 200) {
            setUser(data.userAccount);
            //window.location.reload();
          } else {
          }
        })
        .catch((err) => console.log(err));
    }
  }, [access_token_isChecked, isLoginWithAcc]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
