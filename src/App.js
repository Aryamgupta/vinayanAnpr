import logo from "./logo.svg";
import "./App.css";
import Login from "../src/Components/Pages/Login/Login";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Records from "./Components/Pages/Records/Records";
import Confriguations from "./Components/Pages/Confriguations/Confriguations";
import Profile from "./Components/Pages/Profile/Profile";
import Navbar from "./Components/Pages/Navbar/Navbar";
import { useState } from "react";
import { Loading } from "./Components/Loading/Loading";
import { AllState } from "./Components/Context/Context";
import RoiMainComponent from "Components/Pages/RoiPart/RoiMainComponent";
import Overlay from "Components/Pages/Overlay/Overlay";

function App() {
  const { loading, setLoading,setOverlay,overlay } = AllState();
  // const location = useLocation();
  const [isNavBar, setIsNavBar] = useState(true);

  localStorage.setItem(
    "x-isense-token",
    "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965"
  );

  return (
    <>
      <div className="mainCoponent">
        <BrowserRouter>
          {isNavBar && <Navbar />}
          <Routes>
            <Route path="/" element={<Login setIsNavBar={setIsNavBar} />} />
            <Route path="dashboard" element={<Dashboard setIsNavBar={setIsNavBar} />} />
            <Route path="records" element={<Records setIsNavBar={setIsNavBar}/>} />
            <Route path="confriguations" element={<Confriguations setIsNavBar={setIsNavBar}/>} />
            <Route path="profile" element={<Profile setIsNavBar={setIsNavBar} />} />
            <Route path="roiPart" element={<RoiMainComponent setIsNavBar={setIsNavBar} />} />
          </Routes>
        </BrowserRouter>
        {overlay && <Overlay />}
        {/* <MainPage/> */}
      </div>
    </>
  );
}

export default App;
