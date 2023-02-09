import SideBar from "../../molecules/SideBar";
import FacePlay from "../../organism/FacePlay/index.";
import React from "react";
import RiceEat from "./../../organism/RiceEat/index";
import FullScreenBtn from "../../atoms/FullScreenBtn/index";
import Dance from "../../organism/Dance";
import Painting from "../../organism/Painting";
import MyPage from "../MyPage";

function HomePage({ children }) {
  let [index, setIndex] = React.useState(0);

  if (index == 0) {
    return (
      <div className="flex flex-row">
        <SideBar index={index} setIndex={setIndex} />
        <FacePlay />
        <FullScreenBtn />
      </div>
    );
  } else if (index == 1) {
    return (
      <div className="flex flex-row">
        <SideBar index={index} setIndex={setIndex} />
        <RiceEat />
        <FullScreenBtn />
      </div>
    );
  } else if (index == 2) {
    return (
      <div className="flex flex-row">
        <SideBar index={index} setIndex={setIndex} />
        <Dance />
        <FullScreenBtn />
      </div>
    );
  } else if (index == 3) {
    return (
      <div className="flex flex-row">
        <SideBar index={index} setIndex={setIndex} />
        <Painting />
        <FullScreenBtn />
      </div>
    );
  } else if (index == 4) {
    return (
      <div className="flex flex-row">
        <SideBar index={index} setIndex={setIndex} />
        <MyPage />
        <FullScreenBtn />
      </div>
    );
  }
}

export default HomePage;
