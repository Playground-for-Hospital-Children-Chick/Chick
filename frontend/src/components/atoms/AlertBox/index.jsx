import classnames from "classnames";

{
  /* 
최초 작성자: 엄희원
수정 작성자: 김민준
최초 작성일: 23.01.30
수정 작성일: 23.02.11

Ver 1.0.0

- 사용 예시: classNames 라이브러리 사용, color 프롭스 내리기
  
- 색깔
default="yellow"
*/
}
function AlertBox({
  children,
  color = "bg-[#fcff83]",
  overflow = "overflow-hidden",
  scrollbar,
  height = "h-[561px]",
}) {
  const classStr = classnames(
    `w-[817px]  rounded-[30px]  border border-black/30`,
    color,
    overflow,
    scrollbar,
    height
  );
  return (
    <div
      className={classStr}
      style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}
    >
      {children}
    </div>
  );
}

export default AlertBox;
