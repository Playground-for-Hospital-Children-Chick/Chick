import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertBox from "../../atoms/AlertBox";
import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn/index";
import { useState } from "react";
import { loginUser } from "./../../../api/UsersApi";

import { ErrorMessage } from "@hookform/error-message";

import chick_02 from "../../../assets/characters/chick_02.svg";
import { asyncLoginAxios } from "./../../../store/reducers/UserReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useForm 사용을 위한 선언
  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const [cookies, setCookie] = useCookies["id"];
  // preventDefault 대신에 동작할 코드(로그인 버튼을 누른 후 preventDefault와 더불어서 실행되는 함수)
  // 백으로 유저 정보 전달
  // const onValid = () => {
  //   dispatch(asyncLoginAxios());
  // };
  const onValid = async () => {
    console.log("email", email);
    console.log("password", password);

    // console.log({ email, password });
    console.log("클릭");
    const response = await loginUser({ email, password });
    // console.log(response);
    // console.log(response.json.refreshToken);
    // console.log(response.json.accessToken);
    if (response.status) {
      // 쿠키에 Refresh Token, store에 Access Token 저장
      // console.log("access " + response.data.data.accessToken);
      // console.log("header " + response.data.headers);
      // console.log("response " + response.headers);
      // console.log(response.data.headers.get("Set-Cookie"));
      // document.cookie = response;
      // console.log("dc   " + document.cookie);
      // console.log(response);
      // setRefreshToken(response.json.refreshToken);
      // dispatch(SET_TOKEN(response.json.accessToken));

      return navigate("/");
    } else {
      console.log(response);
    }
    // input 태그 값 비워주는 코드
    setValue("password", "");
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
            로그인
          </span>
        </div>
        <div className="form ">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onValid)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div className="mb-10 flex justify-center items-center">
                <label className="mr-5 font-chick text-lg" htmlFor="email">
                  이메일
                </label>
                <InputBox
                  usefor="email"
                  text={email}
                  onChange={onEmailChange}
                  type="text"
                  placeholder={"이메일을 입력해주세요".toString()}
                />
                <ErrorMessage
                  name="email"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm font-medium text-rose-500">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="mb-10 flex justify-center items-center">
                <label className="mr-5 font-chick text-lg" htmlFor="password">
                  비밀번호
                </label>
                <InputBox
                  usefor="password"
                  type="password"
                  onChange={onPasswordChange}
                  text={password}
                  placeholder={"비밀번호를 입력해주세요".toString()}
                />
                <ErrorMessage
                  name="password"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm font-chick">{message}</p>
                  )}
                />
              </div>
            </div>
            <div>
              <CommonBtn text="로그인" type="submit" color="bg-emerald-300">
                로그인
              </CommonBtn>
            </div>
          </form>
          <div className="mt-5 flex justify-center">
            <span className="mr-10 text-xl font-chick">이메일 찾기</span>
            <span className="mr-10 text-xl font-chick">비밀번호 찾기</span>
            <span className="mr-10 text-xl font-chick">회원가입</span>
          </div>
        </div>
      </AlertBox>
    </div>
  );
}

export default Login;
