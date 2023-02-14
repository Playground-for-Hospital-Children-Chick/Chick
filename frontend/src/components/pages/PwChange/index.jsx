import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AlertBox from "../../atoms/AlertBox";
import InputBox from "../../atoms/Input";
import { changePWUser } from "../../../api/UsersApi";
import { useSelector } from "react-redux";

import { ErrorMessage } from "@hookform/error-message";
import Swal from "sweetalert2";

import GamePlayBtn from "../../atoms/GamePlayBtn";

function PwChange() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // useForm 사용을 위한 선언
  const { setValue, formState, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;

  const onChangePassword = async (userInput) => {
    delete userInput["newPasswordCheck"];
    userInput["email"] = user["userEmail"];
    const response = await changePWUser(userInput);
    if (parseInt(Number(response.status) / 100) === 2) {
      Swal.fire({
        icon: "success",
        title: "비밀번호 변경 완료",
        confirmButtonText: "확인",
        confirmButtonColor: "#8cc8ff",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "비밀번호 변경 실패",
        showConfirmButton: "확인",
      });
    }
    // input 태그 값 비워주는 코드
    setValue("password", "");
    setValue("newPassword", "");
    setValue("newPasswordCheck", "");
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <AlertBox>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onChangePassword)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col items-center mt-[2em]">
            <div className="font-chick text-2xl">비밀번호 변경</div>
            <div className="flex flex-col justify-center items-center  mr-[7em]">
              <div className="gap-x-5 mt-10 password flex justify-center items-center">
                <label
                  className="mr-[3em] font-chick text-xl"
                  htmlFor="password"
                >
                  비밀번호
                </label>
                <div className="relative">
                  <InputBox
                    register={register("password", {
                      required: "비밀번호를 입력하지 않았습니다.",
                      pattern: {
                        message: "숫자+영문자포함 8글자 이상입니다.",

                        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                      },
                    })}
                    type="password"
                    placeholder={"비밀번호를 입력해주세요".toString()}
                  />
                  <div className="relatvie w-full">
                    <ErrorMessage
                      name="password"
                      errors={errors}
                      render={({ message }) =>
                        message == "비밀번호를 입력하지 않았습니다." ? (
                          <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                            {message}
                          </div>
                        ) : message == "숫자+영문자포함 8글자 이상입니다." ? (
                          <div className="absolute top-16 text-md font-chick right-[25%]  text-center text-pink-600">
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

              <div className="gap-x-5 mt-10 password flex justify-center items-center">
                <label
                  className="mr-[2em] font-chick text-xl"
                  htmlFor="newPassword"
                >
                  새 비밀번호
                </label>
                <div className="relative">
                  <InputBox
                    register={register("newPassword", {
                      required: "비밀번호를 입력하지 않았습니다.",
                      pattern: {
                        message: "숫자+영문자포함 8글자 이상입니다.",

                        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                      },
                      validate: {
                        check: (val) => {
                          if (getValues("newPasswordCheck") !== val) {
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
                      name="newPassword"
                      errors={errors}
                      render={({ message }) =>
                        message == "비밀번호를 입력하지 않았습니다." ? (
                          <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                            {message}
                          </div>
                        ) : message == "숫자+영문자포함 8글자 이상입니다." ? (
                          <div className="absolute top-16 text-md font-chick right-[25%]  text-center text-pink-600">
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

              <div className="gap-x-5 mt-10 password justify-center flex items-center">
                <label
                  className="mr-[0.2em] font-chick text-xl"
                  htmlFor="newPasswordCheck"
                >
                  새 비밀번호 확인
                </label>
                <div className="relative">
                  <InputBox
                    register={register("newPasswordCheck", {
                      required: "비밀번호를 입력하지 않았습니다.",
                      pattern: {
                        message: "숫자+영문자포함 8글자 이상입니다.",

                        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                      },
                      validate: {
                        check: (val) => {
                          if (getValues("newPassword") !== val) {
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
                      name="newPasswordCheck"
                      errors={errors}
                      render={({ message }) =>
                        message == "비밀번호를 입력하지 않았습니다." ? (
                          <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                            {message}
                          </div>
                        ) : message == "숫자+영문자포함 8글자 이상입니다." ? (
                          <div className="absolute top-16 text-md font-chick right-[25%]  text-center text-pink-600">
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
            <div className="mt-[3em]">
              <GamePlayBtn text="확인" color="bg-emerald-300" type="submit" />
            </div>
          </div>
        </form>
      </AlertBox>
    </div>
  );
}

export default PwChange;
