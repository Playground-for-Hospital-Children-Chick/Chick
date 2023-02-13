{
  /* 
최초 작성자: 엄희원
수정 작성자: 엄희원
최초 작성일: 23.01.30
수정 작성일: 23.01.30

Ver 1.0.0

- 사용 예시: 얼굴놀이 방에서 아직 비어있는 스크린을 나타냄
            친구가 아직 오지 않음
  
- 색깔
default="pink"
*/
}

function FriendIsComing() {
  return (
    // <div className=" bg-pink-200 m-3 rounded-[30px] w-[500px] h-[307px] flex items-center justify-center">
    <div className=" bg-pink-200 m-3 rounded-[30px] w-[200px] h-[300px] md:w-[300px] lg:w-[400px] xl:w-[550px] 2xl:w-[650px] flex items-center justify-center">
      <div className="text-3xl font-chick">친구가 오고 있어요!</div>
    </div>
  );
}

export default FriendIsComing;
