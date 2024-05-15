import { useState } from "react";

import Modal from "react-modal";
import { redirect, useNavigate } from "react-router-dom";
import firebase, { auth } from "../../firebase/config";
import { useGoogleLogin } from "@react-oauth/google";

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isLoginUI, setIsLoginUI] = useState(true);
  const history = useNavigate();

  const BASEURL = "http://localhost:5050";
  const handleFormSubmit = (e) => {
    setError("");
    e.preventDefault();

    let checkPassLength = password.length < 8 ? false : true;
    if (!checkPassLength) {
      setError("Password must have 8  characters or more.");
      return;
    }
    let subUrl = "";
    if (isLoginUI) {
      subUrl = "login";
    } else {
      subUrl = "api/create-new-user";
    }

    fetch(`${BASEURL}/${subUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userName: username,
        password: password,
        displayName: displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          if (data.data.roleId === 1) {
            localStorage.setItem("isLoginWithAcc", true);

            history("/");
            props.handleCloseLoginModal();
            window.location.reload();
          } else {
            history("/admin");
            // window.location.reload();
          }
        } else if (data.code === 1) {
          alert(data.message);
          handleCheckUI();
        } else {
          setError(data.message);
          console.log("data", data);
        }
      })
      .catch((e) => console.log(e));
  };

  // const ggProvider = new firebase.auth.GoogleAuthProvider();
  // ggProvider.addScope(
  //   "profile openid https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.force-ssl"
  // );
  // const handleLoginWithGG = () => {
  //   auth.signInWithPopup(ggProvider);
  // };

  const handleCheckUI = () => {
    setIsLoginUI(!isLoginUI);
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      localStorage.setItem("access_token", codeResponse.access_token);

      props.handleCloseLoginModal();
      history("/");
      window.location.reload();
    },
    scope:
      "profile openid https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.force-ssl",
    onError: (e) => console.log(e),
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "2",
      position: "absolute",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
    },
  };

  return (
    <Modal
      //   afterOpenModal={afterOpenModal}
      isOpen={props.isOpen}
      // onRequestClose={closeModal}
      style={customStyles}
    >
      {/* <div className="grid gap-8" style={{ width: "50%" }}>
        <div
          id="back-div"
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
              {isLoginUI ? "Log in" : "Sign up"}
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label for="email" className="mb-2  dark:text-gray-400 text-lg">
                  Username
                </label>
                <input
                  id="email"
                  className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="Email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLoginUI && (
                <>
                  <div>
                    <label
                      for="displayName"
                      className="mb-2  dark:text-gray-400 text-lg"
                    >
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="DisplayName"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="rePassword"
                      className="mb-2 dark:text-gray-400 text-lg"
                    >
                      Nhập lại Password
                    </label>
                    <input
                      id="rePassword"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              {error !== null && <span style={{ color: "red" }}>{error}</span>}
              <button
                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                {isLoginUI ? "LOGIN" : "SIGN UP"}
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                {isLoginUI ? "Don't have an account?" : "Have you a account?"}
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out cursor-pointer"
                  onClick={handleCheckUI}
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    {isLoginUI ? "Sign Up" : "Login"}
                  </span>
                </a>
              </h3>
            </div>

            <div
              id="third-party-auth"
              className="flex items-center justify-center mt-5 flex-wrap"
            >
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
              </button>

              <button
                href="#"
                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              >
                <img
                  className="max-w-[25px] filter dark:invert"
                  src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                  alt="Github"
                />
              </button>
            </div>

            <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
              <p className="cursor-default">
                By signing in, you agree to our
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Terms
                  </span>
                </a>
                and
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Privacy Policy
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div
        style={{}}
        className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
      >
        <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
          {isLoginUI ? "Log in" : "Sign up"}
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label for="email" className="mb-2  dark:text-gray-400 text-lg">
              Username
            </label>
            <input
              id="email"
              className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              type="text"
              placeholder="Email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label for="password" className="mb-2 dark:text-gray-400 text-lg">
              Password
            </label>
            <input
              id="password"
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLoginUI && (
            <>
              <div>
                <label
                  for="displayName"
                  className="mb-2  dark:text-gray-400 text-lg"
                >
                  Display Name
                </label>
                <input
                  id="displayName"
                  className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="DisplayName"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="rePassword"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Nhập lại Password
                </label>
                <input
                  id="rePassword"
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {error !== null && <span style={{ color: "red" }}>{error}</span>}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-2/5 hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              {isLoginUI ? "LOGIN" : "SIGN UP"}
            </button>
            <button
              className="mt-6 p-2  rounded-lg w-2/5 bg-yellow-50 text-black"
              onClick={() => props.handleCloseLoginModal()}
            >
              CANCEL
            </button>
          </div>
        </form>
        <div className="flex flex-col mt-4 items-center justify-center text-sm">
          <h3 className="dark:text-gray-300">
            {isLoginUI ? "Don't have an account?" : "Have you a account?"}
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out cursor-pointer"
              onClick={handleCheckUI}
            >
              <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                {isLoginUI ? "Sign Up" : "Login"}
              </span>
            </a>
          </h3>
        </div>

        <div
          id="third-party-auth"
          className="flex items-center justify-center mt-5 flex-wrap"
        >
          <button
            className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            onClick={() => login()}
          >
            <img
              className="max-w-[25px]"
              src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Google"
            />
          </button>

          <button
            href="#"
            className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
          >
            <img
              className="max-w-[25px] filter dark:invert"
              src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
              alt="Github"
            />
          </button>
        </div>

        <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
          <p className="cursor-default">
            By signing in, you agree to our
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
              <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Terms
              </span>
            </a>
            and
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
              <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Privacy Policy
              </span>
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginScreen;
