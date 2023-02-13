{
  /* 
    최초 작성자: 최정온
    수정 작성자: 최정온
    최초 작성일: 23.01.29
    수정 작성일: 23.01.30
    
    Ver 1.0.0
    최초 버전
    Ver 1.1.0
    index, setIndex Props 추가
    
    - 사용 예시:
    <SideBar index={index} setIndex={setIndex} />
    */
}

import LogoText from "../../../assets/logo/logo-text.svg";
import SideBarBase from "../../atoms/SideBarBase";
import SideBarBtn from "./../../atoms/SideBarBtn/index";
import { Link } from "react-router-dom";

function SideBar({ index, setIndex }) {
  return (
    <SideBarBase>
      <Link to="/home">
        <img className="inline-flex justify-center w-[100%]" src={LogoText} />
      </Link>
      <div
        id="slider"
        className="justify-between mt-[1em] h-[550px] overflow-y-scroll flex flex-col scrollbar-hide"
      >
        {index == 0 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"tiger"}
              selected={true}
              onClick={() => setIndex(0)}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"tiger"}
              selected={false}
              onClick={() => setIndex(0)}
            />
          </div>
        )}

        {index == 1 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"painting"}
              selected={true}
              onClick={() => setIndex(1)}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"painting"}
              selected={false}
              onClick={() => setIndex(1)}
            />
          </div>
        )}
        {index == 2 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"dance"}
              selected={true}
              onClick={() => setIndex(2)}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"dance"}
              selected={false}
              onClick={() => setIndex(2)}
            />
          </div>
        )}
        {index == 3 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"cartoon"}
              selected={true}
              onClick={() => setIndex(3)}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"cartoon"}
              selected={false}
              onClick={() => setIndex(3)}
            />
          </div>
        )}
        {index == 4 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"myPage"}
              selected={true}
              onClick={() => setIndex(4)}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"myPage"}
              selected={false}
              onClick={() => setIndex(4)}
            />
          </div>
        )}
      </div>
    </SideBarBase>
  );
}

export default SideBar;
