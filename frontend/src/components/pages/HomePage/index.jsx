import SideBar from "../../molecules/SideBar";
import FacePlay from "../../organism/FacePlay/index.";
import React from "react";
import FullScreenBtn from "../../atoms/FullScreenBtn/index";
import Dance from "../../organism/Dance";
import Painting from "../../organism/Painting";
import MyPage from "../MyPage";
import CartoonPage from "../CartoonPage";
import { useSelector, useDispatch } from "react-redux";

function HomePage({ children }) {
  const page = useSelector((state) => state.page);

  if (page["pageIndex"] == 0) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <FacePlay />
        {/* <FullScreenBtn /> */}
      </div>
    );
  } else if (page["pageIndex"] == 1) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <Painting />
        {/* <FullScreenBtn /> */}
      </div>
    );
  } else if (page["pageIndex"] == 2) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <Dance />
        {/* <FullScreenBtn /> */}
      </div>
    );
  } else if (page["pageIndex"] == 3) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <CartoonPage />
        {/* <FullScreenBtn /> */}
      </div>
    );
  } else if (page["pageIndex"] == 4) {
    return (
      <div className="flex flex-row justify-end mr-[21em] mt-[1.5em]">
        <SideBar />
        <MyPage />
        {/* <FullScreenBtn /> */}
      </div>
    );
  }
}

export default HomePage;
