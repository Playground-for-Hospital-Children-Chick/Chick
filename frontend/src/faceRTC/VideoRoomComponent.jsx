import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import StreamComponent from "./StreamComponent";
import UserModel from "./models/user-model";
import WebCamBoard from "../components/atoms/WebCamBoard";
import FriendIsComing from "../components/atoms/FriendIsComing";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import ArDevilHorns from "../components/atoms/ArDevilHorns";
import ArLElephantTrunk from "../components/atoms/ArElephantTrunk";
import ArGalaxy from "../components/atoms/ArGalaxy";
import ArLion from "../components/atoms/ArLion";
import ArMakeUpSplit from "../components/atoms/ArMakeUpSplit";
import ArSnail from "../components/atoms/ArSnail";
import ArFlower from "./../components/atoms/ArFlower/index";
import ArKoala from "../components/atoms/ArKoala";
import ArDalmatian from "../components/atoms/ArDalmatian";
import CommonBtn from "../components/atoms/CommonBtn";

import { Link, useNavigate } from "react-router-dom";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";

import IconButton from "@material-ui/core/IconButton";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import ReportBtn from "../components/atoms/ReportBtn";

var localUser = new UserModel();
const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";
// const APPLICATION_SERVER_URL = import.meta.env.APPLICATION_SERVER_URL;
const DEEP_AR_LICENSE_KEY =
  "17b3582869e511e992581d53ee247344cfe4ea5b2787852672d14e03a419c3a887dafb093b8aa3ea";
// const DEEP_AR_LICENSE_KEY = import.meta.env.DEEP_AR_LICENSE_KEY;

