import WebCamBoardWithCams from "./../../molecules/WebCamBoardWithCams/index";
import ArBottomBar from "./../../molecules/ArBottomBar/index";

function FacePage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <WebCamBoardWithCams />
      </div>
      <div className="flex justify-center">
        <ArBottomBar />
      </div>
    </div>
  );
}

export default FacePage;
