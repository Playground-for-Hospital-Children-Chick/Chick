import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CommonBtn from "../src/components/atoms/CommonBtn";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CommonBtn buttonName={"처음 만든 버튼"} />
    </div>
  );
}

export default App;
