import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";
import { Link } from "react-router-dom";
import AlertBox from "../../atoms/AlertBox";
import chick_02 from "../../../assets/characters/chick_02.svg";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";
import { findEmailUser } from "./../../../api/UsersApi";
import { useNavigate } from "react-router-dom";

import { ErrorMessage } from "@hookform/error-message";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function FindEmail() {
  const navigate = useNavigate();
  const { setValue, formState, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;
  const onFindEmail = async (userInput) => {
    userInput["userBirth"] = parseInt(userInput["userBirth"]);

    console.log(userInput);
    const response = await findEmailUser(userInput);
    if (parseInt(Number(response.status) / 100) === 2) {
      console.log(response);
      Swal.fire({
        icon: "info",
        title: "이메일 인증 성공",
        text: response.data.email,
        showDenyButton: false,
        confirmButtonText: "확인",
        denyButtonText: undefined,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: undefined,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "이메일 조회 실패",
        text: "사용자 정보를 확인해주세요.",

        showConfirmButton: "확인",
      });
    }
  };

  return (
    <div className="flex	 justify-center h-screen items-center ">
      <AlertBox>
        <div className="top w-21 flex justify-center">
          <img
            className="inline after:mr-5 w-1/6"
            src={chick_02}
            alt="병아리캐릭터"
          />
          <span className="mr-28 text-center inline-block my-10 font-chick text-3xl">
            아이디 찾기
          </span>
        </div>
        <div className="form">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onFindEmail)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="gap-x-5 mt-[1.2em] flex flex-col justify-center mr-[2em]">
              <div className="gap-x-4 userParentName flex flex-row justify-center items-center mr-[4em]">
                <label className="font-chick text-lg" htmlFor="userParentName">
                  부모님 이름
                </label>
                <div className="relative">
                  <div>
                    <InputBox
                      register={register("userParentName", {
                        required: "부모님 이름을 입력하지 않았습니다.",
                      })}
                      // onChange={onEmailChange}
                      type="text"
                      placeholder={"부모님 이름을 입력해주세요".toString()}
                    />
                  </div>
                  <div className="relatvie w-full">
                    <ErrorMessage
                      name="userParentName"
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
              <div className="gap-x-[2.1em] userParentName flex flex-row justify-center items-center mr-[4em] mt-[2em]">
                <label className="font-chick text-lg" htmlFor="userChName">
                  자녀 이름
                </label>
                <div className="relative">
                  <div>
                    <InputBox
                      register={register("userChName", {
                        required: "자녀 이름을 입력하지 않았습니다.",
                      })}
                      // onChange={onEmailChange}
                      type="text"
                      placeholder={"자녀 이름을 입력해주세요.".toString()}
                    />
                  </div>
                  <div className="relatvie w-full">
                    <ErrorMessage
                      name="userChName"
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
              <div className="flex justify-center items-center mr-[7em] mt-[2em]">
                <label
                  className="mr-[5.7em] font-chick text-lg"
                  htmlFor="userBirth"
                >
                  출생
                </label>
                <CalenderSelectBox
                  register={register("userBirth", {
                    required: "생일을 입력하지 않으셨습니다.",
                  })}
                />
              </div>
            </div>
            <div className="">
              <GamePlayBtn
                text="아이디 찾기"
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

export default FindEmail;
