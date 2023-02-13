import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import React from "react";
import Cartoon from "../../atoms/Cartoon";

function CartoonPage() {
  let [index, setIndex] = React.useState(0);

  React.useEffect(() => {}, [index]);
  function goBeforePage() {
    if (index > 0) {
      console.log("goBeforePage");
      setIndex(index - 1);
    }
  }
  function goNextPage() {
    if (index < 7) {
      console.log("goNextPage");
      setIndex(index + 1);
    }
  }

  return (
    <>
      <div className="flex align-middle justify-center w-[100%] h-[100%] mt-7 mb-4">
        <button
          onClick={goBeforePage}
          className="mr-12 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
        >
          <span className="mr-8">
            <div className="font-chick text-xl">이전화 보기</div>
            <AiOutlineArrowLeft size={110} />
          </span>
        </button>
        <Cartoon index={index} />
        <button
          onClick={goNextPage}
          className="ml-12 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
        >
          <span className="ml-8">
            <div className="font-chick text-xl">다음화 보기</div>
            <AiOutlineArrowRight size={110} />
          </span>
        </button>
      </div>
    </>
  );
}
export default CartoonPage;
