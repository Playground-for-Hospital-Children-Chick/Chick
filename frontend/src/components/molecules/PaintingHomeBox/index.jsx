import Painting from "../../../assets/images/sidebar/painting.svg";
import HomeBox from "../../atoms/HomeBox";

import LinearProgress from "@mui/material/LinearProgress";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";
import Box from "@mui/material/Box";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import io from "socket.io-client";
import { loginUser } from "../../../api/UsersApi";
import { SET_USER, SET_TOKEN } from "../../../store/reducers/UserReducer";

function PaintingHomeBox() {
  let [gameStart, setGameStart] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = React.useRef();

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

  async function getSessionId(email) {
    const sessionId = await createSession(email);
    return sessionId;
  }
  async function createSession(email) {
    const response = await axios({
      method: "post",
      url: APPLICATION_SERVER_URL + "api/sessions",
      data: {
        email: email,
        gameType: "draw",
        guest: "guest",
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    console.info("세션 연결");
    return response.data; // The sessionId
  }

  async function playThePaintingGame() {
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
    socketRef.current = io.connect("ws://i8b207.p.ssafy.io:8001");
    const sessionId = await getSessionId(user["userEmail"]);
    console.log("room Name 서버로 넘기기. ", sessionId);
    socketRef.current.emit("join_room", sessionId);

    setGameStart(true);

    setTimeout(() => {
      return navigate("/board");
    }, 1500);
  }
  return (
    <HomeBox>
      <div className="font-chick text-4xl text-center text-black/[0.66]">친구들과 그림 그리기</div>
      <div className="inline-flex justify-center w-[100%]">
        <img src={Painting} style={{ height: 150, width: 150 }} />
      </div>
      {gameStart ? (
        <>
          <div className="font-chick text-xl text-center text-black/[0.66]">친구를 기다리는 중이에요..</div>
          <div className="inline-flex justify-center">
            <Box sx={{ width: "50%" }}>
              <LinearProgress />
            </Box>
          </div>
        </>
      ) : (
        <div className="inline-flex justify-center w-[100%]">
          <GamePlayBtn text={"그림 그리러 가기"} color="bg-yellow-200" onClick={playThePaintingGame} />
        </div>
      )}
    </HomeBox>
  );
}

export default PaintingHomeBox;
