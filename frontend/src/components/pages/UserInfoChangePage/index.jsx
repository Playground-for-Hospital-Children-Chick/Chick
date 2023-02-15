import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseMark from "./../../../assets/favicon/closemark.svg";
import { updateMyInfo } from "./../../../api/UsersApi";

import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";
import AlertBox from "./../../atoms/AlertBox/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import CalenderSelectBox from "../../atoms/CalenderSelectBox";
import { SET_USER } from "./../../../store/reducers/UserReducer";

function UserInfoChangePage({ myinfomodal, setMyInfoModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { setValue, formState, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;
  const [birth, setBirth] = useState("");

  const setBirthHandler = (e) => {
    setBirth(e);
  };
  const onUpdateMyInfo = async (userInput) => {
    userInput["user_email"] = user["userEmail"];
    userInput["user_birth"] = parseInt(birth);

    const response = await updateMyInfo(userInput);
    console.log(response);
    if (parseInt(Number(response.status) / 100) === 2) {
      Swal.fire({
        icon: "info",
        title: "내 정보 변경",
        text: response.data.email,
        showDenyButton: false,
        confirmButtonText: "확인",
        denyButtonText: undefined,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: undefined,
      }).then(() => {});
      dispatch(
        SET_USER({
          userEmail: response.data.userLoginInfo.userEmail,
          userChName: response.data.userLoginInfo.userChName,
          userAge: response.data.userLoginInfo.userAge,
          userBirth: response.data.userLoginInfo.userBirth,
          userSex: response.data.userLoginInfo.userSex,
          attendanceDay: response.data.userLoginInfo.attendanceDay,
          profilePath: response.data.userLoginInfo.profilePath,
          userType: "user",
        })
      );
      setMyInfoModal(!myinfomodal);
    } else {
      Swal.fire({
        icon: "error",
        title: "내 정보 변경 실패",
        text: "서버에 문의해 주세요.",
        showConfirmButton: "확인",
      });
    }
  };

  return (
    <div className="absolute -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%]">
      <AlertBox color="bg-white">
        <div>
          <div className="ml-[0.5em] mr-[1em] mt-[1em] flex flex-row justify-between">
            <div className="ml-[0.5em] mt-[0.5em] font-chick text-3xl">
              내 정보 변경
            </div>
            <button
              onClick={() => {
                setMyInfoModal(!myinfomodal);
              }}
            >
              <img
                className="inline after:mr-5 w-[3em]"
                src={CloseMark}
                alt="x표시"
              />
            </button>
          </div>
          <hr />
          <form className="mt-8" onSubmit={handleSubmit(onUpdateMyInfo)}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="justify-center flex flex-col mt-[5em] items-center">
              <div className=" gap-x-5 mt-10 flex items-center mr-[8em]">
                <label
                  className="mr-[1em] font-chick text-xl"
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
              <div className="flex flex-row justify-center items-center mr-[10.5em] mt-[2em]">
                <label
                  className="mr-[5.2em] font-chick text-xl"
                  htmlFor="user_birth"
                >
                  출생
                </label>
                <CalenderSelectBox setBirthHandler={setBirthHandler} />
              </div>
              <div className="mt-[2em] flex flex-col justify-center">
                <CommonBtn text="변경" color="bg-emerald-300" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </AlertBox>
    </div>
  );
}

export default UserInfoChangePage;
