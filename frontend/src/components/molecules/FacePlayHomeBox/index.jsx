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
import { ReactComponent as ChildOne } from "../../../assets/images/faceplay/child_one.svg";
import { ReactComponent as ChildTwo } from "../../../assets/images/faceplay/child_two.svg";
import { ReactComponent as ChildThree } from "../../../assets/images/faceplay/child_three.svg";
import { ReactComponent as ChildFour } from "../../../assets/images/faceplay/child_four.svg";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";

function FacePlayHomeBox() {
  return (
    <HomeBox>
      <p className="font-chick text-4xl w-[368px] h-[48px] absolute text-center text-black/[0.66]">
        친구들과 밥 먹기!
      </p>
      <ChildOne />
      <ChildTwo />
      <ChildThree />
      <ChildFour />
      <GamePlayBtn text={"친구들 만나러 가기"} />
    </HomeBox>
  );
}

export default FacePlayHomeBox;
