import Rice from "../../../assets/images/sidebar/rice.svg";
import HomeBox from "../../atoms/HomeBox";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";

function RiceEatHomeBox(params) {
  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">
        친구들과 밥 먹기!
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={Rice} style={{ height: 150, width: 150 }} />
      </div>
      <div>
        <GamePlayBtn text={"밥 같이 먹으러 가기"} color="blue" />
      </div>
    </HomeBox>
  );
}

export default RiceEatHomeBox;
