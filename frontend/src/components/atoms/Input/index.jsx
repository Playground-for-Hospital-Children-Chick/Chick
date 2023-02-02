function InputBox() {
  return (
    <div
      className="flex justify-center items-center w-[466px] h-[60px] relative overflow-hidden gap-1 px-16 py-5 rounded-[30px] bg-[#fcfcfc]"
      style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
    >
      <p className="flex-grow-0 flex-shrink-0 w-[313px] text-[19px] text-center text-neutral-200">
        Label
      </p>
    </div>
  );
}

export default InputBox;
