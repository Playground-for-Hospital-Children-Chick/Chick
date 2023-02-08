import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo";
import { Link } from "react-router-dom";
import AlertBox from "../../atoms/AlertBox";
import chick_02 from "../../../assets/characters/chick_02.svg";
import GamePlayBtn from "../../atoms/GamePlayBtn";

function Logout2() {
  return (
    <div className="flex	 justify-center h-screen items-center ">
      <AlertBox>
        <form className="mt-8 space-y-6" action=" ">
          <div className="top w-21 flex justify-center">
            <img className="inline after:mr-5 w-1/6" src={chick_02} alt="병아리캐릭터" />
            <span className="mr-28 text-center inline-block my-10 font-chick text-3xl">아이디를알려줘</span>
          </div>
          <div className="mr-[15.5em] mt-10 childname flex items-center justify-center">
            <label className="mr-[2.5em] font-chick text-xl" htmlFor="childname">
              보호자이름
            </label>
            <InputBox />
          </div>
          <div className="mr-[15.5em] mt-10 childname flex items-center justify-center">
            <label className="mr-[2.5em] font-chick text-xl" htmlFor="childname">
              이름
            </label>
            <InputBox />
          </div>
          <div className="mr-[15.5em] mt-10 childname flex items-center justify-center">
            <label className="mr-[2.5em] font-chick text-xl" htmlFor="childname">
              출생
            </label>
            <InputBox />
          </div>
          <div>
            <GamePlayBtn text="찾기" color="bg-emerald-300" type="submit" />
          </div>
        </form>
      </AlertBox>
    </div>
  );
}

export default Logout2;
