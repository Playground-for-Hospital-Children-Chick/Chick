import Dance from "../../../assets/images/sidebar/dance.svg";
import HomeBox from "../../atoms/HomeBox";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";

function DanceHomeBox(params) {
  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">
        친구들과 율동 따라하기
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={Dance} style={{ height: 150, width: 150 }} />
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <GamePlayBtn text={"율동하러 가기"} color="bg-skyblue-200" />
      </div>
    </HomeBox>
  );
}

export default DanceHomeBox;
