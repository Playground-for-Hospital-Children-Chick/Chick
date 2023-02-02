import FacePlayHomeBox from "../../molecules/FacePlayHomeBox";
import CommonBtn from "./../../atoms/CommonBtn/index";

function FacePlay({ children }) {
  return (
    <div className="flow flow-col w-[1076px] h-[100%]">
      <div className="flex justify-end">
        <CommonBtn text={"회원가입"} />
        <CommonBtn text={"로그인"} color="yellow" />
      </div>
      <FacePlayHomeBox />
    </div>
  );
}

export default FacePlay;
