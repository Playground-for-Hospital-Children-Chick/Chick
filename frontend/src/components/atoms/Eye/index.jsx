{
  /* 
최초 작성자: 김민준
수정 작성자: 김민준
최초 작성일: 23.01.29
수정 작성일: 23.02.01

Ver 1.0.0

- 사용 예시:
<CommonBtn
text="버튼 이름"
color="버튼 색깔"
onClick={() => console.log("Clicked")}
/> 

- 버튼 색깔
default="blue"
종류: "white, pink, blue, yellow emerald"
*/
}

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
