import "./App.css";
import NavBarLeft from "./components/NavBarLeft";
import NavBarTop from "./components/NavBarTop";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import Discover from "./screens/Discover/discovers";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <NavBarTop />
        <NavBarLeft />

        <Routes>

          <Route path="/" element={<HomeScreen />} />
          <Route path="/discover" element={<Discover/>}/>
        </Routes>
      </BrowserRouter>
    </div>

    // <BrowserRouter>
    //   <NavBarTop />
    //   <NavBarLeft />
    //   <Routes>
    //     <Route path="/" element={<HomeScreen />}>
    //       {/* <Route index element={<HomeScreen />} /> */}
    //       <Route path="/explore" element={<ExploreScreen />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
