import CartoonOne from "../../../assets/cartoon/cartoon_01.png";
import CartoonTwo from "../../../assets/cartoon/cartoon_02.png";
import CartoonThree from "../../../assets/cartoon/cartoon_03.png";
import CartoonFour from "../../../assets/cartoon/cartoon_04.png";
import CartoonFive from "../../../assets/cartoon/cartoon_05.png";
import CartoonSix from "../../../assets/cartoon/cartoon_06.png";
import CartoonSeven from "../../../assets/cartoon/cartoon_07.png";
import CartoonEight from "../../../assets/cartoon/cartoon_08.png";

function Cartoon({ index }) {
  if (index == 0) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonOne}
      />
    );
  } else if (index == 1) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonTwo}
      />
    );
  } else if (index == 2) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonThree}
      />
    );
  } else if (index == 3) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonFour}
      />
    );
  } else if (index == 4) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonFive}
      />
    );
  } else if (index == 5) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonSix}
      />
    );
  } else if (index == 6) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonSeven}
      />
    );
  } else if (index == 7) {
    return (
      <img
        className="w-5/12 border-2 border-black border-opacity-75"
        src={CartoonEight}
      />
    );
  }
}

export default Cartoon;
