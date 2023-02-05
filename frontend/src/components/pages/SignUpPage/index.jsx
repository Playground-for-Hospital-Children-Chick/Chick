import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo/index";
import InputBox from "../../atoms/Input";
import { useState } from "react";

function SignUp() {
  return (
    <>
      <div className="mt-5 mr-5 flex justify-between navbar">
        <Logo />
        <CommonBtn text="로그인" color="blue" />
      </div>
      <div className="ml-[5em] gap-x-10 email flex items-center justify-center">
        <label className="mr-5 font-chick text-xl" htmlFor="email">
          이메일
        </label>
        <InputBox />
        <CommonBtn text="이메일 확인" color="emerald" />
      </div>
      <div className="gap-x-10 mt-10 password flex items-center justify-center mr-[11.8em]">
        <label className="mr-5 font-chick text-xl" htmlFor="password">
          비밀번호
        </label>
        <InputBox />
      </div>
      <div className="gap-x-10 mt-10 passwordcheck flex items-center justify-center mr-[14.5em]">
        <label className="mr-1 font-chick text-xl" htmlFor="passwordcheck">
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
        <InputBox />
      </div>
      <div className="mt-10">
        <CommonBtn />
      </div>
    </>
  );
}

export default SignUp;
