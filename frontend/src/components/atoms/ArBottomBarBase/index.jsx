{
  /* 
    최초 작성자: 엄희원
    수정 작성자: 엄희원
    최초 작성일: 23.01.30
    수정 작성일: 23.01.30
    
    Ver 1.0.0
    최초 버전
    
    - 사용 예시:
      <ArBottomBar>
        <Component1 />
        <Component2 />
      </ArBottomBar>
    */
}

function ArBottomBar({ children }) {
  return (
    <div
      className="w-[1075px] h-[100px] overflow-hidden bg-white"
      style={{ boxShadow: "0px 4px 4px 4px rgba(0,0,0,0.25)" }}
    >
      {children}
    </div>
  );
}

export default ArBottomBar;
