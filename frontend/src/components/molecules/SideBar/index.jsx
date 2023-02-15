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
import { useSelector, useDispatch } from "react-redux";
import { SET_PAGE } from "../../../store/reducers/PageReducer";

function SideBar({ index, setIndex }) {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return (
    <SideBarBase>
      <button
        onClick={() => {
          dispatch(SET_PAGE({ pageIndex: 0 }));
        }}
      >
        <img
          className="inline-flex justify-center w-[100%] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
          src={LogoText}
        />
      </button>
      <div
        id="slider"
        className="justify-between mt-[1em] h-[585px] overflow-y-scroll flex flex-col scrollbar-hide"
      >
        {page["pageIndex"] == 0 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"tiger"}
              selected={true}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 0 }))}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"tiger"}
              selected={false}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 0 }))}
            />
          </div>
        )}

        {page["pageIndex"] == 1 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"painting"}
              selected={true}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 1 }))}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"painting"}
              selected={false}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 1 }))}
            />
          </div>
        )}
        {page["pageIndex"] == 2 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"dance"}
              selected={true}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 2 }))}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"dance"}
              selected={false}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 2 }))}
            />
          </div>
        )}
        {page["pageIndex"] == 3 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"cartoon"}
              selected={true}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 3 }))}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"cartoon"}
              selected={false}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 3 }))}
            />
          </div>
        )}
        {/* {page["pageIndex"] == 4 ? (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"myPage"}
              selected={true}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 4 }))}
            />
          </div>
        ) : (
          <div className="inline-flex justify-center w-[100%]">
            <SideBarBtn
              type={"myPage"}
              selected={false}
              onClick={() => dispatch(SET_PAGE({ pageIndex: 4 }))}
            />
          </div>
        )} */}
      </div>
    </SideBarBase>
  );
}

export default SideBar;
