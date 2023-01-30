{
  /* 
    최초 작성자: 최정온
    수정 작성자: 최정온
    최초 작성일: 23.01.29
    수정 작성일: 23.01.29
    
    Ver 1.0.0
    
    - 사용 예시:
      <SideBar />
    */
}

import LogoText from "../../../assets/logo/logo-text.svg";
import SideBarBase from "../../atoms/SideBarBase";
import SideBarBtn from "./../../atoms/SideBarBtn/index";

function SideBar() {
  return (
    <SideBarBase>
      <img src={LogoText} />
      <SideBarBtn
        type={"tiger"}
        selected={true}
        onClick={() => console.log("Clicked")}
      />
      <SideBarBtn
        type={"rice"}
        selected={false}
        onClick={() => console.log("Clicked")}
      />
    </SideBarBase>
  );
}

export default SideBar;
