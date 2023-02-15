{
  /* 
최초 작성자: 김민준
수정 작성자: 김민준
최초 작성일: 23.02.13
수정 작성일: 23.02.13

Ver 1.0.0

- 사용 예시:
<CommonBtn
text="버튼 이름"
color="버튼 색깔"
onClick={() => console.log("Clicked")}
/> 

- 버튼 색깔
default="blue"
종류: "white, pink, blue, yellow emerald"
*/
}
import chick2 from "./../../../assets/characters/chick_02.svg";
import chick5 from "./../../../assets/characters/chick_05.svg";
import chick7 from "./../../../assets/characters/chick_07.svg";
import { Link } from "react-router-dom";

import AlertBox from "./../../atoms/AlertBox/index";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";
function NotFound() {
  return (
    <>
      <div className="-translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] absolute">
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