const data = [
  { id: 1, img: <ArLion />, path: "/effects/lion" },
  { id: 2, img: <ArFlower />, path: "/effects/flowers" },
  { id: 3, img: <ArKoala />, path: "/effects/koala" },
  { id: 4, img: <ArDalmatian />, path: "/effects/dalmatian" },
  { id: 5, img: <ArDevilHorns />, path: "/effects/Neon_Devil_Horns.deepar" },
  { id: 6, img: <ArLElephantTrunk />, path: "/effects/Elephant_Trunk.deepar" },
  { id: 7, img: <ArMakeUpSplit />, path: "/effects/Split_View_Look.deepar" },
  { id: 8, img: <ArGalaxy />, path: "/effects/galaxy_background_web.deepar" },
  { id: 9, img: <ArSnail />, path: "/effects/Snail.deepar" },
];

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);

    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : "SessionA";
    let userName = this.props.user
      ? this.props.user
      : "OpenVidu_User" + Math.floor(Math.random() * 100);
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      currentVideoDevice: undefined,
      arEnable: false,
      deepAR: undefined,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    // this.switchCamera = this.switchCamera.bind(this);

    this.canvasRef = document.createElement("canvas");
    this.applyDeepAR = this.applyDeepAR.bind(this);
    this.changeEffect = this.changeEffect.bind(this);

    this.block = this.block.bind(this);
    this.askBlock = this.askBlock.bind(this);
  }

  askBlock(sub) {
    Swal.fire({
      icon: "info",
      title: "상대를 차단하시겠습니까?",
      text: "차단 후 홈 화면으로 이동합니다.",
      showDenyButton: false,
      confirmButtonText: "차단",
      denyButtonText: ``,
      confirmButtonColor: "#ff82b3",
      denyButtonColor: "#8cc8ff",
    }).then((result) => {
      if (result.isConfirmed) {
        this.block(sub);
      } else if (result.isDenied) {
      }
    });
  }

  async block(sub) {
    const response = await axios({
      method: "post",
      url: APPLICATION_SERVER_URL + "api/report/block",
      data: {
        category: "미정",
        content: "미정",
        reportedPeople: sub.nickname,
        reporter: this.props.email,
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    if (response.status == 200) {
      // console.log("**********leaveSession Success**********");
    }

    window.location.href = "/home";
  }

  //AR 효과 바꾸기(AR이 실행중이어야 동작)
  changeEffect(effectName) {
    if (effectName === "reset") {
      // console.log("effect reset");
      this.state.deepAR.clearEffect("slot");
    } else {
      this.state.deepAR.switchEffect(0, "slot", effectName);
    }
  }

  handleCapture = () => {
    const targetNode = document.getElementById("webcamboard");

    html2canvas(targetNode).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");

      const currentTime = Date.now();

      const fileName = currentTime + ".png";

      const formData = new FormData();
      formData.append("file", this.dataURLtoBlob(imageData), fileName);
      formData.append("email", this.props.email);

      axios
        .post(APPLICATION_SERVER_URL + "api/s3/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "내 정보에서 확인하세요!",
            showConfirmButton: false,
            timer: 1500,
          });

          // console.log("Image and form data saved successfully", response.data);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "이미지 저장 실패",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error("Error saving image and form data", error);
        });
    });
  };

  dataURLtoBlob(dataURL) {
    const binary = atob(dataURL.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: "image/png",
    });
  }

  // 이미지 저장 메소드
  // onSaveAS = (url, filename) => {
  //   console.log("onSaveAS");
  //   var link = document.createElement("a");
  //   document.body.appendChild(link);
  //   link.href = url;
  //   link.download = filename;
  //   link.click();
  //   document.body.removeChild(link);
  // };

  async applyDeepAR() {
    if (this.state.arEnable) {
      this.setState({
        arEnable: false,
      });

      this.changeEffect("reset");
    } else {
      this.setState({
        arEnable: true,
      });
      this.startDeepAR(this.canvasRef);
      await this.setState({
        currentVideoDevice: this.canvasRef.captureStream().getVideoTracks()[0],
      });

      let publisher = this.OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: this.state.currentVideoDevice,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: true,
        resolution: "500x307",
        frameRate: 30,
      });

      await this.state.session.unpublish(
        this.state.localUser.getStreamManager()
      );
      await this.state.session.publish(publisher);
      this.state.localUser.setStreamManager(publisher);
      this.setState({
        localUser: localUser,
      });
    }
  }

  //AR Video Start
  startDeepAR(canvas) {
    var { DeepAR } = window;

    this.state.deepAR = DeepAR({
      canvasWidth: 500,
      canvasHeight: 307,
      licenseKey: DEEP_AR_LICENSE_KEY,
      canvas: canvas,
      numberOfFaces: 3,
      libPath: "/lib",
      segmentationInfoZip: "segmentation.zip",
      onInitialize: () => {
        this.state.deepAR.startVideo(true);

        this.state.deepAR.switchEffect(0, "slot", "/effects/dalmatian");
      },
    });

    this.state.deepAR.downloadFaceTrackingModel(
      "/lib/models-68-extreme.bin",
      () => {
        // console.log("AR 효과 적용");
      }
    );
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    // this.state.deepAR.stopVideo();
    window.removeEventListener("beforeunload", this.onbeforeunload);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      }
    );
  }

  async connectToSession() {
    if (this.props.token !== undefined) {
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        this.connect(token);
      } catch (error) {
        console.error(
          "There was an error getting the token:",
          error.code,
          error.message
        );

        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }

        Swal.fire({
          icon: "info",
          title: "중복 접속",
          text: "같은 계정이 방에 입장해 있어요..!.",
          confirmButtonText: "홈 화면으로 돌아가기",
          confirmButtonColor: "#8cc8ff",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/home";
            return;
          }
        });
      }
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(async () => {
        await this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "555x307",
      frameRate: 30,
      insertMode: "APPEND",
      mirror: true,
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.props.email);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    // this.sendSignalUserChanged({
    //   isScreenShareActive: localUser.isScreenShareActive(),
    // });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
          });
        }
      }
    );
  }

  async leaveSession() {
    // this.state.deepAR.stopVideo();
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    const response = await axios({
      method: "post",
      url:
        APPLICATION_SERVER_URL +
        "api/sessions/" +
        this.state.mySessionId +
        "/disconnect",
      data: {
        email: this.props.email,
        sessionId: this.state.mySessionId,
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    if (response.status == 200) {
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
      arEnable: false,
      deepAR: undefined,
      currentVideoDevice: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      event.preventDefault();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
        }
      });
      this.setState({
        subscribers: remoteUsers,
      });
    });
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  // async switchCamera() {
  //   try {
  //     const devices = await this.OV.getDevices();
  //     var videoDevices = devices.filter(
  //       (device) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         var newPublisher = this.OV.initPublisher(undefined, {
  //           audioSource: undefined,
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: localUser.isAudioActive(),
  //           publishVideo: localUser.isVideoActive(),
  //           mirror: true,
  //         });

  //         //newPublisher.once("accessAllowed", () => {
  //         await this.state.session.unpublish(
  //           this.state.localUser.getStreamManager()
  //         );
  //         await this.state.session.publish(newPublisher);
  //         this.state.localUser.setStreamManager(newPublisher);
  //         this.setState({
  //           currentVideoDevice: newVideoDevice,
  //           localUser: localUser,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;

    return (
      <div>
        {this.state.session === undefined ? (
          <div className="p-2 m-2">
            <Box sx={{ width: "50%" }}>
              <CircularProgress />
            </Box>
          </div>
        ) : null}
        {this.state.session !== undefined ? (
          <div className="flex flex-row w-[80em]">
            <div id="webcamboard">
              <WebCamBoard>
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    // <div className="mt-3 mb-3 mr-3 rounded-[30px] w-[500px] h-[307px] flex items-center justify-center">
                    <div
                      id="localUser"
                      className="relative m-3 rounded-[30px] w-[500px] h-[307px] flex items-center justify-center "
                      // className="relative m-3 rounded-[30px] w-[200px] h-[300px] md:w-[300px] lg:w-[400px] xl:w-[550px] 2xl:w-[650px] flex items-center justify-center "
                    >
                      <StreamComponent
                        user={localUser}
                        handleNickname={this.nicknameChanged}
                      />
                      <div className="rounded-[30px] absolute bottom-0 right-3 flex flex-row bg-[#ffff]">
                        {/* <div className="font-chick text-white">
                        {this.state.myUserName}
                      </div> */}
                        <IconButton
                          color="inherit"
                          className="navButton"
                          id="navCamButton"
                          onClick={this.camStatusChanged}
                        >
                          {localUser !== undefined &&
                          localUser.isVideoActive() ? (
                            <Videocam />
                          ) : (
                            <VideocamOff color="secondary" />
                          )}
                        </IconButton>

                        <IconButton
                          color="inherit"
                          className="navButton"
                          id="navMicButton"
                          onClick={this.micStatusChanged}
                        >
                          {localUser !== undefined &&
                          localUser.isAudioActive() ? (
                            <Mic />
                          ) : (
                            <MicOff color="secondary" />
                          )}
                        </IconButton>
                      </div>
                      {/* </div>{" "} */}
                    </div>
                  )}

                {this.state.subscribers.map((sub, i) =>
                  i < 3 ? (
                    <div
                      key={i}
                      className=" m-3 rounded-[30px] w-[500px] h-[307px] flex items-center justify-center relative"
                      // className=" m-3 rounded-[30px] w-[200px] h-[300px] md:w-[300px] lg:w-[400px] xl:w-[550px] 2xl:w-[650px] flex items-center justify-center relative"
                      id="remoteUsers"
                    >
                      <StreamComponent
                        user={sub}
                        streamId={sub.streamManager.stream.streamId}
                      />

                      {this.props.userType !== "guest" ? (
                        <div className="absolute right-0 top-0">
                          <button onClick={() => this.askBlock(sub)}>
                            <ReportBtn />
                          </button>
                        </div>
                      ) : null}

                      {/* <div className="absolute right-0 top-0">
                        <button onClick={() => this.block(sub)}>
                          <ReportBtn />
                        </button>
                      </div> */}

                      {/* <div className="font-chick text-white">
                      {sub.streamManager.stream.streamId}
                    </div> */}
                    </div>
                  ) : null
                )}

                {this.state.subscribers.length === 0 ? (
                  <div>
                    <FriendIsComing />
                  </div>
                ) : null}
                {this.state.subscribers.length === 0 ? (
                  <div>
                    <FriendIsComing />
                  </div>
                ) : null}
                {this.state.subscribers.length === 0 ? (
                  <div>
                    <FriendIsComing />
                  </div>
                ) : null}

                {this.state.subscribers.length === 1 ? (
                  <div>
                    <FriendIsComing />
                  </div>
                ) : null}
                {this.state.subscribers.length === 1 ? (
                  <div>
                    <FriendIsComing />
                  </div>
                ) : null}

                {this.state.subscribers.length === 2 ? (
                  <div>
                    <FriendIsComing />
                  </div>
                ) : null}
              </WebCamBoard>
            </div>

            <div className="relative w-[9.5em]">
              <div className="font-chick ">{this.state.mySessionId}</div>

              {this.props.userType == "guest" ? null : (
                <CommonBtn
                  text="사진찍기"
                  color={"bg-emerald-300"}
                  onClick={this.handleCapture}
                />
              )}
              <CommonBtn
                text="변신놀이"
                color={"bg-blue-300"}
                onClick={this.applyDeepAR}
              />

              {this.state.arEnable === true ? (
                <div>
                  <div
                    id="slider"
                    className="justify-between mt-[1em] h-[28em] overflow-y-scroll flex flex-col scrollbar-hide"
                  >
                    {data.map((item) => (
                      <button
                        key={item.id}
                        className=" ml-[3em] inline-block p-[3px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 "
                        onClick={() => this.changeEffect(item.path)}
                      >
                        {item.img}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="ml-[1em] absolute bottom-0">
                <Link to="/home">
                  <CommonBtn text="나가기" color={"bg-pink-300"} />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.props.email);
    this.setState({
      mySessionId: sessionId,
    });

    return await this.createToken(sessionId);
  }

  async createSession(email) {
    let guest = "true";

    // 유저 타입에 따라 매칭되는게 다름
    if (this.props.userType == "user") {
      guest = "false";
    } else if (this.props.userType == "guest") {
      guest = "true";
    }

    const response = await axios({
      method: "post",
      url: APPLICATION_SERVER_URL + "api/sessions",
      data: {
        email: email,
        gameType: "face",
        guest: guest,
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}
export default VideoRoomComponent;
