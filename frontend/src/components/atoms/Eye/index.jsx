import { ReactComponent as CheckedEye } from "./../../../assets/images/login/checked_eye.svg";
import { ReactComponent as UncheckedEye } from "./../../../assets/images/login/Unchecked_Eye.svg";
import React, { useState } from "react";
function Eye() {
  const [eye, setEye] = useState(false);
  const eyeChange = () => {
    setEye(!eye);
  };
  return (
    <>
      {eye === false ? (
        <UncheckedEye onClick={eyeChange} />
      ) : (
        <CheckedEye onClick={eyeChange} />
      )}
    </>
  );
}

export default Eye;
