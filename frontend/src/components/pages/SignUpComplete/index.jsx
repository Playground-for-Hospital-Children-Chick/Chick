{
  /* 
최초 작성자: 엄희원
수정 작성자: 최정온
최초 작성일: 23.02.09
수정 작성일: 23.02.14

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
import { useNavigate } from "react-router-dom";
import AlertBox from "../../atoms/AlertBox";
import chick_02 from "../../../assets/characters/chick_02.svg";
import chick_01 from "../../../assets/characters/chick_01.svg";
import CommonBtn from "./../../atoms/CommonBtn/index";

function SignUpComplete() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen items-center font-chick text-4xl ">
      <AlertBox>
        <div className="mt-[2em]">
          <div>축하해요</div>
          <div>회원가입 완료</div>
          <div>친구 만나러 가볼까요?</div>
          <div
            className="flex justify-center
    "
          >
            <div>
              <img src={chick_02} className="w-[4em]" />
            </div>
            <div className="flex items-center ml-[2em] mr-[2em]">
              <CommonBtn
                text="확인"
                color="bg-emerald-300"
                onClick={() => {
                  navigate("/home");
                }}
              />
            </div>
            <div>
              <img src={chick_01} className="w-[4em]" />
            </div>
          </div>
        </div>
      </AlertBox>
    </div>
  );
}

export default SignUpComplete;
