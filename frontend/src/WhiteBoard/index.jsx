import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles/board.css";
import { Link } from "react-router-dom";
import CommonBtn from "../components/atoms/CommonBtn";
import BoardVideoRoomComponent from "./whiteBoardRTC/VideoRoomComponent";
import { useSelector } from "react-redux";
import session from "redux-persist/lib/storage/session";
import BluePan from "../assets/images/board/blue_pan.png";
import BlackPan from "../assets/images/board/black_pan.png";
import RedPan from "../assets/images/board/red_pan.png";
import YellowPan from "../assets/images/board/yellow_pan.png";
import GreenPan from "../assets/images/board/green_pan.png";
import EraserPNG from "../assets/images/board/eraser.png";

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();
  const [roomName, setMyRoomName] = useState("SessionA");

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext("2d");

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");
    console.log(colors, "the colors");
    console.log(test);
    // set the current color
    const current = {
      color: "black",
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      // current.color = color;
      current.color = e.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;
      console.log(" 그 리 는 중 입 니 다.   방 이름은 ????", roomName);
      socketRef.current.emit(
        "drawing",
        {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color,
        },
        roomName
      );
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };
    socketRef.current = io.connect("ws://i8b207.p.ssafy.io:8001");
    socketRef.current.on("drawing", onDrawingEvent);
    socketRef.current.on("erasing", onErasingEvent);
    socketRef.current.on("welcome", async (room) => {
      console.log("front 방에 입장하였습니다 방이름은    ", room);
      setMyRoomName[room];
      console.log("세션은?", roomName);
    });
    // socketRef.current = io.connect("wss://i8b207.p.ssafy.io");
    // socketRef.current = io.connect("ws://43.201.16.17:8001");
    // socketRef.current = io.connect("ws://localhost:8001");
  }, []);

  const onErasingEvent = () => {
    clearBoard(false);
  };

  function clearBoard(emit) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    if (!emit) {
      return;
    }
    console.log(" 지 웠 습 니 다   방 이름은 ????", roomName);
    socketRef.current.emit("erasing", roomName);
  }
  const user = useSelector((state) => state.user);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div className="flex justify-between">
      <canvas ref={canvasRef} className="resize-y whiteboard" />

      <div className="flex justify end z-10">
        <BoardVideoRoomComponent user={user["userChName"]} email={user["userEmail"]} userType={user["userType"]} />
      </div>

      <div ref={colorsRef} className="colors h-[50px] row-span-2 z-10">
        <img src={BlackPan} width="45" height="45" className="color black" />
        <img src={RedPan} width="45" height="45" className="color red" />
        <img src={GreenPan} width="40" height="40" className="color green" />
        <img src={BluePan} width="45" height="45" className="color blue" />
        <img src={YellowPan} width="45" height="45" className="color yellow" />

        <button onClick={() => clearBoard(true)}>
          <img src={EraserPNG} width="150" height="150" />
        </button>
      </div>
      <div className="ml-[1em] absolute bottom-0 right-20 z-10">
        <Link to="/">
          <CommonBtn text="나가기" color={"bg-pink-300"} />
        </Link>
      </div>
    </div>
  );
};
/* <img src={Eraser} alt="Eraser" /> */
export default Board;
