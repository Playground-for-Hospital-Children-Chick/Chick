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

function CommonBtn({ text = "Button", color, onClick }) {
  if (color === "pink") {
    return (
      <button
        className={
          "font-chick m-3 w-[138px] h-[70px] overflow-hidden rounded-[30px] bg-pink-300 "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="text-2xl text-center text-black/[0.66]">{text}</p>
      </button>
    );
  } else if (color === "yellow") {
    return (
      <button
        className={
          "font-chick m-3 w-[138px] h-[70px] overflow-hidden rounded-[30px] bg-yellow-300 "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="text-2xl text-center text-black/[0.66]">{text}</p>
      </button>
    );
  } else if (color === "emerald") {
    return (
      <button
        className={
          "font-chick m-3 w-[138px] h-[70px] overflow-hidden rounded-[30px] bg-emerald-300 "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="text-2xl text-center text-black/[0.66]">{text}</p>
      </button>
    );
  } else if (color === "blue") {
    return (
      <button
        className={
          "font-chick m-3 w-[138px] h-[70px] overflow-hidden rounded-[30px] bg-blue-300 "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="text-2xl text-center text-black/[0.66]">{text}</p>
      </button>
    );
  } else {
    return (
      <button
        className={
          "font-chick m-3 w-[138px] h-[70px] overflow-hidden rounded-[30px] bg-white-300 "
        }
        style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
        onClick={onClick}
      >
        <p className="text-2xl text-center text-black/[0.66]">{text}</p>
      </button>
    );
  }
}

export default CommonBtn;
