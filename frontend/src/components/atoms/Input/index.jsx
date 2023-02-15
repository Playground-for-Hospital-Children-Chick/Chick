{
  /* 
최초 작성자: 김민준
수정 작성자: 김민준
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
import classnames from "classnames";

function InputBox({ register, text, onChange, type, placeholder, marginleft }) {
  const classStr1 = classnames(
    `text-xl text-center font-chick flex justify-center items-center w-[466px] h-[60px] relative overflow-hidden gap-1 px-16 py-5 rounded-[30px] bg-[#fcfcfc]`,
    marginleft
  );

  return (
    <input
      {...register}
      value={text}
      type={type}
      onChange={onChange}
      className={classStr1}
      style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
      placeholder={placeholder}
    ></input>
  );
}

export default InputBox;
