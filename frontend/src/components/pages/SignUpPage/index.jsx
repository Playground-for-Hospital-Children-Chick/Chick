import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo/index";
import InputBox from "../../atoms/Input";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";
import { useState } from "react";

function SignUp() {
  return (
    <>
      <div className="mt-5 mr-5 flex justify-between navbar">
        <Logo />

        <CommonBtn text="로그인" color="bg-blue-300" />
      </div>
      <div className="ml-[5em] gap-x-10 email flex items-center justify-center">
        <label className="mr-[3em] font-chick text-xl" htmlFor="email">
          이메일
        </label>
        <InputBox />
        <CommonBtn text="이메일 확인" color="bg-emerald-300" />
      </div>
      <div className="gap-x-10 mt-10 password flex items-center justify-center">
        <label className="mr-[1em] font-chick text-xl" htmlFor="password">
          비밀번호
        </label>
        <InputBox marginleft={"ml-[3em]"} />
      </div>
      <div className="gap-x-10 mt-10 passwordcheck flex items-center justify-center">
        <label className="mr-[1em] font-chick text-xl" htmlFor="passwordcheck">
          비밀번호 확인
        </label>
        <InputBox />
      </div>
      <div className="gap-x-10 mt-10 childname flex items-center justify-center">
        <label className="mr-5 font-chick text-xl" htmlFor="childname">
          자녀이름
        </label>
        <InputBox />
      </div>
      <div className="gap-x-10 mt-10 birth flex items-center justify-center">
        <label className="mr-5 font-chick text-xl" htmlFor="birth">
          출생
        </label>
        <CalenderSelectBox />
      </div>
      <div className="mt-10">
        <CommonBtn text="회원가입" color="bg-emerald-300" />
      </div>
    </>
  );
}

export default SignUp;
