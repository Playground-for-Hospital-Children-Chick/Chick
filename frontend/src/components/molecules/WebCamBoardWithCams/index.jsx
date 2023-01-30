{
  /* 
      최초 작성자: 엄희원
      수정 작성자: 엄희원
      최초 작성일: 23.01.30
      수정 작성일: 23.01.30
      
      Ver 1.0.0
      
      - 사용 예시: 얼굴놀이방의 화상 화면 컴포넌트
        <WebCamBoardWithCams />
      */
}

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
