{
  /* 
최초 작성자: 최정온
수정 작성자: 최정온
최초 작성일: 23.01.29
수정 작성일: 23.01.29

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

function CommonBtn({ text, color, onClick }) {
  if (color === "white") {
    return (
      <button
        className={
          "w-[138px] h-[70px] absolute left-5 top-5 overflow-hidden rounded-[30px] bg-white "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="w-[120px] h-[37px] absolute left-[9px] top-[10px] text-[31px] text-center text-black/[0.66]">
          {text}
        </p>
      </button>
    );
  } else if (color === "pink") {
    return (
      <button
        className={
          "w-[138px] h-[70px] absolute left-5 top-5 overflow-hidden rounded-[30px] bg-[#ff82b3] "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="w-[120px] h-[37px] absolute left-[9px] top-[10px] text-[31px] text-center text-black/[0.66]">
          {text}
        </p>
      </button>
    );
  } else if (color === "yellow") {
    return (
      <button
        className={
          "w-[138px] h-[70px] absolute left-5 top-5 overflow-hidden rounded-[30px] bg-[#fcff83] "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="w-[120px] h-[37px] absolute left-[9px] top-[10px] text-[31px] text-center text-black/[0.66]">
          {text}
        </p>
      </button>
    );
  } else if (color === "emerald") {
    return (
      <button
        className={
          "w-[138px] h-[70px] absolute left-5 top-5 overflow-hidden rounded-[30px] bg-[#9acfc5] "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="w-[120px] h-[37px] absolute left-[9px] top-[10px] text-[31px] text-center text-black/[0.66]">
          {text}
        </p>
      </button>
    );
  } else if (color === "blue") {
    return (
      <button
        className={
          "w-[138px] h-[70px] absolute left-5 top-5 overflow-hidden rounded-[30px] bg-[#57a2e8] "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="w-[120px] h-[37px] absolute left-[9px] top-[10px] text-[31px] text-center text-black/[0.66]">
          {text}
        </p>
      </button>
    );
  } else {
    return (
      <button
        className={
          "w-[138px] h-[70px] absolute left-5 top-5 overflow-hidden rounded-[30px] bg-[#57a2e8] "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="w-[120px] h-[37px] absolute left-[9px] top-[10px] text-[31px] text-center text-black/[0.66]">
          {text}
        </p>
      </button>
    );
  }
}

export default CommonBtn;
