import AlertBox from "./../../atoms/AlertBox/index";
import CloseMark from "./../../../assets/favicon/closemark.svg";
import chick1 from "./../../../assets/characters/chick_01.svg";
import chick2 from "./../../../assets/characters/chick_02.svg";
import chick3 from "./../../../assets/characters/chick_03.svg";
import chick4 from "./../../../assets/characters/chick_04.svg";
import chick5 from "./../../../assets/characters/chick_05.svg";
import chick6 from "./../../../assets/characters/chick_06.svg";
import chick7 from "./../../../assets/characters/chick_07.svg";
import chick8 from "./../../../assets/characters/chick_08.svg";
import chick9 from "./../../../assets/characters/chick_09.svg";
import chick10 from "./../../../assets/characters/chick_10.svg";
import axios from "axios";
import Swal from "sweetalert2";

import { SET_PROFILE_PATH } from "../../../store/reducers/UserReducer";
import { useDispatch } from "react-redux";

const characterList = [
  "/assets/characters/chick_01.svg",
  "/assets/characters/chick_02.svg",
  "/assets/characters/chick_03.svg",
  "/assets/characters/chick_04.svg",
  "/assets/characters/chick_05.svg",
  "/assets/characters/chick_06.svg",
  "/assets/characters/chick_07.svg",
  "/assets/characters/chick_08.svg",
  "/assets/characters/chick_09.svg",
  "/assets/characters/chick_10.svg",
];

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";

function SelectCharacter({ setModal, email, setProfilePath }) {
  const dispatch = useDispatch();

  function updateCharacter(index) {
    // console.log(index);

    axios({
      method: "put",
      url: APPLICATION_SERVER_URL + "api/users/profile/change",
      params: {
        email: email,
        filePath: characterList[index],
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then((response) => {
      if (response.status == 200) {
        dispatch(
          SET_PROFILE_PATH({
            profilePath: characterList[index],
          })
        );

        Swal.fire({
          icon: "success",
          title: "프로필 변경 성공",
          confirmButtonText: "확인",
          confirmButtonColor: "#8cc8ff",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setModal();
            return;
          }
        });
      }
    });
  }

  return (
    <>
      <AlertBox
        color="bg-white"
        scrollbar="scrollbar-hide"
        overflow="overflow-y-auto"
      >
        <div className="ml-[0.5em] mr-[1em] mt-[1em] flex flex-row justify-between">
          <div className="ml-[0.5em] mt-[0.5em] font-chick text-3xl">
            보유 캐릭터
          </div>
          <button
            onClick={() => {
              setModal();
            }}
          >
            <img
              className="inline after:mr-5 w-[3em]"
              src={CloseMark}
              alt="x표시"
            />
          </button>
        </div>
        <hr />
        <div className="h-42 w-full character">
          <div className="flex flex-row">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(0)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick1} alt="1번병아리" />
                  <div class="flex flex-col justify-center">
                    <p className="text-2xl">막 태어난 병아리</p>
                    <p>
                      <span>태어난 지 얼마 안된 병아리</span>
                      <br />
                      <span>아직은 어리지만 가지고 있는 꿈</span>
                      <br />
                      <span>은 우주만큼 크다.</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(1)}>
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
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(2)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick3} alt="8번병아리" />
                  <div class="flex flex-col justify-center">
                    <p className="text-2xl">루루</p>
                    <p>
                      <span>다리가 아파서 입원한 루루</span>
                      <br />
                      <span>춤추거나 율동하는 것을 좋아하고</span>
                      <br />
                      <span>맛있는 것도 좋아한다.</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(3)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick4} alt="9번병아리" />
                  <div className="flex flex-col justify-center">
                    <p className="text-2xl">코코</p>
                    <p>
                      <span>무릎을 다쳐서 입원한 코코</span>
                      <br />
                      <span>그림을 특히 좋아하고</span>
                      <br />
                      <span>책 읽는 것을 좋아한다.</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(4)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick5} alt="10번병아리" />
                  <div class="flex flex-col justify-center">
                    <p className="text-2xl">아리</p>
                    <p>
                      <span>발목이 삐어서 병원에 입원한</span>
                      <br />
                      <span>'아리'는 병아리 게임을 통해</span>
                      <br />
                      <span>친구를 사귀고 싶다.</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(5)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick6} alt="3번병아리" />
                  <div className="flex flex-col justify-center">
                    <p className="text-2xl">입원한 병아리</p>
                    <p>
                      <span>얼마 전에 입원한 병아리</span>
                      <br />
                      <span>아픈 와중에도</span>
                      <br />
                      <span>긍적적으로 생각하는 병아리이다.</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(6)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick7} alt="7번병아리" />
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
              </button>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(7)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick8} alt="4번병아리" />
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
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(8)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick9} alt="5번병아리" />
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
              </button>
            </div>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <button onClick={() => updateCharacter(9)}>
                <div className="w-[390px] flex flex-row font-chick">
                  <img className="w-[180px]" src={chick10} alt="6번병아리" />
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
              </button>
            </div>
          </div>
        </div>
      </AlertBox>
    </>
  );
}

export default SelectCharacter;
