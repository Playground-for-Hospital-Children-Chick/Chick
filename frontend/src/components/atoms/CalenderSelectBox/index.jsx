import React, { useState } from "react";

function CalenderSelectBox() {
  const now = new Date();
  let nowMonth = "";
  let nowDay = "";
  if (now.getMonth() + 1 < 10) {
    nowMonth = "0" + (now.getMonth() + 1).toString();
  } else {
    nowMonth = (now.getMonth() + 1).toString();
  }
  if (now.getDate() < 10) {
    nowDay = "0" + now.getDate().toString();
  } else {
    nowDay = now.getDate().toString();
  }
  const [nowDate] = useState([now.getFullYear(), nowMonth, nowDay]);

  let years = [];
  for (let yyyy = now.getFullYear(); yyyy >= 2000; yyyy -= 1) {
    years.push(yyyy);
  }
  const [nowCal, setNowCal] = useState({
    year: years[0],
    month: "01",
    day: "01",
  });

  let months = [];
  for (let mm = 12; mm >= 1; mm -= 1) {
    if (mm < 10) {
      months.push("0" + mm.toString());
    } else {
      months.push(mm.toString());
    }
  }

  let days = [];
  let date = new Date(nowCal.year, nowCal.month, 0).getDate();
  for (let dd = date; dd >= 1; dd -= 1) {
    if (dd < 10) {
      days.push("0" + dd.toString());
    } else {
      days.push(dd.toString());
    }
  }

  return (
    <>
      <div className="flex gap-x-6 items-center">
        <div
          className="flex text-center font-chick flex justify-center items-center  relative overflow-hidden px-5 py-5 rounded-[30px]"
          style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
        >
          <select
            className="text-xl"
            defaultValue={nowDate[0]}
            onChange={(e) => {
              setNowCal({ ...nowCal, year: e.target.value });
            }}
          >
            {years.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div
          className="flex text-center font-chick flex justify-center items-center  relative overflow-hidden px-5 py-5 rounded-[30px]"
          style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
        >
          <select
            className="text-xl"
            defaultValue={nowDate[1]}
            onChange={(e) => {
              setNowCal({ ...nowCal, month: e.target.value });
            }}
          >
            {months.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div
          className="flex text-center font-chick flex justify-center items-center  relative overflow-hidden px-5 py-5 rounded-[30px]"
          style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
        >
          <select
            className="text-xl"
            defaultValue={nowDate[2]}
            onChange={(e) => {
              setNowCal({ ...nowCal, day: e.target.value });
            }}
          >
            {days.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default CalenderSelectBox;
