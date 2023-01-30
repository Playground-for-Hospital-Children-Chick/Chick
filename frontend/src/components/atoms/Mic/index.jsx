import MicOn from "./../../../assets/images/faceplay/micOn.svg";
import MicOff from "./../../../assets/images/faceplay/micOff.svg";
import React, { useState } from "react";

function Mic() {
  const [mic, setMic] = useState(false);
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
