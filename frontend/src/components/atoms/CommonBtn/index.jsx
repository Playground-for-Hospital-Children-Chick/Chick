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
  textsize = "text-2xl",
}) {
  const classStr1 = classnames(
    `font-chick mx-2 mt-3 mb-3 h-[70px] overflow-hidden flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150`,
    padding,
    color,
    round,
    margin
  );
  const classStr2 = classnames(`text-center text-black/[0.66]`, textsize);
  return (
    <button
      disabled={option}
      type={type}
      className={classStr1}
      style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
      onClick={onClick}
    >
      <p className={classStr2}>{text}</p>
    </button>
  );
}

export default CommonBtn;
