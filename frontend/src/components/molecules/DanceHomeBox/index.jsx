import Dance from "../../../assets/images/sidebar/dance.svg";
import HomeBox from "../../atoms/HomeBox";
import GamePlayBtn from "./../../atoms/GamePlayBtn/index";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
function DanceHomeBox() {
  let [gameStart, setGameStart] = React.useState(false);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  function playTheDance() {
    if (user["userEmail"] === null) {
      Swal.fire({
        icon: "question",
        title: "로그인 필요",
        text: "방에 입장하기 위해서는 로그인이 필요합니다.",
      }).then(() => navigate("/login"));
      return;
    }

    setGameStart(true);

    setTimeout(() => {
      return navigate("/singDance");
    }, 1500);
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
