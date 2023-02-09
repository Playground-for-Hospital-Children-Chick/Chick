import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo/index";
import InputBox from "../../atoms/Input";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";
import { Link } from "react-router-dom";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import Sex from "../../atoms/Sex";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

function SignUp() {
  const { setValue, formState, handleSubmit, register } = useForm();
  const { errors } = formState;
  const onSignup = (userInput) => {
    userInput["user_birth"] = parseInt(userInput["user_birth"]);
    delete userInput["user_password_check"];
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
      <form className=" space-y-8" onSubmit={handleSubmit(onSignup)}>
        <div className="gap-x-14 email flex items-center justify-center">
          <label className="mr-[1em] font-chick text-xl" htmlFor="user_email">
            이메일
          </label>
          <div className="relative">
            <InputBox
              register={register("user_email", {
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
                name="user_email"
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
          <label
            className="mr-[1.9em] font-chick text-xl"
            htmlFor="user_password"
          >
            비밀번호
          </label>
          <div className="relative">
            <InputBox
              register={register("user_password", {
                required: "비밀번호를 입력하지 않았습니다.",
                pattern: {
                  message: "비밀번호를 확인해주세요.",
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                },
              })}
              // onChange={onEmailChange}
              type="text"
              placeholder={"비밀번호를 입력해주세요".toString()}
            />
            <div className="relatvie w-full">
              <ErrorMessage
                name="user_password"
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
        <div className="mr-[15em] gap-x-5 mt-10 password flex items-center justify-center">
          <label className=" font-chick text-xl" htmlFor="user_password_check">
            비밀번호 확인
          </label>
          <div className="relative">
            <InputBox
              register={register("user_password_check", {
                required: "비밀번호를 입력하지 않았습니다.",
                pattern: {
                  message: "비밀번호형식이 잘못되었습니다.",
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                },
              })}
              // onChange={onEmailChange}
              type="text"
              placeholder={"비밀번호를 입력해주세요".toString()}
            />
            <div className="relatvie w-full">
              <ErrorMessage
                name="user_password_check"
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
        <div className="mr-[15em] gap-x-5 mt-10 password flex items-center justify-center">
          <label
            className="mr-[2.2em] font-chick text-xl"
            htmlFor="user_child_name"
          >
            자녀이름
          </label>
          <div className="relative">
            <InputBox
              register={register("user_child_name", {
                required: "자녀 이름을 입력하지 않았습니다.",
              })}
              // onChange={onEmailChange}
              type="text"
              placeholder={"자녀 이름을 입력해주세요".toString()}
            />
            <div className="relatvie w-full">
              <ErrorMessage
                name="user_child_name"
                errors={errors}
                render={({ message }) =>
                  message == "자녀 이름을 입력하지 않았습니다." ? (
                    <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                      {message}
                    </div>
                  ) : null
                }
              />
            </div>
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
                })}
                // onChange={onEmailChange}
                type="text"
                placeholder={"부모님 이름을 입력해주세요".toString()}
              />
            </div>
            <div className="relatvie w-full">
              <ErrorMessage
                name="user_parent_name"
                errors={errors}
                render={({ message }) =>
                  message == "부모님 이름을 입력하지 않았습니다." ? (
                    <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                      {message}
                    </div>
                  ) : null
                }
              />
            </div>
          </div>
        </div>
        <div className="mr-[15.5em] mt-10 birth flex items-center justify-center">
          <label
            className="mr-[2.7em] font-chick text-xl"
            htmlFor="birthAndSex"
          >
            출생/성별
          </label>
          <CalenderSelectBox
            register={register("user_birth", {
              required: "생일을 입력하지 않으셨습니다.",
            })}
          />
          <div className="ml-[0.5em]">
            <Sex
              register={register("user_sex", {
                required: "생일을 입력하지 않으셨습니다.",
              })}
            />
          </div>
        </div>
        <div className="mr-[10em] mt-10">
          <GamePlayBtn text="회원가입" color="bg-emerald-300" type="submit" />
        </div>
      </form>
    </>
  );
}

export default SignUp;
