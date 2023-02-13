import chick1 from "./../../../assets/characters/chick_01.svg";
import chick2 from "./../../../assets/characters/chick_02.svg";
import chick3 from "./../../../assets/characters/chick_03.svg";
import chick4 from "./../../../assets/characters/chick_04.svg";
import chick5 from "./../../../assets/characters/chick_05.svg";
import chick6 from "./../../../assets/characters/chick_06.svg";
import chick7 from "./../../../assets/characters/chick_07.svg";
import AlertBox from "./../../atoms/AlertBox/index";
import { FullscreenExit } from "@material-ui/icons/FullscreenExit";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";
function NotFound() {
  return (
    <>
      <div>
        <AlertBox>
          <div className="mt-[5em] flex flex-col items-center">
            <div className="text-3xl font-chick">
              페이지를 찾을 수 없습니다.
            </div>
            <div className="mt-[3em] flex flex-row justify-center">
              <div>
                <div className="text-2xl font-chick">함께</div>
                <img className="w-[200px]" src={chick2} alt="병아리2" />
              </div>
              <div className="text-2xl font-chick">
                <div>놀러</div>

                <img className="w-[200px]" src={chick5} alt="병아리5" />
              </div>
              <div className="text-2xl font-chick">
                <div>가자</div>

                <img className="w-[200px]" src={chick7} alt="병아리7" />
              </div>
            </div>
            <Link to="/">
              <GamePlayBtn text="메인 화면으로 가기" color="bg-emerald-300" />
            </Link>
          </div>
        </AlertBox>
      </div>
    </>
  );
}

export default NotFound;
