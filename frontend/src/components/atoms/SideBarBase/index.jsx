{
  /* 
  최초 작성자: 최정온
  수정 작성자: 최정온
  최초 작성일: 23.01.29
  수정 작성일: 23.01.29
  
  Ver 1.0.0
  최초 버전
  Ver 1.1.0
  children 추가
  
  - 사용 예시:
    <SideBarBase>
      <Component1 />
      <Component2 />
    </SideBarBase>
  */
}

function SideBarBase({ children }) {
  return (
    <div
      className="container absolute ml-3 top-0 left-0 pt-6 w-[95px] h-[100%] overflow-hidden rounded-[40px] bg-white"
      style={{ boxShadow: "0px 4px 4px 4px rgba(0,0,0,0.25)" }}
    >
      {children}
    </div>
  );
}

export default SideBarBase;
