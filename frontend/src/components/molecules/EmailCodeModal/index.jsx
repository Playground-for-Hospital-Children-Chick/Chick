import AlertBox from "../../atoms/AlertBox";
import GamePlayBtn from "../../atoms/GamePlayBtn";
import InputBox from "../../atoms/Input";
import CommonBtn from "./../../atoms/CommonBtn/index";
import chick_02 from "../../../assets/characters/chick_02.svg";
import { useEffect, useState, useCallback } from "react";
import { sendCodeUser, sendCheckCodeUser } from "./../../../api/UsersApi";
import Swal from "sweetalert2";

function CodeModal({
  emailVari,
  turnOnModal,
  setCheckedEmail,
  checkedEmail,
  setInputEmail,
  emailInputfollow,
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
  const [timeTrigger, setTimeTrigger] = useState(false);

  const sendEmail = async () => {
    setCount(179);
    setMit(2);
    setSec(59);
    turnOnModal();
  };
  const sendCode = async () => {
    const response = await sendCheckCodeUser({ userToken: codeInput.trim() });
    if (response === "error") {
      setCodeError(true);
    } else if (parseInt(Number(response.status) / 100) === 2) {
      Swal.fire({
        icon: "info",
        title: "이메일 인증 성공",
        text: "인증이 성공하였습니다!",
        showDenyButton: false,
        confirmButtonText: "확인",
        denyButtonText: undefined,
        confirmButtonColor: "#8cc8ff",
        denyButtonColor: undefined,
      }).then((res) => {
        if (res.isConfirmed) {
          console.log("test");
        }
      });
      console.log("test1");
      setCheckedEmail(emailInput);
      setCheckedEmail(inputEmail);
      console.log(checkedEmail);
      console.log(inputEmail);
      // emailInputfollow(emailInput);
      console.log("g");
      // setModal(!modal);
      // setCodeError(false);
    }
  };
  const handleChange = useCallback(
    (e) => {
      emailInputfollow(e.target.value);
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
      } catch (e) {}
    };
    getCodeResponse();
  }, [codeInput]);
  useEffect(() => {
    const getResponse = async () => {
      try {
        // api 요청
      } catch (e) {}
    };
    getResponse();
  }, [emailInput]);
  useEffect(() => {
    setemailInput(inputEmail);
  }, [inputEmail]);
  useEffect(() => {
    if (emailVari == "success") {
      setCount(179);
      setTimeTrigger(true);
    } else {
      setTimeTrigger(false);
    }
  }, [emailVari]);
  useEffect(() => {
    if (timeTrigger === true && count != 0) {
      const id = setInterval(() => {
        setCount(count - 1);
        setMit(parseInt((count - 1) / 60));
        setSec(parseInt((count - 1) % 60));
      }, 1000);
      return () => clearInterval(id);
    }
  }, [count, timeTrigger]);
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
          <div className="font-chick text-3xl">이메일로 발송한</div>
          <div className="font-chick text-3xl ">코드를 입력해주세요.</div>
          <div className="font-chick text-2xl mt-[0.5em]">
            남은 시간 {String(min).padStart(2, "0")} :{" "}
            {String(sec).padStart(2, "0")}
          </div>
          <div className="ml-[1em] mt-[1em] flex justify-center items-center">
            <label
              className="mb-[1em] font-chick text-lg mr-[2em]"
              htmlFor="email"
            >
              {"이메일"}
            </label>
            <div className="mt-[0.5em] flex flex-col justify-center">
              <div>
                <InputBox
                  text={inputEmail}
                  onChange={handleChange}
                  placeholder={"이메일을 입력해주세요."}
                />
              </div>
              {(() => {
                if (!inputEmail) {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      이메일 작성해주세요.
                    </p>
                  );
                } else if (emailVari == "regfail") {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      이메일 형식에 맞지 않습니다.
                    </p>
                  );
                } else if (emailVari == "DBfail") {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      서버에 문의해주세요.
                    </p>
                  );
                } else if (emailVari == "alreadyRegistered") {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      이미 가입된 이메일입니다.
                    </p>
                  );
                } else if (emailVari == "withdrawn") {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      회원탈퇴처리가 된 이메일입니다..
                    </p>
                  );
                } else if (emailVari == "codeFail") {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      서버에 문의해주세요.
                    </p>
                  );
                } else {
                  return (
                    <p className="text-md font-chick text-center text-pink-600">
                      코드 보내기 성공!
                    </p>
                  );
                }
              })()}
            </div>
            <div className="mb-[1em] ml-[2em] p-0 text-sm">
              <CommonBtn
                text="재발송"
                onClick={sendEmail}
                color="bg-emerald-300"
                textsize="text-xl"
              />
            </div>
          </div>
          <div className="mt-[0.5em] mr-[7.5em] flex justify-center items-center">
            <label
              className="mb-[0.6em] font-chick text-lg mr-[3.2em]"
              htmlFor="email"
            >
              {"코드"}
            </label>
            <div className="flex flex-col justify-center">
              <div>
                <InputBox
                  onChange={handleChangeCode}
                  placeholder={"코드를 입력해주세요."}
                />
              </div>
              {codeError === false ? (
                <div className="text-md font-chick right-[32%]  text-center text-emerald-600">
                  코드를 입력해주세요
                </div>
              ) : (
                <div className="text-md font-chick right-[32%]  text-center text-pink-600">
                  코드가 틀렸습니다.
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center mr-[2em]">
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
