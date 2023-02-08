import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/LoginPage";
import Logout from "./components/pages/LogoutPage";
import HomePage from "./components/pages/HomePage/index";
import SignUp from "./components/pages/SignUpPage/index";
import WhiteBoard from "./WhiteBoard/index";
import { useSelector } from "react-redux";

import SingDance from "./singDance/Video";

import VideoRoomComponent from "./webRTC_3/VideoRoomComponent";
import PaintingPage from "./components/pages/paintingPage";

import FindEmail from "./components/pages/FindId";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/facepage" element={<VideoRoomComponent user={user["userChName"]} email={user["userEmail"]} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/board" element={<WhiteBoard />} />
          <Route path="/singdance" element={<SingDance />} />
          <Route path="/painting" element={<PaintingPage />} />
          <Route path="/findid" element={<FindEmail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
