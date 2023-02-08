import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo/index";
import InputBox from "../../atoms/Input";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";
import { Link } from "react-router-dom";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

function SignUp() {
  const { setValue, formState, handleSubmit, register } = useForm();
  const { errors } = formState;
  const onSignup = async (userInput) => {
    console.log(userInput);
  };

  return (
    <>
      <div className="mt-5 mr-5 flex justify-between navbar">
        <Logo />
        <Link to="/login">
          <CommonBtn text="로그인" color="bg-blue-300" />
        </Link>
      </div>
      <form className=" space-y-6" onSubmit={handleSubmit(onSignup)}>
        <div className=" gap-x-14 email flex items-center justify-center">
          <label className="mr-[1em] font-chick text-xl" htmlFor="email">
            이메일
          </label>
          <div className="relative">
            <InputBox
              register={register("email", {
                required: "이메일을 입력하지 않았습니다.",
                pattern: {
                  message: "이메일형식이 잘못되었습니다.",
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                },
              })}
              // onChange={onEmailChange}
              type="text"
              placeholder={"이메일을 입력해주세요".toString()}
            />
            <div className="relatvie w-full">
              <ErrorMessage
                name="email"
                errors={errors}
                render={({ message }) =>
                  message == "이메일을 입력하지 않았습니다." ? (
                    <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                      {message}
                    </div>
                  ) : (
                    <div className="absolute top-16 text-md font-chick left-[30%]  text-center text-pink-600">
                      {message}
                    </div>
                  )
                }
              />
            </div>
          </div>
          <CommonBtn text="이메일 확인" color="bg-emerald-300" />
        </div>
        <div className="mr-[15em] gap-x-5 mt-10 password flex items-center justify-center">
          <label className="mr-[1.9em] font-chick text-xl" htmlFor="password">
            비밀번호
          </label>
          <div className="relative">
            <InputBox
              register={register(
                "user_password                                                                                                                                                                                    ",
                {
                  required: "비밀번호를 입력하지 않았습니다.",
                  pattern: {
                    message: "비밀번호형식이 잘못되었습니다.",
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                  },
                }
              )}
              // onChange={onEmailChange}
              type="text"
              placeholder={"비밀번호를 입력해주세요".toString()}
            />
            <div className="relatvie w-full">
              <ErrorMessage
                name="email"
                errors={errors}
                render={({ message }) =>
                  message == "비밀번호를 입력하지 않았습니다." ? (
                    <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                      {message}
                    </div>
                  ) : (
                    <div className="absolute top-16 text-md font-chick left-[30%]  text-center text-pink-600">
                      {message}
                    </div>
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="mr-[15em] mt-10 passwordcheck flex items-center justify-center">
          <label
            className="mr-[0.8em] font-chick text-xl"
            htmlFor="passwordcheck"
          >
            비밀번호 확인
          </label>
          <InputBox />
        </div>
        <div className="ml-[0.4em] mr-[15.5em] mt-10 childname flex items-center justify-center">
          <label className="mr-[1.6em] font-chick text-xl" htmlFor="childname">
            자녀이름
          </label>
          <div className="ml-[1.9em] mr">
            <InputBox />
          </div>
        </div>
        <div className="ml-[0.4] mr-[16em] gap-x-14 user_parent_name flex items-center justify-center">
          <label
            className="ml-[0.5em] font-chick text-xl"
            htmlFor="user_parent_name"
          >
            부모님 이름
          </label>
          <div className="relative">
            <div>
              <InputBox
                register={register("user_parent_name", {
                  required: "부모님 이름을 입력하지 않았습니다.",
                  pattern: {
                    message: "이메일형식이 잘못되었습니다.",
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                  },
                })}
                // onChange={onEmailChange}
                type="text"
                placeholder={"이메일을 입력해주세요".toString()}
              />
            </div>
            <div className="relatvie w-full">
              <ErrorMessage
                name="email"
                errors={errors}
                render={({ message }) =>
                  message == "부모님 이름을 입력하지 않았습니다." ? (
                    <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                      {message}
                    </div>
                  ) : (
                    <div className="absolute top-16 text-md font-chick left-[30%]  text-center text-pink-600">
                      {message}
                    </div>
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="mr-[15.5em] mt-10 birth flex items-center justify-center">
          <label className="mr-[4.5em] font-chick text-xl" htmlFor="birth">
            출생
          </label>
          <CalenderSelectBox />
        </div>
        <div className="mr-[10em] mt-10">
          <GamePlayBtn text="회원가입" color="bg-emerald-300" type="submit" />
        </div>
      </form>
    </>
  );
}

export default SignUp;
