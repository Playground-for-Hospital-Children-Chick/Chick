import React from "react";
import FriendIsComing from "../../atoms/FriendIsComing";
import WebCamBoard from "../../atoms/WebCamBoard/index";

function WebCamBoardWithCams() {
  return (
    <WebCamBoard>
      <div className="font-chick bg-yellow-200 m-3 rounded-[30px]">주성</div>
      <div className="font-chick bg-yellow-200 m-3 rounded-[30px]">정온</div>
      <div className="font-chick bg-yellow-200 m-3 rounded-[30px]">재욱</div>
      <FriendIsComing />
    </WebCamBoard>
  );
}

export default WebCamBoardWithCams;
