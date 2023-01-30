import { useState } from "react";


import "./App.css";
import CommonBtn from "../src/components/atoms/CommonBtn";
import InputBox from "./components/atoms/Input";
import Video from "./webRTC/Video";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CommonBtn buttonName={"처음 만든 버튼"} />
      <InputBox />
      <Video/>
    </div>
  );
}

export default App;
