{
  /* 
최초 작성자: 김민준
수정 작성자: 김민준
최초 작성일: 23.01.29
수정 작성일: 23.02.09

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
function Sex({ register }) {
  return (
    <div
      className="text-center font-chick w-[5em]  relative overflow-hidden px-5 py-5 rounded-[30px] bg-yellow-200"
      style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
    >
      <select {...register} className="text-xl bg-yellow-200">
        {["남", "여"].map((item, i) =>
          item === "남" ? (
            <option value="M" key={i}>
              {item}
            </option>
          ) : (
            <option value="F" key={i}>
              {item}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default Sex;
