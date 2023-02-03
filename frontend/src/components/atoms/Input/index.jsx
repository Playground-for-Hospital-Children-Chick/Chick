function InputBox({ text, onChange, type, placeholder }) {
  // const onChange = () => {
  //   props.setText(props.text);
  // };

  return (
    <input
      value={text}
      type={type}
      onChange={onChange}
      className="text-center font-chick flex justify-center items-center w-[466px] h-[60px] relative overflow-hidden gap-1 px-16 py-5 rounded-[30px] bg-[#fcfcfc]"
      style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
      placeholder={placeholder}
    ></input>
  );
}

export default InputBox;
