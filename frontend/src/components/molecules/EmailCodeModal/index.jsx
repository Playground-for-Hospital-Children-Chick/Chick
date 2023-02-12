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
  const [emailCheck, setEmailCheck] = useState("");
  const [codeCheck, setCodeCheck] = useState("");
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
    const response = await sendCheckCodeUser({ userToken: codeCheck });
    console.log(response);
    if (parseInt(Number(response.status) / 100) === 2) {
      setCheckedEmail(emailCheck);
      console.log(checkedEmail);
      () => setModal(!modal);
    } else {
      return <p>잘못된 코드 입니다.</p>;
    }
  };
  const handleChange = useCallback(
    (e) => {
      setInputEmail(e.target.value);
    },
    [emailCheck]
  );
  const handleChangeCode = useCallback(
    (e) => {
      setCodeCheck(e.target.value);
    },
    [codeCheck]
  );
  useEffect(() => {
    const getCodeResponse = async () => {
      try {
        // api 요청
        console.log(codeCheck);
      } catch (e) {
        console.error(e.response);
      }
    };
    getCodeResponse();
  }, [codeCheck]);
  useEffect(() => {
    const getResponse = async () => {
      try {
        // api 요청
        console.log(emailCheck);
      } catch (e) {
        console.error(e.response);
      }
    };
    getResponse();
  }, [emailCheck]);
  useEffect(() => {
    setEmailCheck(inputEmail);
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
          <div className="mt-[2em] mr-[11.4em] flex justify-center items-center">
            <label className="font-chick text-lg mr-[3.2em]" htmlFor="email">
              {"코드"}
            </label>
            <div>
              <InputBox
                onChange={handleChangeCode}
                placeholder={"코드를 입력해주세요."}
              />
            </div>
          </div>
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
        </div>
      </AlertBox>
    </div>
  );
}

export default CodeModal;
