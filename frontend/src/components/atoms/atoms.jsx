function Test() {
  return (
    <div className="w-[118px] h-[834px] relative">
      <div className="w-[118px] h-[834px] absolute left-0 top-0">
        <div
          className="w-[118px] h-[834px] absolute left-0 top-0 overflow-hidden rounded-[40px] bg-white"
          style={{ boxShadow: "0px 4px 4px 4px rgba(0,0,0,0.25)" }}
        >
          <div
            className="w-[104px] h-[45px] absolute left-[9px] top-[27px]"
            style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))" }}
          >
            <p className="w-[413.58px] h-[180px] absolute left-[-154.79px] top-[-67.5px] text-4xl text-center text-[#ffdc01]">
              병아리
            </p>
          </div>
        </div>
        <div className="w-[94px] h-[125px] absolute left-3 top-[537px]">
          <p className="absolute left-[11px] top-[93px] text-[28px] text-center text-black/[0.66]">
            내정보
          </p>
        </div>
        <div className="w-[92px] h-[39px]">
          <p className="w-[92px] h-[39px] absolute left-3.5 top-[450px] text-[28px] text-center text-black/[0.66]">
            밥먹기
          </p>
        </div>
        <div className="w-[108px] h-[125px] absolute left-[5px] top-[172px]">
          <p className="absolute left-[7px] top-[95px] text-[28px] text-center text-black/[0.66]">
            얼굴놀이
          </p>
          <img
            src="image-15.png"
            className="w-20 h-20 absolute left-[15px] top-[-1px] object-cover"
          />
        </div>
        <img
          src="인사하는-병아리.png"
          className="w-[103.53px] h-20 absolute left-2 top-[536px] object-cover"
        />
        <img
          src="내-프로젝트-(1)-1.png"
          className="w-[82px] h-[82px] absolute left-[19px] top-[347px] object-cover"
        />
      </div>
    </div>
  );
}

export default Test;
