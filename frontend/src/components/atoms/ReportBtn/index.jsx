import ReportIcon from "./../../../assets/images/faceplay/report.svg";

function ReportBtn() {
  return (
    <>
      <div className="rounded-full w-[50px] h-[50px] bg-pink-400 flex items-center justify-center">
        <img src={ReportIcon} />
      </div>
    </>
  );
}

export default ReportBtn;
