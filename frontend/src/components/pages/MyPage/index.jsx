import CircleBox from "../../atoms/CircleBox";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { loginUser } from "../../../api/UsersApi";
import { SET_USER, SET_TOKEN } from "../../../store/reducers/UserReducer";
import { useEffect } from "react";

function MyPage() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(checkLogin, []);

  const onLogin = async () => {
    const response = await loginUser({
      email: "guest@guest.com",
      password: "123",
    });

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
          userType: "guest",
        })
      );
    } else {
      console.log(response);
    }
  };

  function checkLogin() {
    if (!user["login"]) {
      Swal.fire({
        icon: "info",
        title: "로그인이 필요한 서비스입니다.",
        text: "내정보를 확인하려면 로그인이 필요합니다.",
        showDenyButton: true,
        confirmButtonText: "게스트로 로그인",
        denyButtonText: `로그인하러가기`,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: "#ff82b3",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("게스트로 로그인");
          onLogin();
          return;
        } else if (result.isDenied) {
          navigate("/login");
          return;
        }
      });

      navigate("/");
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
