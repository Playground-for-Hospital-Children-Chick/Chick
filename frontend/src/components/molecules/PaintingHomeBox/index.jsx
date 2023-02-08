import Painting from "../../../assets/images/sidebar/painting.svg";
import HomeBox from "../../atoms/HomeBox";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";

function PaintingHomeBox(params) {
  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">
        친구들과 그림 그리기
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={Painting} style={{ height: 150, width: 150 }} />
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <GamePlayBtn text={"그림 그리러 가기"} color="bg-yellow-200" />
      </div>
    </HomeBox>
  );
}

export default PaintingHomeBox;
