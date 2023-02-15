{
  /* 
최초 작성자: 김민준
수정 작성자: 최정온
최초 작성일: 23.01.29
수정 작성일: 23.02.08

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
function Logo() {
  return (
    <span
      style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))" }}
      className="font-chick m-3 text-5xl text-[#ffdc01]"
    >
      병아리
    </span>
  );
}

export default Logo;
