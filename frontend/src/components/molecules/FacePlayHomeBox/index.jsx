{
  /* 
      최초 작성자: 최정온
      수정 작성자: 최정온
      최초 작성일: 23.01.30
      수정 작성일: 23.02.02
      
      Ver 1.0.0
      
      - 사용 예시:
        <FacePlayHomeBox />
      */
}

import HomeBox from "../../atoms/HomeBox";
import ChildOne from "../../../assets/images/faceplay/child_one.svg";
import ChildTwo from "../../../assets/images/faceplay/child_two.svg";
import ChildThree from "../../../assets/images/faceplay/child_three.svg";
import ChildFour from "../../../assets/images/faceplay/child_four.svg";
import LinearProgress from "@mui/material/LinearProgress";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";
import Box from "@mui/material/Box";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { loginGuest } from "../../../api/UsersApi";

import { SET_USER, SET_TOKEN } from "../../../store/reducers/UserReducer";

function FacePlayHomeBox() {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  }
  let [gameStart, setGameStart] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogin = async () => {
    const response = await loginGuest();

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
          attendanceDay: response.data.userLoginInfo.attendanceDay,
          profilePath: response.data.userLoginInfo.profilePath,
          userType: "guest",
        })
      );
    } else {
      console.log(response);
    }
  };

  function playTheFaceGame() {
    if (!user["login"]) {
      Swal.fire({
        icon: "info",
        title: "로그인이 필요한 서비스입니다.",
        text: "방에 입장하기 위해서는 로그인이 필요합니다.",
        showDenyButton: true,
        confirmButtonText: "게스트로 로그인",
        denyButtonText: `로그인하러가기`,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: "#ff82b3",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("게스트로 로그인");
          onLogin();
        } else if (result.isDenied) {
          navigate("/login");
        }
      });

      return;
    }

    setGameStart(true);

    setTimeout(() => {
      toggleFullScreen();
      return navigate("/facepage");
    }, 2000);
  }

  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">
        친구들과 영상 놀이터
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={ChildOne} style={{ height: 87, width: 154 }} />
        <img src={ChildTwo} style={{ height: 87, width: 154 }} />
        <img src={ChildThree} style={{ height: 87, width: 154 }} />
        <img src={ChildFour} style={{ height: 87, width: 154 }} />
      </div>
      {gameStart ? (
        <>
          <div className="font-chick text-xl text-center text-black/[0.66]">
            친구를 기다리는 중이에요..
          </div>
          <div className="inline-flex justify-center">
            <Box sx={{ width: "50%" }}>
              <LinearProgress />
            </Box>
          </div>
        </>
      ) : (
        <div className="inline-flex justify-center w-[100%]">
          <GamePlayBtn
            text={"친구들 만나러 가기"}
            color="bg-emerald-300"
            onClick={playTheFaceGame}
          />
        </div>
      )}
    </HomeBox>
  );
}

export default FacePlayHomeBox;
