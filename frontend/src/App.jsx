import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lobby from "./components/pages/Lobby";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Video from "./webRTC/Video";
import HomePage from "./components/pages/HomePage/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/facepage" element={<Video />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
