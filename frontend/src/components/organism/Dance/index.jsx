import { Link } from "react-router-dom";
import CommonBtn from "../../atoms/CommonBtn/index";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../../main";
import { loginGuest } from "../../../api/UsersApi";

import { SET_USER, SET_TOKEN } from "../../../store/reducers/UserReducer";

import { logoutUser } from "../../../api/UsersApi";
import { DELETE_USER, DELETE_TOKEN } from "../../../store/reducers/UserReducer";
import DanceHomeBox from "../../molecules/DanceHomeBox";
import CircleBox from "../../atoms/CircleBox";
import { SET_PAGE } from "../../../store/reducers/PageReducer";
import Swal from "sweetalert2";

function Dance() {
  const user = useSelector((state) => state.user);
  // const [loginState, setLoginState] = useState(user);
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const onLogout = async () => {
    const response = await logoutUser();
    const purge = async () => {
      await persistor.purge();
    };
    if (parseInt(Number(response.status) / 100) === 2) {
      // location.reload();
      await purge();
      dispatch(DELETE_USER());
      dispatch(DELETE_TOKEN());
      return;
    } else {
      // console.log(response);
    }
    // input 태그 값 비워주는 코드
  };
  const onLogin = async () => {
    const response = await loginGuest();

    if (parseInt(Number(response.status) / 100) === 2) {
      // console.log(response.data.accessToken);
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
          userType: "guest",
        })
      );
    } else {
      // console.log(response);
    }
  };
  return (
    <div className="absolute left-48 w-[1076px] h-[100%]">
      <div className="flex justify-end">
        {user["login"] == false ? (
          <>
            <Link to="/termsofuse">
              <CommonBtn text={"회원가입"} color="bg-blue-300" />
            </Link>
            {/* <Link to="/login">
              <CommonBtn text={"로그인"} color="bg-emerald-300" />
            </Link> */}
            <CommonBtn
              text={"로그인"}
              onClick={() => {
                Swal.fire({
                  icon: "info",
                  title: "로그인 방식을 선택해주세요.",
                  showDenyButton: true,
                  confirmButtonText: "게스트로 로그인",
                  denyButtonText: `로그인하러가기`,
                  confirmButtonColor: "#8cc8ff",
                  denyButtonColor: "#ff82b3",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // console.log("게스트로 로그인");
                    onLogin();
                  } else if (result.isDenied) {
                    navigate("/login");
                  }
                });
              }}
              color="bg-emerald-300"
            />
          </>
        ) : (
          <>
            <CircleBox size={"small"}>
              <button
                className="pl-3 w-[70px]"
                onClick={() => dispatch(SET_PAGE({ pageIndex: 4 }))}
              >
                <img src={user["profilePath"]} />
              </button>
            </CircleBox>
            <span className="font-chick text-lg mt-9 mr-4">님 안녕하세요!</span>
            <CommonBtn
              onClick={onLogout}
              text={"로그아웃"}
              color="bg-emerald-300"
            />
          </>
        )}
      </div>
      <DanceHomeBox />
    </div>
  );
}

export default Dance;
