import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useCallback, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import deleteRoom from "./delete";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading/Loading";
import { useSelector } from "react-redux";
import _ from "lodash";
import nameList from "../../common/randomNickname";
import NotFound from "../pages/NotFound";
import { changeStatus } from "../../common/hostSlice";
import { useDispatch } from "react-redux/es/exports";

const OPENVIDU_SERVER_URL = "https://i8b207.p.ssafy.io/";

const VideoRoomComponent = () => {
  const navigate = useNavigate(); // 네비게이터(방 나갈 때 사용)
  const dispatch = useDispatch();
  const location = useLocation(); // 로케이션(이전 페이지에서 데이터를 받아옴)
  const roomId = location.state !== null ? location.state.id : null;

  const isHost = useSelector((state) => state.hostStatus.value.host); // console.log(useSelector((state) => state.hostStatus.value.host));

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열

  let OV = undefined;

  // 토큰 받아오기
  const getToken = useCallback(() => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  // 세션 생성
  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/openvidu/accept-certificate"
              ); // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  };

  // 토큰 생성(KMS로 직접 쏨)
  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    console.log(myRole);
    return new Promise((resolve, reject) => {
      const data = { role: myRole }; // 여기에 인자를 뭐를 넣냐에 따라 오픈비두 서버에 요청하는 데이터가 달라짐
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  // 세션 아이디 설정
  useEffect(() => {
    setMySessionId(`Session${roomId}`);
  }, []);

  // 세션에 참여하기
  const joinSession = () => {
    OV = new OpenVidu(); // --- 1) 오픈비두 오브젝트 생성 ---

    let mySession = OV.initSession(); // --- 2) 세션을 시작 --

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
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
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

          mySession.publish(publisher); // --- 6) 자신의 화면을 송출 ---
          setPublisher(publisher); // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher); // 퍼블리셔(스트림 객체)를 담음
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

  // 방 삭제 요청 api
  const deleteRoomRequest = async () => {
    if (isHost) {
      dispatch(changeStatus(false));
      // setIsHost(false) // isHost를 false로 설정함
      const reqeustResponse = await deleteRoom(roomId);
      if (reqeustResponse) {
        console.log("Room Deleted Successfully!");
      } else {
        console.log("Room Deleted Failed!");
      }
    }
  };

  // 세선 떠나기 --- 7) disconnect함수를 호출하여 세션을 떠남
  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
      navigate("/"); // 메인페이지로 이동
    }
    // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setMessageList([]);
    setToggleStart(false);
    setChatDisplay(true);
    setTotalUsers((prevTotalUsers) => {
      return 0;
    });
    setItemIndex(0); // 0으로 바꿔줘야 방을 파고 다시 들어왔을 때 목록을 0부터 시작할 수 있음
    setSeconds(0); // 시간 초를 0초로 초기화
    deleteRoomRequest(); // 방 삭제를 요청함
  };

  // 호스트(방 생성자) 여부에 따른 isHost를 토글링함(created()) + 호스트가 아닐 경우 유저의 이름을 바꿈
  useEffect(() => {
    // setIsHost(localStorage.getItem("host") ? true : false)
    setMyUserName(_.sample(nameList));
  }, []);

  useEffect(() => {
    const onbeforeunload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, [leaveSession]);

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

  // 로딩 페이지를 통한 방 입장
  const enterAuctionRoom = () => {
    joinSession();
  };

  return (
    <ContainerDiv>
      {session === undefined && roomId !== null && (
        <Loading enterAuctionRoom={enterAuctionRoom}></Loading>
      )}
      {roomId == null && <NotFound></NotFound>}
      {session !== undefined ? (
        <ContainerDiv>
          {mainStreamManager !== undefined ? (
            <MainVideoDiv>
              {isHost && (
                <UserVideoComponent
                  streamManager={publisher}
                ></UserVideoComponent>
              )}
              {!isHost && (
                <UserVideoComponent
                  streamManager={subscribers}
                ></UserVideoComponent>
              )}
            </MainVideoDiv>
          ) : null}
        </ContainerDiv>
      ) : null}
    </ContainerDiv>
  );
};

export default VideoRoomComponent;
