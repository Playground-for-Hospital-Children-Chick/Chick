import SideBar from "../../molecules/SideBar";
import FacePlay from "../../organism/FacePlay/index.";

function HomePage({ children }) {
  return (
    <div className="flex flex-row">
      <SideBar />
      <FacePlay />
    </div>
  );
}

export default HomePage;
