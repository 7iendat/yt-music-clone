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
    // console.log("chehk");
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
        .then(async (res) => {
          if (res) {
            // console.log("user", res.data);
            await fetch(
              `http://localhost:5050/api/get-user-by-name/${res.data.email}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            )
              .then((res1) => res1.json())
              .then((data) => {
                // console.log("user:", data);
                if (data.isExisted) {
                  setUser(data.user);
                  return;
                } else {
                  setUser(res.data);
                  console.log("i", user);
                  fetch(`http://localhost:5050/api/create-new-user`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      userName: res.data.email,
                      password: "0",
                      roleId: 2,
                      email: res.data.email,
                      isLoginGoogle: true,
                      image: res.data.picture,
                      displayName: res.data.name,
                    }),
                  })
                    .then((res) => console.log(res))
                    .catch((e) => console.log(e));

                  return;
                }
              })
              .catch((e) => console.log(e));

            //   if (!isExisted) {
            //     console.log("check", isExisted);
            //     fetch(`http://localhost:5050/api/create-new-user`, {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       credentials: "include",
            //       body: JSON.stringify({
            //         userName: res.data.name,
            //         password: "0",
            //         email: res.data.email,
            //         isLoginGoogle: true,
            //         image: res.data.picture,
            //         displayName: res.data.name,
            //       }),
            //     })
            //       .then((res) => console.log(res))
            //       .catch((e) => console.log(e));
            //   }
            return;
          }
          setUser({});
        })
        .catch((e) => console.log(e));
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
