import AlertBox from "../../atoms/AlertBox";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import InputBox from "../../atoms/Input";
import CommonBtn from "./../../atoms/CommonBtn/index";
import chick_02 from "../../../assets/characters/chick_02.svg";
import { useEffect, useState, useCallback } from "react";
import { sendCodeUser, sendCheckCodeUser } from "./../../../api/UsersApi";

function CodeModal({
  emailVari,
  turnOnModal,
  setCheckedEmail,
  setInputEmail,
  checkedEmail,
  inputEmail,
  setModal,
  modal,
}) {
  const [count, setCount] = useState(179);
  const [min, setMit] = useState(2);
  const [sec, setSec] = useState(59);
  const [emailInput, setemailInput] = useState("");
  const [codeInput, setcodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const startModal = () => {
    if (!inputEmail) {
      return <p>이메일 작성해주세요.</p>;
    } else if (emailVari == "regfail") {
      return <p>이메일 형식에 맞지 않습니다.</p>;
    } else if (emailVari == "DBfail") {
      return <p>가입된 이메일입니다.</p>;
    } else if (emailVari == "codeFail") {
      return <p>서버에 문의해주세요.</p>;
    } else {
      return <p>코드 보내기 성공!</p>;
    }
  };
  const memoizedCallback = useCallback(() => {
    startModal();
  }, []);
  const sendEmail = async () => {
    setCount(179);
    setMit(2);
    setSec(59);
    turnOnModal();
  };
  const sendCode = async () => {
    console.log("코드전송");
    const response = await sendCheckCodeUser({ userToken: codeInput });
    console.log(response);
    if (!response) {
      setCodeError(true);
    } else if (parseInt(Number(response.status) / 100) === 2) {
      setCheckedEmail(emailInput);
      console.log(checkedEmail);
      setModal(!modal);
      setCodeError(false);
    }
  };
  const handleChange = useCallback(
    (e) => {
      setInputEmail(e.target.value);
    },
    [emailInput]
  );
  const handleChangeCode = useCallback(
    (e) => {
      setcodeInput(e.target.value);
    },
    [codeInput]
  );
  useEffect(() => {
    const getCodeResponse = async () => {
      try {
        // api 요청
        console.log(codeInput);
      } catch (e) {
        console.error(e.response);
      }
    };
    getCodeResponse();
  }, [codeInput]);
  useEffect(() => {
    const getResponse = async () => {
      try {
        // api 요청
        console.log(emailInput);
      } catch (e) {
        console.error(e.response);
      }
    };
    getResponse();
  }, [emailInput]);
  useEffect(() => {
    setemailInput(inputEmail);
  }, []);
  useEffect(() => {
    if (count != 0) {
      const id = setInterval(() => {
        setCount(count - 1);
        setMit(parseInt((count - 1) / 60));
        setSec(parseInt((count - 1) % 60));
      }, 1000);
      return () => clearInterval(id);
    } else {
      setCount(0);
    }
  }, [count]);
  return (
    <div>
      <AlertBox>
        <div className="absolute left-[90%] top-[10%] -translate-y-[50%] -translate-x-[50%]">
          <CommonBtn
            onClick={() => setModal(!modal)}
            text="X"
            padding="p-[2em]"
            color="bg-pink-100"
          />
        </div>
        <div className="mt-[3em] flex flex-col justify-center items-center">
          <div className="font-chick text-3xl">이메일로 코드가 발급해서,</div>
          <div className="font-chick text-3xl mt-[0.5em]">
            코드를 입력해주세요.
          </div>
          <div className="font-chick text-3xl mt-[0.5em]">
            남은 시간 {String(min).padStart(2, "0")} :{" "}
            {String(sec).padStart(2, "0")}
          </div>
          <div className="mt-[1em] flex justify-center items-center">
            <label className="font-chick text-lg mr-[2em]" htmlFor="email">
              {"이메일"}
            </label>
            <div>
              <InputBox
                text={inputEmail}
                onChange={handleChange}
                placeholder={"이메일을 입력해주세요."}
              />
            </div>
            {memoizedCallback()}
            <div className="ml-[2em] p-0">
              <CommonBtn
                text="코드 발송"
                onClick={sendEmail}
                color="bg-emerald-300"
              />
            </div>
          </div>
          <div className="mt-[0.5em] mr-[11.4em] flex justify-center items-center">
            <label className="font-chick text-lg mr-[3.2em]" htmlFor="email">
              {"코드"}
            </label>
            <div className="flex flex-col items-center">
              <InputBox
                onChange={handleChangeCode}
                placeholder={"코드를 입력해주세요."}
              />
            </div>
          </div>
        </div>
        {codeError === false ? (
          <div className="invisible text-md font-chick right-[32%]  text-center text-pink-600">
            코드가 틀렸습니다.
          </div>
        ) : (
          <div className="text-md font-chick right-[32%]  text-center text-pink-600">
            코드가 틀렸습니다.
          </div>
        )}

        <div className="flex flex-row mr-[15em]">
          <div>
            <img
              className="right-[3em] inline after:mr-5 w-[9em]"
              src={chick_02}
              alt="병아리캐릭터"
            />
          </div>
          <div>
            {min == 0 && sec == 0 ? (
              <CommonBtn option={true} text="확인" color="bg-gray" />
            ) : (
              <CommonBtn
                onClick={sendCode}
                option={false}
                text="확인"
                color="bg-emerald-300"
              />
            )}
          </div>
        </div>
      </AlertBox>
    </div>
  );
}

export default CodeModal;
