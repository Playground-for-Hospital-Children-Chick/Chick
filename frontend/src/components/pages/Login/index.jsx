import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertBox from "../../atoms/AlertBox";

import { HiLockClosed } from "react-icons/hi";
import { ErrorMessage } from "@hookform/error-message";
import { useCookies } from "react-cookie";

import { loginUser } from "./../../../api/Users";
import { setRefreshToken } from "./../../../store/Cookie";
import { SET_TOKEN } from "./../../../store/Auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useForm 사용을 위한 선언
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const [cookies, setCookie] = useCookies["id"];
  // preventDefault 대신에 동작할 코드(로그인 버튼을 누른 후 preventDefault와 더불어서 실행되는 함수)
  // 백으로 유저 정보 전달
  const onValid = async ({ email, password }) => {
    const response = await loginUser({ email, password });
    console.log("response head" + JSON.stringify(response.headers));
    if (response.status) {
      // 쿠키에 Refresh Token, store에 Access Token 저장
      // console.log("access " + response.data.data.accessToken);
      // console.log("header " + response.data.headers);
      // console.log("response " + response.headers);
      // console.log(response.data.headers.get("Set-Cookie"));
      document.cookie = response;
      console.log("dc   " + document.cookie);
      setRefreshToken(document.cookie);
      dispatch(SET_TOKEN(response.json.accessToken));

      return navigate("/");
    } else {
      console.log(response);
    }
    // input 태그 값 비워주는 코드
    setValue("password", "");
  };
  return (
    <div className="flex items-end	 justify-center h-screen items-center ">
      <AlertBox>
        <h1 className="font-chick text-2xl">로그인</h1>
        <div class="form ">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onValid)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  User ID
                </label>
                <input
                  className="placeholder:font-chick"
                  {...register("email", { required: "이메일을 확인해주세요" })}
                  type="text"
                  placeholder="이메일을 입력해주세요"
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  className="placeholder:font-chick"
                  {...register("password", {
                    required: "비밀번호를 확인해주세요",
                  })}
                  type="text"
                  placeholder="비밀번호를 입력해주세요"
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
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <HiLockClosed
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </AlertBox>
    </div>
  );
}

export default Login;
