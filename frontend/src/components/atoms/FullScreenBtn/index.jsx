{
  /* 
      최초 작성자: 최정온
      수정 작성자: 최정온
      최초 작성일: 23.02.06
      수정 작성일: 23.02.06
      
      Ver 1.0.0
      최초 버전
      */
}
import { GoScreenFull } from "react-icons/go";

function FullScreenBtn() {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div className="absolute bottom-6 right-6">
      <div>
        <span className="text-xl font-chick">전체화면</span>
      </div>
      <div>
        <button onClick={toggleFullScreen}>
          <GoScreenFull size={50} />
        </button>
      </div>
    </div>
  );
}

export default FullScreenBtn;
