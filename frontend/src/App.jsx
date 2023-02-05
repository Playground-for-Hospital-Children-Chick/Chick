import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lobby from "./components/pages/LobbyPage";
import Login from "./components/pages/LoginPage";
import Logout from "./components/pages/LogoutPage";
import Video from "./webRTC/Video";
import HomePage from "./components/pages/HomePage/index";
import SignUp from "./components/pages/SignUpPage/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/facepage" element={<Video />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
