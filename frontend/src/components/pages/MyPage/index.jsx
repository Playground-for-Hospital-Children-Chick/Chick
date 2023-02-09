import CircleBox from "../../atoms/CircleBox";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";

function MyPage() {
  const user = useSelector((state) => state.user);

  return (
    <div className="absolute left-40 top-14">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2">
          <CircleBox />
          <div className="text-start inline ml-4 mt-8">
            <span className="font-chick text-lg">{user["userChName"]}</span>
            <div className="font-chick text-base">
              이메일: {user["userEmail"]}
            </div>
          </div>
        </div>
        <div>
          <AiOutlineSetting size={60} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
