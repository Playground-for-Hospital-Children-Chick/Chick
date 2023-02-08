import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo";
import { Link } from "react-router-dom";
import AlertBox from "../../atoms/AlertBox";
import chick_02 from "../../../assets/characters/chick_02.svg";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";

function FindEmail() {
  return (
    <div className="flex	 justify-center h-screen items-center ">
      <AlertBox>
        <div className="top w-21 flex justify-center">
          <img className="inline after:mr-5 w-1/6" src={chick_02} alt="병아리캐릭터" />
          <span className="mr-28 text-center inline-block my-10 font-chick text-3xl">아이디를알려줘</span>
        </div>
        <div className="form">
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div className="mb-10 flex justify-center items-center mr-[5em]">
                <label className="mr-9 font-chick text-lg" htmlFor="parentName">
                  부모님이름
                </label>
                <InputBox />
              </div>
              <div className="mb-10 flex justify-center items-center mr-[5.5em]">
                <label className="mr-8 font-chick text-lg" htmlFor="childrenName">
                  자녀이름
                </label>
                <div className="ml-3">
                  <InputBox />
                </div>
              </div>
              <div className="mb-10 flex justify-center items-center mr-[5.5em]">
                <label className="mr-6 font-chick text-lg" htmlFor="childrenName">
                  자녀출생일
                </label>
                <CalenderSelectBox />
              </div>
            </div>
            <div className="">
              <GamePlayBtn text="아이디찾기" color="bg-emerald-300" type="submit" />
            </div>
          </form>
        </div>
      </AlertBox>
    </div>
  );
}

export default FindEmail;
