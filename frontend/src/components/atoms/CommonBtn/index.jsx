import classnames from "classnames";

{
  /* 
최초 작성자: 최정온
수정 작성자: 김민준
최초 작성일: 23.01.29
수정 작성일: 23.02.13

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

function CommonBtn({
  option,
  round = "rounded-[30px]",
  padding = "p-3",
  onClick,
  type,
  text = "Button",
  color,
  margin = "mx-2 mt-3 mb-3",
}) {
  const classStr = classnames(
    `font-chick  h-[70px] overflow-hidden flex items-center`,
    padding,
    color,
    round,
    margin
  );
  return (
    <button
      disabled={option}
      type={type}
      className={classStr}
      style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
      onClick={onClick}
    >
      <p className="text-2xl text-center text-black/[0.66]">{text}</p>
    </button>
  );
}

export default CommonBtn;
