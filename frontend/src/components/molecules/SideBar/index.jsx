import { ReactComponent as LogoText } from "../../../assets/logo/logo-text.svg";
import SideBarBase from "../../atoms/SideBarBase";
import SideBarBtn from "./../../atoms/SideBarBtn/index";

function SideBar() {
  return (
    <SideBarBase>
      <LogoText />
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
