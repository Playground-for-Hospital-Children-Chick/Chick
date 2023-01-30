{
  /* 
      최초 작성자: 최정온
      수정 작성자: 최정온
      최초 작성일: 23.01.30
      수정 작성일: 23.01.30
      
      Ver 1.0.0
      
      - 사용 예시:
        <FacePlayHomeBox />
      */
}

import HomeBox from "../../atoms/HomeBox";
import ChildOne from "../../../assets/images/faceplay/child_one.svg";
import ChildTwo from "../../../assets/images/faceplay/child_two.svg";
import ChildThree from "../../../assets/images/faceplay/child_three.svg";
import ChildFour from "../../../assets/images/faceplay/child_four.svg";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";

function FacePlayHomeBox() {
  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">
        친구들과 영상 놀이터
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={ChildOne} style={{ height: 87, width: 154 }} />
        <img src={ChildTwo} style={{ height: 87, width: 154 }} />
        <img src={ChildThree} style={{ height: 87, width: 154 }} />
        <img src={ChildFour} style={{ height: 87, width: 154 }} />
      </div>
      <div>
        <GamePlayBtn text={"친구들 만나러 가기"} color="emerald" />
      </div>
    </HomeBox>
  );
}

export default FacePlayHomeBox;
