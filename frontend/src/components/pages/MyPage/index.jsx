import CircleBox from "../../atoms/CircleBox";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect } from "react";

function MyPage() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(checkLogin, []);

  function checkLogin() {
    if (!user["login"]) {
      Swal.fire({
        icon: "info",
        title: "로그인이 필요한 서비스입니다.",
        text: "내 정보를 확인하려면 로그인이 필요합니다.",
        confirmButtonText: "로그인하러가기",
        confirmButtonColor: "#8cc8ff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });

      return;
    }

    if (user["userType"] === "guest") {
      Swal.fire({
        icon: "info",
        title: "게스트 로그인",
        text: "내 정보를 확인하려면 사용자 로그인이 필요합니다.",
        confirmButtonText: "로그인하러가기",
        confirmButtonColor: "#8cc8ff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });

      return;
    }
  }

  return (
    <div className="absolute left-40 top-14">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2">
          <CircleBox />
          <div className="text-start inline ml-4 mt-8">
            <span className="font-chick text-lg">{user["userChName"]}</span>
            <div className="font-chick text-base">나이: {user["userAge"]}</div>
            <div className="font-chick text-base">
              생일: {user["userBirth"]}
            </div>
            <div className="font-chick text-base">성별: {user["userSex"]}</div>
            <div className="font-chick text-base">
              이메일: {user["userEmail"]}
            </div>
          </div>
        </div>
        <div>
          <AiOutlineSetting size={60} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
