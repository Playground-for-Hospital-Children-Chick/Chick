import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo";
import { Link } from "react-router-dom";
import AlertBox from "../../atoms/AlertBox";
import chick_02 from "../../../assets/characters/chick_02.svg";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";

function FindPassword() {
  return (
    <div className="flex	 justify-center h-screen items-center ">
      <AlertBox>
        <div className="top w-21 flex justify-center">
          <img className="inline after:mr-5 w-1/6" src={chick_02} alt="병아리캐릭터" />
          <span className="mr-28 text-center inline-block my-10 font-chick text-3xl">비밀번호를알려줘</span>
        </div>
        <div className="top w-21 flex justify-center">
          <span className="ml-20 mr-28 text-center inline-block my-10 font-chick text-xl">
            비밀번호를 찾고자하는 이메일을 입력해주세요
          </span>
        </div>
        <div className="form">
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div className="ml-10 mb-10 flex justify-center items-center mr-[3em]">
                <InputBox />
              </div>
            </div>
            <div className="">
              <GamePlayBtn text="비밀번호찾기" color="bg-emerald-300" type="submit" />
            </div>
          </form>
        </div>
      </AlertBox>
    </div>
  );
}

export default FindPassword;
