import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import RedCrayon from "../assets/images/board/red.svg";
import BlueCrayon from "../assets/images/board/blue.svg";
import PurpleCrayon from "../assets/images/board/purple.svg";

const options = {
  currentMode: "",
  currentColor: "#000000",
  currentWidth: 5,
  fill: false,
  group: {},
};

const modes = {
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
  ELLIPSE: "ELLIPSE",
  LINE: "LINE",
  RED: "RED",
  BLUE: "BLUE",
  GREEN: "GREEN",
  ERASER: "ERASER",
};

const initCanvas = () => {
  const canvas = new fabric.Canvas("canvas", {
    height: 800,
    width: 800,
    backgroundColor: "gray",
    borderColor: "black",
  });
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = "#00aeff";
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.borderColor = "#4447A9";
  fabric.Object.prototype.cornerColor = "#4447A9";
  fabric.Object.prototype.cornerSize = 6;
  fabric.Object.prototype.padding = 10;
  fabric.Object.prototype.borderDashArray = [5, 5];

  canvas.on("object:added", (e) => {
    e.target.on("mousedown", removeObject(canvas));
  });
  canvas.on("path:created", (e) => {
    e.path.on("mousedown", removeObject(canvas));
  });
  return canvas;
};
function removeObject(canvas) {
  return (e) => {
    if (options.currentMode === modes.ERASER) {
      canvas.remove(e.target);
    }
  };
}

function removeCanvasListener(canvas) {
  canvas.off("mouse:down");
  canvas.off("mouse:move");
  canvas.off("mouse:up");
}

function onSelectMode(canvas) {
  console.log("모드 변경");
  if (canvas.isDrawingMode) canvas.isDrawingMode = false;
  else canvas.isDrawingMode = true;
}

function Draw({ aspectRatio = 4 / 3 }) {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const whiteboardRef = useRef(null);

  useEffect(() => {
    if (!canvas && canvasRef.current) {
      const canvas = initCanvas(whiteboardRef.current.clientWidth, whiteboardRef.current.clientWidth / aspectRatio);
      setCanvas(() => canvas);
      // console.log("setcanvus", setCanvas);
      console.log("canvas", canvas);
      //   handleResize(resizeCanvas(canvas, whiteboardRef.current)).observe(whiteboardRef.current);
    }
  }, [canvasRef]);

  function redDraw() {
    console.log("redDraw", canvas);
    if (options.currentMode !== modes.RED) {
      removeCanvasListener(canvas);

      options.currentMode = modes.RED;
      options.currentColor = "#ff0000";
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = "#ff0000";
      canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
      canvas.isDrawingMode = true;
      setCanvas(() => canvas);
    }
  }

  function greenDraw() {
    console.log("greenDraw", canvas);
    if (options.currentMode !== modes.GREEN) {
      removeCanvasListener(canvas);

      options.currentMode = modes.GREEN;
      options.currentColor = "#00ff00";
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = "#00ff00";
      canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
      canvas.isDrawingMode = true;
    }
  }

  function blueDraw() {
    console.log("blueDraw", canvas);
    if (options.currentMode !== modes.BLUE) {
      removeCanvasListener(canvas);

      options.currentMode = modes.BLUE;
      options.currentColor = "#0000FF";
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = "#0000FF";
      canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
      canvas.isDrawingMode = true;
    }
  }

  return (
    <div ref={whiteboardRef}>
      <div>
        <button onClick={() => onSelectMode(canvas)}>
          <img src={RedCrayon} alt="Pencil" />
        </button>
        <button onClick={() => redDraw()}>
          <img src={RedCrayon} alt="Red" />
        </button>
        <button onClick={() => greenDraw()}>
          <img src={PurpleCrayon} alt="Purple" />
        </button>
        <button onClick={() => blueDraw()}>
          <img src={BlueCrayon} alt="Blue" />
        </button>
      </div>
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
}

export default Draw;
