{
  /* 
      최초 작성자: 최정온
      수정 작성자: 최정온
      최초 작성일: 23.01.30
      수정 작성일: 23.02.02
      
      Ver 1.0.0
      
      - 사용 예시:
        <FacePlay />
      */
}

import { Link } from "react-router-dom";
import FacePlayHomeBox from "../../molecules/FacePlayHomeBox";
import CommonBtn from "./../../atoms/CommonBtn/index";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "./../../../api/UsersApi";

function FacePlay() {
  const user = useSelector((state) => state.user);
  const [loginState, setLoginState] = useState(user);
  // const navigate = useNavigate();
  const onLogout = async () => {
    const response = await logoutUser();

    if (parseInt(Number(response.status) / 100) === 2) {
      location.reload();
      return;
    } else {
      console.log(response);
    }
    // input 태그 값 비워주는 코드
  };
  return (
    <div className="absolute left-48 w-[1076px] h-[100%]">
      <div className="flex justify-end">
        {loginState["accessToken"] == null ? (
          <>
            <Link to="/signup">
              <CommonBtn text={"회원가입"} color="bg-blue-300" />
            </Link>
            <Link to="/login">
              <CommonBtn text={"로그인"} color="bg-emerald-300" />
            </Link>
          </>
        ) : (
          <>
            <CommonBtn
              onClick={onLogout}
              text={"로그아웃"}
              color="bg-emerald-300"
            />
          </>
        )}
      </div>
      <FacePlayHomeBox />
    </div>
  );
}

export default FacePlay;
