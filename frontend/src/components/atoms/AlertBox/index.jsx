{
  /* 
최초 작성자: 엄희원
수정 작성자: 엄희원
최초 작성일: 23.01.30
수정 작성일: 23.01.30

Ver 1.0.0

- 사용 예시: 다양한 내용 고지 시
  ex) 회원가입 완료, 비밀번호 변경 완료 등등
  
- 색깔
default="yellow"
*/
}
function AlertBox({ children }) {
  return (
    <div
      className="w-[817px] h-[561px] overflow-hidden rounded-[30px] bg-[#fcff83] border border-black/30"
      style={{ boxShadow: "4px 4px 4px 0 rgba(0,0,0,0.25)" }}
    >
      {children}
    </div>
  );
}

export default AlertBox;
