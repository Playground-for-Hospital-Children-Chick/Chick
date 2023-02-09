import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertBox from "../../atoms/AlertBox";
import InputBox from "../../atoms/Input";
import { useState } from "react";
import { loginUser } from "../../../api/UsersApi";
import { useSelector } from "react-redux";

import { ErrorMessage } from "@hookform/error-message";

import {
  SET_USER,
  SET_TOKEN,
  DELETE_TOKEN,
} from "../../../store/reducers/UserReducer";
import GamePlayBtn from "../../atoms/GamePlayBtn";

function PwChange() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // useForm 사용을 위한 선언
  const { setValue, formState, handleSubmit, register } = useForm();
  const { errors } = formState;
  // const onEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const onPasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const onLogin = async (userinput) => {
    console.log(userinput);
    const response = await loginUser(userinput);

    if (parseInt(Number(response.status) / 100) === 2) {
      console.log(response.data.accessToken);
      dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
      dispatch(
        SET_USER({
          userEmail: response.data.userLoginInfo.userEmail,
          userChName: response.data.userLoginInfo.userChName,
          userAge: response.data.userLoginInfo.userAge,
          userBirth: response.data.userLoginInfo.userBirth,
          userSex: response.data.userLoginInfo.userSex,
          userType: "user",
        })
      );
      console.log(user["userEmail"]);
      console.log(user["userChName"]);
      console.log(user["userEmail"]);

      return navigate("/");
    } else {
      console.log(response);
    }
    // input 태그 값 비워주는 코드
    setValue("password", "");
  };
  return (
    <div className="flex justify-center h-screen items-center ">
      <div>
        <div
          className="flex mr-5 justify-start font-chick text-2xl"
          htmlFor="password"
        >
          패스워드
        </div>
        <AlertBox>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-col gap-y-[1em]  mt-10 mr-[2em]">
              <div className="mt-[3em] mb-10 flex items-center justify-center items-center mr-[5em]">
                <label
                  className="mr-[3em] font-chick text-lg"
                  htmlFor="password"
                >
                  기존 비밀번호
                </label>
                <InputBox
                  type="text"
                  placeholder={"기존 비밀번호를 입력하세요.".toString()}
                />
              </div>

              <div className="mb-10 flex justify-center items-center mr-[5em]">
                <label
                  className="mr-[3em] font-chick text-lg"
                  htmlFor="changepassword"
                >
                  변경 비밀번호
                </label>
                <InputBox
                  type="text"
                  placeholder={"새 비밀번호를 입력하세요.".toString()}
                />
              </div>

              <div>
                <div className="mb-10 flex justify-center items-center mr-[5em]">
                  <label
                    className="mr-[1em] font-chick text-lg"
                    htmlFor="checkpassword"
                  >
                    변경 비밀번호 확인
                  </label>
                  <InputBox
                    type="text"
                    placeholder={"새 비밀번호를 다시 입력하세요.".toString()}
                  />
                </div>
                <div className="relatvie w-full">
                  <ErrorMessage
                    name="checkpassword"
                    errors={errors}
                    render={({ message }) =>
                      message == "변경 비밀번호가 일치하지 않습니다." ? (
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

            <div className="ml-[1.4em]">
              <GamePlayBtn text="확인" color="bg-emerald-300" type="submit" />
            </div>
          </form>
        </AlertBox>
      </div>
    </div>
  );
}

export default PwChange;
