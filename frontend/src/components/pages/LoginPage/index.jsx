import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertBox from "../../atoms/AlertBox";
import InputBox from "../../atoms/Input";
import { loginUser } from "./../../../api/UsersApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Logo from "../../atoms/Logo/index";

import { ErrorMessage } from "@hookform/error-message";

import chick_02 from "../../../assets/characters/chick_02.svg";
import { SET_USER, SET_TOKEN } from "./../../../store/reducers/UserReducer";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import { SET_PAGE } from "../../../store/reducers/PageReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // useForm 사용을 위한 선언
  const { setValue, formState, handleSubmit, register } = useForm();
  const { errors } = formState;

  function goHomePage() {
    dispatch(SET_PAGE({ pageIndex: 0 }));
    navigate("/home");
  }

  const onLogin = async (userinput) => {
    userinput.email = userinput.email.trim();

    const response = await loginUser(userinput);

    if (parseInt(Number(response.status) / 100) === 2) {
      dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
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

      return navigate("/home");
    } else if (parseInt(Number(response.data.statusCode)) === 405) {
      Swal.fire({
        icon: "error",
        title: "탈퇴한 계정입니다.",
        text: "다른 아이디로 로그인해주세요.",
        showDenyButton: false,
        confirmButtonText: "확인",
        denyButtonText: undefined,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: undefined,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "로그인 실패.",
        text: "아이디 패스워드를 확인해주세요.",
        showDenyButton: false,
        confirmButtonText: "확인",
        denyButtonText: undefined,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: undefined,
      });
    }
    // input 태그 값 비워주는 코드
    setValue("password", "");
  };
  return (
    <>
      <div className="absolute top-3 left-3 ml-3">
        <button onClick={() => goHomePage()}>
          <Logo />
        </button>
      </div>
      <div className="flex justify-center items-center mt-12 ">
        <AlertBox>
          <div className="top w-21 flex justify-center">
            <img
              className="inline after:mr-5 w-1/6"
              src={chick_02}
              alt="병아리캐릭터"
            />
            <span className="mr-28 text-center inline-block my-10 font-chick text-3xl">
              로그인
            </span>
          </div>
          <div className="form ">
            {/* <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}> */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div>
                <div className="mb-10 flex justify-center items-center mr-[5em]">
                  <label className="mr-5 font-chick text-lg" htmlFor="email">
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
                    <div className=" w-full">
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
                <div className="mb-10 flex justify-center items-center mr-[5.5em]">
                  <label className="mr-5 font-chick text-lg" htmlFor="password">
                    비밀번호
                  </label>
                  <div className="relative">
                    <InputBox
                      register={register("password", {
                        required: "비밀번호를 입력하지 않았습니다.",
                      })}
                      type="password"
                      placeholder={"암호를 입력해주세요".toString()}
                    />
                    <div className="relatvie w-full">
                      <ErrorMessage
                        name="password"
                        errors={errors}
                        render={
                          ({ message }) =>
                            message == "비밀번호를 입력하지 않았습니다." ? (
                              <div className="absolute top-16 text-md font-chick right-[28%]  text-center text-pink-600">
                                {message}
                              </div>
                            ) : null
                          // 완전 마스터할때 올리기
                          // message == "숫자+영문자포함 8글자 이상입니다." ? (
                          //   <div className="absolute top-16 text-md font-chick right-[25%]  text-center text-pink-600">
                          //     {message}
                          //   </div>
                          // ) : (
                          //   <div className="absolute top-16 text-md font-chick left-[30%]  text-center text-pink-600">
                          //     {message}
                          //   </div>
                          // )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <GamePlayBtn
                  text="로그인"
                  color="bg-emerald-300"
                  type="submit"
                />
              </div>
            </form>

            <div className="ml-[2.8em] mt-5 flex justify-center mt-[2.5em]">
              <Link to="/findid">
                <span className="mr-10 text-xl font-chick">이메일 찾기</span>
              </Link>

              <Link to="/findpassword">
                <span className="mr-10 text-xl font-chick">비밀번호 찾기</span>
              </Link>
              <Link to="/termsofuse">
                <span className="mr-10 text-xl font-chick">회원가입</span>
              </Link>
            </div>
          </div>
        </AlertBox>
      </div>
    </>
  );
}

export default Login;
