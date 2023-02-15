import React from "react";

function ReportBoard(props) {
  const modal = props;
  return (
    <>
      {modal == true ? (
        <div className="mt-3 mb-2 gap-0 w-[837px] h-[630px] overflow-hidden bg-[#ffff] rounded-[30px]">
          <div className="fontSize-3xl font-chick">신고하기</div>
        </div>
      ) : null}
    </>
  );
}
