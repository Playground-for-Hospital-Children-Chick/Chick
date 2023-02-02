{
  /* 
    최초 작성자: 엄희원
    수정 작성자: 엄희원
    최초 작성일: 23.01.29
    수정 작성일: 23.01.30
    
    Ver 1.0.0
    최초 버전
    
    - 사용 예시: ar 페이지 bot bar
    */
}

import CommonBtn from "./../../atoms/CommonBtn/index";
import ArBottomBarBase from "./../../atoms/ArBottomBarBase/index";

function ArBottomBar() {
  return (
    <ArBottomBarBase>
      <CommonBtn text="나가기" color="pink" />
    </ArBottomBarBase>
  );
}

export default ArBottomBar;
