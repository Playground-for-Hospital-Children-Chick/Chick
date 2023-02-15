{
  /* 
최초 작성자: 엄희원
수정 작성자: 엄희원
최초 작성일: 23.01.30
수정 작성일: 23.01.30

Ver 1.0.0

- 사용 예시: 마이크 on/off
  
- 색깔
default="emerald"
*/
}

import MicOn from "./../../../assets/images/faceplay/micOn.svg";
import MicOff from "./../../../assets/images/faceplay/micOff.svg";
import React, { useState } from "react";

function Mic() {
  const [mic, setMic] = useState(true);
  const micChange = () => {
    setMic(!mic);
  };
  return (
    <>
      {mic === false ? (
        <div
          className="rounded-full w-[50px] h-[50px] bg-emerald-400 flex items-center justify-center"
          onClick={micChange}
        >
          <img src={MicOff} />
        </div>
      ) : (
        <div
          className="rounded-full w-[50px] h-[50px] bg-emerald-400 flex items-center justify-center"
          onClick={micChange}
        >
          <img src={MicOn} />
        </div>
      )}
    </>
  );
}

export default Mic;
