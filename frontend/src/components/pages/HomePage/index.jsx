import SideBar from "../../molecules/SideBar";
import FacePlay from "../../organism/FacePlay/index.";
import React from "react";
import RiceEat from "./../../organism/RiceEat/index";

function HomePage({ children }) {
  let [index, setIndex] = React.useState(0);

  return (
    <div className="flex flex-row">
      <SideBar index={index} setIndex={setIndex} />
      {index == 0 ? <FacePlay /> : <RiceEat />}
    </div>
  );
}

export default HomePage;
