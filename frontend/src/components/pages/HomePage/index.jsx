import SideBar from "../../molecules/SideBar";
import FacePlay from "../../organism/FacePlay/index.";
import React from "react";
import RiceEat from "./../../organism/RiceEat/index";
import FullScreenBtn from "../../atoms/FullScreenBtn/index";
import Dance from "../../organism/dance";
import Painting from "../../organism/painting";

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
        <div>아직 페이지를 만들고 있어요..</div>
        <FullScreenBtn />
      </div>
    );
  }
}

export default HomePage;
