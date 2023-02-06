{
  /* 
최초 작성자: 엄희원
수정 작성자: 엄희원
최초 작성일: 23.01.30
수정 작성일: 23.01.30

Ver 1.0.0

- 사용 예시: 
<WebCamBoard>
  <FriendIsComing/>
  <FriendIsComing/>
  <FriendIsComing/>
  <FriendIsComing/>
</WebCamBoard>
  
- 색깔
default="blue"
*/
}

function WebCamBoard({ children }) {
  return (
    <div className="grid grid-cols-2 mt-3 mb-2 gap-0 w-[1194px] h-[699px] overflow-hidden bg-[#133b60] rounded-[30px]">
      {children}
    </div>
  );
}

export default WebCamBoard;
// grid grid-cols-2 gap-0
