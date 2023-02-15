import React, { useState, useEffect } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import ArDevilHorns from "../../atoms/ArDevilHorns";
import ArLElephantTrunk from "../../atoms/ArElephantTrunk";
import ArGalaxy from "../../atoms/ArGalaxy";
import ArLion from "../../atoms/ArLion";
import ArMakeUpSplit from "../../atoms/ArMakeUpSplit";
import ArPingPong from "../../atoms/ArPingPong";
import ArPixelHeart from "../../atoms/ArPixelHeart";
import ArSnail from "../../atoms/ArSnail";
import ArFlower from "./../../atoms/ArFlower/index";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const data = [
  { id: 2, img: <ArFlower /> },
  { id: 1, img: <ArLion /> },
  { id: 3, img: <ArDevilHorns /> },
  { id: 4, img: <ArLElephantTrunk /> },
  { id: 5, img: <ArMakeUpSplit /> },
  { id: 6, img: <ArPingPong /> },
  { id: 7, img: <ArGalaxy /> },
  { id: 8, img: <ArPixelHeart /> },
  { id: 9, img: <ArSnail /> },
];

function ArSlideBar() {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 100;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 100;
  };
  return (
    <>
      <div className=" relative flex items-center">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
        >
          {data.map((item) => (
            <div className="w-100 inline-block p-5 cursor-pointer hover:scale-110 ease-in-out duration-300 ">
              {item.img}
            </div>
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </>
  );
}

export default ArSlideBar;

// const data = [
//   { name: "item1" },
//   { name: "item2" },
//   { name: "item3" },
//   { name: "item4" },
//   { name: "item5" },
//   { name: "item6" },
//   { name: "item7" },
// ];

// const MenuItem = ({ text }) => {
//   return <div className="menu-item">{text}</div>;
// };

// export const Menu = (list) =>
//   list.map((el) => {
//     const { name } = el;
//     return <MenuItem text={name} key={name} />;
//   });

// function ArSlideBar() {
//   const [DataItem, setDataItem] = useState(null);
//   useEffect(() => {
//     setDataItem(Menu(list)); // Menu컴포넌트를 state에 저장
//   }, []);

//   console.log("dataitem1213213123123213123", DataItem);

//   return (
//     <div className="ArSlideBar">
//       <div className="wrap">
//         {DataItem && (
//           <ScrollMenu
//             data={DataItem}
//             wheel={true} // wheel 이 false 면 작동하지 않습니다
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ArSlideBar;
