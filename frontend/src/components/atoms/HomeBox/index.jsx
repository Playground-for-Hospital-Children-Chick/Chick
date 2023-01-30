{
  /* 
      최초 작성자: 최정온
      수정 작성자: 최정온
      최초 작성일: 23.01.29
      수정 작성일: 23.01.29
      
      Ver 1.0.0
      
      - 사용 예시:
    <HomeBox>
      <Component1 />
      <Component2 />
    </HomeBox>
      */
}

function HomeBox({ children }) {
  return (
    <div className="container mx-auto px-4 relative w-[903px] h-[508px]">
      <div
        className="container mx-auto flex items-center justify-center px-4 w-[903px] h-[508px] left-[-1px] top-[-1px] rounded-[30px] bg-white border border-black/75"
        style={{ boxShadow: "4px 4px 4px 3px rgba(0,0,0,0.25)" }}
      >
        {children}
      </div>
    </div>
  );
}

export default HomeBox;
