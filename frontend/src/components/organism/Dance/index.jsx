import { Link } from "react-router-dom";
import CommonBtn from "../../atoms/CommonBtn/index";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../../main";

import { logoutUser } from "../../../api/UsersApi";
import { DELETE_USER, DELETE_TOKEN } from "../../../store/reducers/UserReducer";
import DanceHomeBox from "../../molecules/DanceHomeBox";
import CircleBox from "../../atoms/CircleBox";

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
      console.log(response);
    }
    // input 태그 값 비워주는 코드
  };
  return (
    <div className="absolute left-48 w-[1076px] h-[100%]">
      <div className="flex justify-end">
        {user["login"] == false ? (
          <>
            <Link to="/termsofuse">
              <CommonBtn text={"회원가입"} color="bg-blue-300" />
            </Link>
            <Link to="/login">
              <CommonBtn text={"로그인"} color="bg-emerald-300" />
            </Link>
          </>
        ) : (
          <>
            <span className="font-chick text-lg mt-14 mr-4">
              {user["userChName"]}님 안녕하세요!
            </span>
            <CircleBox size={"small"}>
              <div className="pl-4 w-[110px]">
                <img src={user["profilePath"]} />
              </div>
            </CircleBox>
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
