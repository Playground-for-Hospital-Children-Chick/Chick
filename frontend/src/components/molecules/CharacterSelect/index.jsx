import AlertBox from "./../../atoms/AlertBox/index";
import CloseMark from "./../../../assets/favicon/closemark.svg";
import chick1 from "./../../../assets/characters/chick_01.svg";
import chick2 from "./../../../assets/characters/chick_02.svg";
import chick3 from "./../../../assets/characters/chick_03.svg";
import chick4 from "./../../../assets/characters/chick_04.svg";
import chick5 from "./../../../assets/characters/chick_05.svg";
import chick6 from "./../../../assets/characters/chick_06.svg";
import chick7 from "./../../../assets/characters/chick_07.svg";

function SelectCharacter() {
  return (
    <>
      <AlertBox
        color="bg-emerald-300"
        scrollbar="scrollbar-hide"
        overflow="overflow-y-auto"
      >
        <div className="ml-[0.5em] mr-[1em] mt-[1em] flex flex-row justify-between">
          <div className="ml-[0.5em] mt-[0.5em] font-chick text-3xl">
            보유 캐릭터
          </div>
          <img
            className="inline after:mr-5 w-[3em]"
            src={CloseMark}
            alt="x표시"
          />
        </div>
        <hr className="" />
        <div className="h-42 w-full character">
          <div className="flex flex-row">
            <div>
              <div className="w-[390px] flex flex-row font-chick">
                <img className="w-[180px]" src={chick1} alt="1번병아리" />
                <div class="flex flex-col justify-center">
                  <p className="text-2xl">막 태어난 병아리</p>
                  <p>
                    <span>태어난 지 얼마 안된 병아리</span>
                    <br />
                    <span>아직은 어리지만 거지고 있는 꿈</span>
                    <br />
                    <span>은 우주만큼 크다.</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[390px] flex flex-row font-chick">
                <img className="w-[180px]" src={chick2} alt="2번병아리" />
                <div className="flex flex-col justify-center">
                  <p className="text-2xl">행복한 병아리</p>
                  <p>
                    <span>긍정적인 성격의 행복한 병아리</span>
                    <br />
                    <span>인생에는 즐거운 일이 가득하다고</span>
                    <br />
                    <span> 믿는다.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div>
              <div className="w-[390px] flex flex-row font-chick">
                <img className="w-[180px]" src={chick3} alt="1번병아리" />
                <div class="flex flex-col justify-center">
                  <p className="text-2xl">수줍은 병아리</p>
                  <p>
                    <span>누구보다 먼저다가가고 싶지만 </span>
                    <br />
                    <span>매우 수줍어서 선뜻</span>
                    <br />
                    <span>다가가는게 어려운 병아리이다.</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[390px] flex flex-row font-chick">
                <img className="w-[180px]" src={chick4} alt="2번병아리" />
                <div className="flex flex-col justify-center">
                  <p className="text-2xl">어린이 병아리</p>
                  <p>
                    <span>이제 막 유치원에 입학한</span>
                    <br />
                    <span>어린이 병아리, 좋은 친구들을</span>
                    <br />
                    <span>많이많이 사귀고 싶다.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div>
              <div className="w-[390px] flex flex-row font-chick">
                <img className="w-[180px]" src={chick5} alt="1번병아리" />
                <div class="flex flex-col justify-center">
                  <p className="text-2xl">동그란 병아리</p>
                  <p>
                    <span>입도 머리도 모든게 다 동글</span>
                    <br />
                    <span>동그란 모습을 보고있으면</span>
                    <br />
                    <span>너무 귀여워서 말을 걸게 된다.</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[390px] flex flex-row font-chick">
                <img className="w-[180px]" src={chick6} alt="2번병아리" />
                <div className="flex flex-col justify-center">
                  <p className="text-2xl">똑똑한 병아리</p>
                  <p>
                    <span>항상 1등을 하는 병아리</span>
                    <br />
                    <span>누구보다 배운것을 먼저 습득하여</span>
                    <br />
                    <span>주위 학생들에게 가르쳐주는 병아리이다.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-[390px] flex flex-row font-chick">
              <img className="w-[180px]" src={chick7} alt="2번병아리" />
              <div className="flex flex-col justify-center">
                <p className="text-2xl">꿈많은 병아리</p>
                <p>
                  <span>항상 자신이 되고 싶은것이</span>
                  <br />
                  <span>매일 매일 새롭게 생겨나는 병아리</span>
                  <br />
                  <span>그 호기심이 밝은 성격을 만들어 냈다.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AlertBox>
    </>
  );
}

export default SelectCharacter;
