import VideoOn from "./../../../assets/images/faceplay/videoOn.svg";
import VideoOff from "./../../../assets/images/faceplay/videoOff.svg";
import React, { useState } from "react";

function VideoBtn() {
  const [video, setVideo] = useState(false);
  const videoChange = () => {
    setVideo(!video);
  };
  return (
    <>
      {video === false ? (
        <div
          className="rounded-full w-[50px] h-[50px] bg-emerald-400 flex items-center justify-center"
          onClick={videoChange}
        >
          <img src={VideoOff} />
        </div>
      ) : (
        <div
          className="rounded-full w-[50px] h-[50px] bg-emerald-400 flex items-center justify-center"
          onClick={videoChange}
        >
          <img src={VideoOn} />
        </div>
      )}
    </>
  );
}

export default VideoBtn;
