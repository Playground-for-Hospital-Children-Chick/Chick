import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/LoginPage";
import Logout from "./components/pages/LogoutPage";
import HomePage from "./components/pages/HomePage/index";
import SignUpComplete from "./components/pages/SignUpComplete/index";
import CodeModal from "./components/molecules/EmailCodeModal/index";
import SignUp from "./components/pages/SignUpPage/index";
import WhiteBoard from "./WhiteBoard/index";
import PwChange from "./components/pages/PwChange/index";
import SelectCharacter from "./components/molecules/CharacterSelect/index";
import { useSelector } from "react-redux";

import SingDance from "./singDance/Video";

import VideoRoomComponent from "./faceRTC/VideoRoomComponent";
import PaintingPage from "./components/pages/paintingPage";

import FindEmail from "./components/pages/FindId";
import FindPassword from "./components/pages/FindPassword";

import YouTubeVideo from "./youtube";
import InitPage from "./components/pages/InitPage/index";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="App h-full w-full">
      <Router>
        <Routes>
          <Route path="/" element={<InitPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/facepage"
            element={
              <VideoRoomComponent
                user={user["userChName"]}
                email={user["userEmail"]}
                userType={user["userType"]}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/board" element={<WhiteBoard />} />
          <Route path="/singdance" element={<YouTubeVideo />} />
          <Route path="/pwchange" element={<PwChange />} />
          <Route path="/painting" element={<PaintingPage />} />
          <Route path="/findid" element={<FindEmail />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/signupComplete" element={<SignUpComplete />} />
          <Route path="/character" element={<SelectCharacter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
