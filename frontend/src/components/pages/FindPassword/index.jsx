import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";
import Logo from "../../atoms/Logo";
import { Link } from "react-router-dom";
import AlertBox from "../../atoms/AlertBox";
import chick_02 from "../../../assets/characters/chick_02.svg";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { sendPasswordUser } from "./../../../api/UsersApi";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import CalenderSelectBox from "../../atoms/CalenderSelectBox";

function FindPassword() {
  const navigate = useNavigate();

  const { setValue, formState, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;
  const [inputEmail, setInputEmail] = useState("");

  const emailInput = (e) => {
    setInputEmail(e.target.value);
  };

  const sendPassword = async (userInput) => {
    console.log(userInput);
    // userInput["user_birth"] = parseInt(userInput["user_birth"]);
    // delete userInput["user_password_check"];
    // //회원가입 이메일 작성란이랑 인증된 이메일이랑 비교

    const response = await sendPasswordUser(userInput);
    console.log(response);
    if (parseInt(Number(response.status) / 100) === 2) {
      Swal.fire({
        icon: "success",
        title: "임시 비밀번호 발급",
        confirmButtonText: "확인",
        confirmButtonColor: "#8cc8ff",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "임시 비밀번호 발급 실패",
        showConfirmButton: "확인",
      });
    }
  };

  return (
    <div>
      <AlertBox>
        <div className="top flex flex-row  justify-center">
          <img
            className="inline after:mr-5 w-1/6"
            src={chick_02}
            alt="병아리캐릭터"
          />
          <span className="mr-[3.5em] text-center inline-block my-10 font-chick text-3xl">
            비밀번호 찾기
          </span>
        </div>
        <div className="top w-21 flex flex-col justify-center">
          <span className=" text-center inline-block my-5 font-chick text-2xl">
            비밀번호를 찾으려는
          </span>
          <span className=" text-center inline-block font-chick text-2xl">
            이메일을 입력해주세요{" "}
          </span>
        </div>
        <div className="form">
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(sendPassword)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div className="ml-10 mb-10 flex justify-start items-center mr-[4em]">
                <label
                  className="mr-[2.5em] font-chick text-xl"
                  htmlFor="email"
                >
                  이메일
                </label>
                <div className="relative">
                  <InputBox
                    onChange={emailInput}
                    register={register("email", {
                      required: "이메일을 입력하지 않았습니다.",
                      pattern: {
                        message: "이메일형식이 잘못되었습니다.",
                        value:
                          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                      },
                    })}
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
              </div>
            </div>
            <div className="">
              <GamePlayBtn
                text="비밀번호찾기"
                color="bg-emerald-300"
                type="submit"
              />
            </div>
          </form>
        </div>
      </AlertBox>
    </div>
  );
}

export default FindPassword;
