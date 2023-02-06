{
  /* 
      최초 작성자: 최정온
      수정 작성자: 최정온
      최초 작성일: 23.01.30
      수정 작성일: 23.02.02
      
      Ver 1.0.0
      
      - 사용 예시:
        <RiceEat />
      */
}

import RiceEatHomeBox from "../../molecules/RiceEatHomeBox";
import CommonBtn from "./../../atoms/CommonBtn/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function RiceEat(params) {
  const user = useSelector((state) => state.user);
  return (
    <div className="absolute left-48 w-[1076px] h-[100%]">
      <div className="flex justify-end">
        {user["userEmail"] === null ? (
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
            <Link to="/logout">
              <CommonBtn text={"로그아웃"} color="bg-emerald-300" />
            </Link>
          </>
        )}
      </div>
      <RiceEatHomeBox />
    </div>
  );
}

export default RiceEat;
