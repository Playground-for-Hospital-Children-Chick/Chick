import CheckedEye from "./../../../assets/images/login/checked_eye.svg";
import UncheckedEye from "./../../../assets/images/login/Unchecked_Eye.svg";
import React, { useState } from "react";
function Eye() {
  const [eye, setEye] = useState(false);
  const eyeChange = () => {
    setEye(!eye);
  };
  return (
    <>
      {eye === false ? (
        <img src={UncheckedEye} onClick={eyeChange} />
      ) : (
        <img src={CheckedEye} onClick={eyeChange} />
      )}
    </>
  );
}

export default Eye;
