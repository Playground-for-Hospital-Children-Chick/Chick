import React, {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  createRef,
  useState,
  useCallback,
} from "react";
// import { useDispatch } from "react-redux/es/exports";
import { useNavigate, useLocation } from "react-router-dom";

import {
  OpenVidu,
  Session,
  Subscriber,
  Device,
  Publisher,
} from "openvidu-browser";
import axios from "axios";
import UserVideoComponent from "../UserVideoComponent";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

const VideoRoomComponent = function () {
  // const dispatch = useDispatch();
  // const location = useLocation(); // 로케이션(이전 페이지에서 데이터를 받아옴)
  // const roomId = location.state !== null ? location.state.id : null;

  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [publisher, setPublisher] = useState(undefined); //자신의 캠
  const [subscribers, setSubscribers] = useState([]); //다른 유저의 스트림 정보 저장 배열
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수

  let OV = undefined;

  //세션 만들기

  const createSession = async function (sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  //create token
  const createToken = async function (sessionId) {
    const response = await axios({
      method: "post",
      url:
        APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      data: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  //get token
  const getToken = async function () {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  //세션 아이디 설정
  // useEffect(() => {
  //   setMySessionId(`Session${roomId}`);
  // });

  //세션 참여하기
  const joinSessionId = () => {
    OV = new OpenVidu();

    let mySession = OV.initSession();

    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      // 스트림이 생길 때마다
      const subscriber = mySession.subscribe(event.stream, "publisher"); // 퍼블리셔를 구독자로 넣어줌
      setSubscribers(subscriber);
    });

    mySession.on("streamDestroyed", (event) => {
      // 스트림을 종료할 때마다
      deleteSubscriber(event.stream.streamManager); // 참가자 배열에서 스트림 객체를 제거함
    });

    mySession.on("exception", (exception) => {
      // 예외 처리
      console.warn(exception);
    });

    mySession.on("connectionCreated", ({ stream }) => {
      // 유저가 접속할 때마다 인원수를 += 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1;
      });
    });

    mySession.on("connectionDestroyed", ({ stream }) => {
      // 유저가 접속을 끊을 때마다 -= 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1;
      });
    });

    // --- 4) 유효한 토큰으로 세션에 접속하기 ---
    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // --- 5) Get your own camera stream ---(퍼블리셔)
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "1280x720", // The resolution of your video '450x720'
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });
          console.log("mid", publisher);

          mySession.publish(publisher);
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          // --- 6) 자신의 화면을 송출 ---
          setPublisher(publisher); // 퍼블리셔(스트림 객체)를 담음
          // setMainStreamManager(publisher); // 퍼블리셔(스트림 객체)를 담음
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  // 세선 떠나기 --- 7) disconnect함수를 호출하여 세션을 떠남

  const leave = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
      // navigate("/"); // 메인페이지로 이동
    }
    // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));

    setPublisher(undefined);
    setTotalUsers((prevTotalUsers) => {
      return 0;
    });
  };
  useEffect(() => {
    const onbeforeunload = (event) => {
      leave();
    };
    window.addEventListener("beforeunload", onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, [leave]);

  // 참가자를 배열에서 제거함
  const deleteSubscriber = useCallback(
    (streamManager) => {
      let tmp_subscribers = subscribers;
      let index = tmp_subscribers.indexOf(streamManager, 0);
      if (index > -1) {
        tmp_subscribers.splice(index, 1);
        setSubscribers(tmp_subscribers); // 이거 안 되면 구조분해할당으로 업데이트 할 것
      }
    },
    [subscribers]
  );

  console.log(publisher);
  return;
  <div>
    야이새키야 좀 돼라
    <UserVideoComponent streamManager={publisher}></UserVideoComponent>
    {/* <UserVideoComponent streamManager={subscribers}></UserVideoComponent> */}
  </div>;
};

export default VideoRoomComponent;
