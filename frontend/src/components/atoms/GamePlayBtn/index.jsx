{
  /* 
        최초 작성자: 최정온
        수정 작성자: 최정온
        최초 작성일: 23.01.29
        수정 작성일: 23.02.07
        
        Ver 1.0.0
        
- 사용 예시:
<GamePlayBtn
text="버튼 이름"
color="버튼 색깔"
onClick={() => console.log("Clicked")}
/> 

- 버튼 색깔
default="blue"
종류: "white, pink, blue, yellow emerald"
*/
}

import classnames from "classnames";

function GamePlayBtn({
  text = "GamePlay",
  color = "bg-blue-300",
  onClick,
  type,
}) {
  const classStr = classnames(
    `font-chick justify-center items-center w-[439px] h-[75px] overflow-hidden gap-1 px-16 py-5 rounded-[30px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150`,
    color
  );

  return (
    <button
      className={classStr}
      type={type}
      style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
      onClick={onClick}
    >
      <p className="flex justify-center text-[28px] text-center text-black/[0.66]">
        {text}
      </p>
    </button>
  );
}

export default GamePlayBtn;
