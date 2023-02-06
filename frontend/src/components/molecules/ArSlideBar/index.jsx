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

// const list = [
//   { name: <ArLion /> },
//   { name: <ArFlower /> },
//   { name: <ArDevilHorns /> },
//   { name: <ArLElephantTrunk /> },
//   { name: <ArMakeUpSplit /> },
//   { name: <ArPingPong /> },
//   { name: <ArGalaxy /> },
//   { name: <ArPixelHeart /> },
//   { name: <ArSnail /> },
// ];

const list = [
  { name: "item1" },
  { name: "item2" },
  { name: "item3" },
  { name: "item4" },
  { name: "item5" },
  { name: "item6" },
  { name: "item7" },
];

const MenuItem = ({ text }) => {
  return <div className="menu-item">{text}</div>;
};

export const Menu = (list) =>
  list.map((el) => {
    const { name } = el;
    return <MenuItem text={name} key={name} />;
  });

function ArSlideBar() {
  const [DataItem, setDataItem] = useState(null);
  useEffect(() => {
    setDataItem(Menu(list)); // Menu컴포넌트를 state에 저장
  }, []);

  console.log("dataitem1213213123123213123", DataItem);

  return (
    <div className="ArSlideBar">
      <div className="wrap">
        {DataItem && (
          <ScrollMenu
            data={DataItem}
            wheel={true} // wheel 이 false 면 작동하지 않습니다
          />
        )}
      </div>
    </div>
  );
}

export default ArSlideBar;

// function ArSlideBar() {
//   return (
//     <div id="scroll-horizontal" style={{ height: `45em` }}>
//       <ScrollHorizontal>{list}</ScrollHorizontal>
//     </div>
//   );
// }

// export default ArSlideBar;
