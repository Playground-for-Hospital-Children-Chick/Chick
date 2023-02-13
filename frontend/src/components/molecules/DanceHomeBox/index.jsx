import Dance from "../../../assets/images/sidebar/dance.svg";
import HomeBox from "../../atoms/HomeBox";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { loginGuest } from "../../../api/UsersApi";
import { SET_USER, SET_TOKEN } from "../../../store/reducers/UserReducer";

function DanceHomeBox() {
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
          userType: "guest",
        })
      );
    } else {
      console.log(response);
    }
  };

  function playTheDance() {
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
      return navigate("/singdance");
    }, 2000);
  }
  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">
        친구들과 율동 따라하기
      </div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={Dance} style={{ height: 150, width: 150 }} />
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
            text={"율동하러 가기"}
            color="bg-skyblue-200"
            onClick={playTheDance}
          />
        </div>
      )}
    </HomeBox>
  );
}

export default DanceHomeBox;
