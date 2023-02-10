import AlertBox from "../../atoms/AlertBox";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import InputBox from "../../atoms/Input";
import CommonBtn from "./../../atoms/CommonBtn/index";
import chick_02 from "../../../assets/characters/chick_02.svg";
import { useEffect, useState } from "react";

function CodeModal() {
  const [count, setCount] = useState(179);
  const [min, setMit] = useState();
  const [sec, setSec] = useState();

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count - 1);
      setMit(parseInt(count / 60));
      setSec(parseInt(count % 60));
    }, 1000);
    return () => clearInterval(id);
  }, [count]);
  return (
    <>
      <div>{min}</div>
      <div>{sec}</div>
      <div>{count}</div>
      <AlertBox>
        <div className="mt-[2.5em] flex flex-col justify-center items-center">
          <div className="font-chick text-3xl">
            이메일로 코드가 발급되었습니다.
          </div>
          <div className="font-chick text-3xl mt-[0.5em]">
            코드를 입력해주세요.
          </div>
          <div className="font-chick text-3xl mt-[0.5em]">남은 시간 {} </div>
          <div className="mt-[1em] flex justify-center items-center">
            <label className="font-chick text-lg mr-[2em]" htmlFor="email">
              {"이메일"}
            </label>
            <div>
              <InputBox placeholder={"이메일을 입력해주세요."} />
            </div>
            <div className="ml-[2em] p-0">
              <CommonBtn text="코드 발송" color="bg-emerald-300" />
            </div>
          </div>
          <div className="mt-[2em] mr-[11.4em] flex justify-center items-center">
            <label className="font-chick text-lg mr-[3.2em]" htmlFor="email">
              {"코드"}
            </label>
            <div>
              <InputBox placeholder={"코드를 입력해주세요."} />
            </div>
          </div>
          <div className="flex flex-row mr-[15em]">
            <div>
              <img
                className="right-[3em] inline after:mr-5 w-[11.5em]"
                src={chick_02}
                alt="병아리캐릭터"
              />
            </div>
            <div className="mt-[2em]">
              <CommonBtn text="확인" color="bg-emerald-300" />
            </div>
          </div>
        </div>
      </AlertBox>
    </>
  );
}

export default CodeModal;
