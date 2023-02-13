import CartoonOne from "../../../assets/cartoon/cartoon_01.png";
import CartoonTwo from "../../../assets/cartoon/cartoon_02.png";
import CartoonThree from "../../../assets/cartoon/cartoon_03.png";
import CartoonFour from "../../../assets/cartoon/cartoon_04.png";
import CartoonFive from "../../../assets/cartoon/cartoon_05.png";
import CartoonSix from "../../../assets/cartoon/cartoon_06.png";
import CartoonSeven from "../../../assets/cartoon/cartoon_07.png";
import CartoonEight from "../../../assets/cartoon/cartoon_08.png";

function CartoonPage() {
  return (
    <>
      <div className="flex h-64 justify-center align-center mt-6">
        <div className="text-center">
          <div className="inline-flex justify-center w-[100%] mt-7 mb-4">
            <img
              className="w-4/12 border-2 border-black border-opacity-75"
              src={CartoonOne}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default CartoonPage;
