{
  /* 
최초 작성자: 엄희원
수정 작성자: 엄희원
최초 작성일: 23.01.30
수정 작성일: 23.01.30

Ver 1.0.0

- 사용 예시: 비디오 on/off
  
- 색깔
default="emerald"
*/
}

import VideoOn from "./../../../assets/images/faceplay/videoOn.svg";
import VideoOff from "./../../../assets/images/faceplay/videoOff.svg";
import React, { useState } from "react";

function VideoBtn() {
  const [video, setVideo] = useState(true);
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
