import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo/index";
import InputBox from "../../atoms/Input";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";
import { Link, useNavigate } from "react-router-dom";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import Sex from "../../atoms/Sex";
import { useForm } from "react-hook-form";

import { signupUser } from "./../../../api/UsersApi";

import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import CodeModal from "./../../molecules/EmailCodeModal/index";

function SignUp() {
  const { setValue, formState, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;
  const [modal, setModal] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  //회원가입 버튼 누를 시 실행
  const emailInput = (e) => {
    setInputEmail(e.target.value);
  };

  const onSignup = async (userInput) => {
    userInput["user_birth"] = parseInt(userInput["user_birth"]);
    delete userInput["user_password_check"];
    console.log(userInput);
    //회원가입 이메일 작성란이랑 인증된 이메일이랑 비교

    const response = await signupUser(userInput);
    if (parseInt(Number(response.status) / 100) === 2) {
      console.log("회원가입 성공");
      navigate("/signupComplete");
    } else {
      console.log("회원가입 실패");
    }
  };

  return (
    <>
      <div className="mt-5 mr-5 flex justify-between navbar">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/login">
          <CommonBtn text="로그인" color="bg-blue-300" />
        </Link>
      </div>
      {modal === true ? (
        <div className="absolute  -translate-x-[50%] -translate-y-[50%] z-[1000] top-[60%] left-[50%]">
          <CodeModal
            modal={modal}
            setModal={setModal}
            inputEmail={inputEmail}
            checkedEmail={checkedEmail}
            setCheckedEmail={setCheckedEmail}
          />
        </div>
      ) : null}
      <div className="form-entire w-full mb-[7em] justify-center flex flex-row">
        <form
          className="flex flex-col justify-center w-[640px] space-y-8"
          onSubmit={handleSubmit(onSignup)}
        >
          <div className="gap-x-5 mt-[1.2em] password flex items-center">
            <label
              className="mr-[2.5em] font-chick text-xl"
              htmlFor="user_email"
            >
              이메일
            </label>
            <div className="relative">
              <InputBox
                onChange={emailInput}
                register={register("user_email", {
                  required: "이메일을 입력하지 않았습니다.",
                  pattern: {
                    message: "이메일형식이 잘못되었습니다.",
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                  },
                  validate: {
                    check: (val) => {
                      if (checkedEmail !== val) {
                        return "유효한 이메일이 아닙니다.";
                      }
                    },
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
          </div>
          <div className="gap-x-5 mt-10 password flex items-center">
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
                    message: "비밀번호형식이 잘못되었습니다.",
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                  },
                  validate: {
                    check: (val) => {
                      if (getValues("user_password_check") !== val) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                    },
                  },
                })}
                // onChange={onEmailChange}
                type="password"
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
          <div className="gap-x-5 mt-10 password flex items-center">
            <label
              className=" font-chick text-xl"
              htmlFor="user_password_check"
            >
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
                  validate: {
                    check: (val) => {
                      if (getValues("user_password") !== val) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                    },
                  },
                })}
                // onChange={onEmailChange}
                type="password"
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
          <div className="gap-x-5 mt-10 password flex items-center">
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
          <div className="ml-[0.4] gap-x-14 user_parent_name flex items-center">
            <label className="font-chick text-xl" htmlFor="user_parent_name">
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
          <div className="mt-10 birth flex items-center">
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
          <div className="mt-10">
            <GamePlayBtn text="회원가입" color="bg-emerald-300" type="submit" />
          </div>
        </form>
        <div className="w-[12em]">
          <CommonBtn
            onClick={() => setModal(!modal)}
            text="이메일 확인"
            color="bg-emerald-300"
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
