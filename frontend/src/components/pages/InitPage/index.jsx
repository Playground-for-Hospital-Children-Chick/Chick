import Logo from "../../../assets/logo/logo-init.svg";
import ChildOne from "../../../assets/images/faceplay/child_one.svg";
import ChildTwo from "../../../assets/images/faceplay/child_two.svg";
import ChildThree from "../../../assets/images/faceplay/child_three.svg";
import ChildFour from "../../../assets/images/faceplay/child_four.svg";
import Chick from "../../../assets/characters/chick_02.svg";
import React, { useState } from "react";

import CartoonOne from "../../../assets/cartoon/cartoon_01.png";
import CartoonTwo from "../../../assets/cartoon/cartoon_02.png";
import CartoonThree from "../../../assets/cartoon/cartoon_03.png";
import CartoonFour from "../../../assets/cartoon/cartoon_04.png";
import { border } from "@mui/system";

function InitPage() {
  let [index, setIndex] = React.useState(0);

  return (
    <>
      <div className="flex h-64 justify-center align-center">
        <div className="text-center">
          <div className="inline-flex justify-center w-[100%] mt-3">
            <img src={Logo} className="w-2/12" />
          </div>
          <div className="inline-flex justify-center w-[100%] mt-7 mb-7">
            <img
              className="w-4/12 border-2 border-black border-opacity-75"
              src={CartoonOne}
              //   style={{ height: 450 }}
            />
          </div>
          <div className="inline-flex justify-center w-[100%]">
            <img src={ChildOne} className="w-1/12" />
            <img src={ChildTwo} className="w-1/12" />
            <img src={ChildThree} className="w-1/12" />
            <img src={ChildFour} className="w-1/12" />
          </div>
        </div>
      </div>
    </>
  );
}

export default InitPage;
