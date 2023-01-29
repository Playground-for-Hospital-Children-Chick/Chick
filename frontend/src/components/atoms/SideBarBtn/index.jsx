{
  /* 
    최초 작성자: 최정온
    수정 작성자: 최정온
    최초 작성일: 23.01.29
    수정 작성일: 23.01.29
    
    Ver 1.0.0
    
    - 사용 예시:
      <SideBarBtn
        type={"tiger"}
        selected={true}
        onClick={() => console.log("Clicked")}
      />
    */
}
import { ReactComponent as Tiger } from "../../../assets/images/sidebar/tiger.svg";
import { ReactComponent as Rice } from "../../../assets/images/sidebar/rice.svg";

function SideBarBtn({ type, selected, onClick }) {
  if (type === "rice") {
    if (selected) {
      return (
        <button onClick={onClick}>
          <Rice />
          <span className={"font-chick text-2xl text-blue-500 "}>밥먹기</span>
        </button>
      );
    } else {
      return (
        <button onClick={onClick}>
          <Rice />
          <span className={"font-chick text-2xl "}>밥먹기</span>
        </button>
      );
    }
  } else if (type === "tiger") {
    if (selected) {
      return (
        <button onClick={onClick}>
          <Tiger />
          <span className={"font-chick text-2xl text-blue-500 "}>얼굴놀이</span>
        </button>
      );
    } else {
      return (
        <button onClick={onClick}>
          <Tiger />
          <span className={"font-chick text-2xl "}>얼굴놀이</span>
        </button>
      );
    }
  }
}

export default SideBarBtn;
