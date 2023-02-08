import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import StreamComponent from "./StreamComponent";
import ToolbarComponent from "./ToolbarComponent";
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

import { Link } from "react-router-dom";

var localUser = new UserModel();
const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";
// process.env.NODE_ENV === "production"
//   ? "https://i8b207.p.ssafy.io/"
//   : "http://localhost:5000/";

const data = [
  { id: 1, img: <ArLion />, path: "/effects/lion" },
  { id: 2, img: <ArFlower />, path: "/effects/flowers" },
  { id: 3, img: <ArDevilHorns />, path: "/effects/Neon_Devil_Horns.deepar" },
  { id: 4, img: <ArLElephantTrunk />, path: "/effects/Elephant_Trunk.deepar" },
  { id: 5, img: <ArMakeUpSplit />, path: "/effects/Split_View_Look.deepar" },
  { id: 6, img: <ArGalaxy />, path: "/effects/galaxy_background_web.deepar" },
  { id: 7, img: <ArSnail />, path: "/effects/Snail.deepar" },
  { id: 8, img: <ArKoala />, path: "/effects/koala" },
  { id: 9, img: <ArDalmatian />, path: "/effects/dalmatian" },
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
    this.switchCamera = this.switchCamera.bind(this);

    this.canvasRef = document.createElement("canvas");
    this.applyDeepAR = this.applyDeepAR.bind(this);
    this.changeEffect = this.changeEffect.bind(this);
  }

  //AR 효과 바꾸기(AR이 실행중이어야 동작)
  changeEffect(effectName) {
    this.state.deepAR.switchEffect(0, "slot", effectName);
  }

  async applyDeepAR() {
    if (this.state.arEnable) {
      this.setState({
        arEnable: false,
      });
      await this.OV.getUserMedia({
        audioSource: undefined,
        videoSource: undefined,
      });
      var devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      await this.setState({
        currentVideoDevice: videoDevices[0],
      });
    } else {
      this.setState({
        arEnable: true,
      });
      this.startDeepAR(this.canvasRef);
      await this.setState({
        currentVideoDevice: this.canvasRef.captureStream().getVideoTracks()[0],
      });
    }

    var newPublisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: this.state.currentVideoDevice,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      mirror: true,
    });

    //newPublisher.once("accessAllowed", () => {
    await this.state.session.unpublish(this.state.localUser.getStreamManager());
    await this.state.session.publish(newPublisher);
    this.state.localUser.setStreamManager(newPublisher);
    this.setState({
      localUser: localUser,
    });
  }

  //AR Video Start
  startDeepAR(canvas) {
    var { DeepAR } = window;

    this.state.deepAR = DeepAR({
      canvasWidth: 550,
      canvasHeight: 307,
      licenseKey:
        "17b3582869e511e992581d53ee247344cfe4ea5b2787852672d14e03a419c3a887dafb093b8aa3ea",
      canvas: canvas,
      numberOfFaces: 3,
      libPath: "/lib",
      segmentationInfoZip: "segmentation.zip",
      onInitialize: () => {
        this.state.deepAR.startVideo(true);
      },
    });

    this.state.deepAR.downloadFaceTrackingModel("/lib/models-68-extreme.bin");
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
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
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        console.log(token);
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
        alert("There was an error getting the token:", error.message);
      }
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
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
    localUser.setNickname(this.state.myUserName);
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

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
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
          console.log("EVENTO REMOTE: ", event.data);
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

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager()
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

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
          <div className="flex flex-row w-[90em]">
            <ToolbarComponent
              sessionId={mySessionId}
              user={localUser}
              showNotification={this.state.messageReceived}
              camStatusChanged={this.camStatusChanged}
              micStatusChanged={this.micStatusChanged}
              switchCamera={this.switchCamera}
              leaveSession={this.leaveSession}
            />
            <WebCamBoard>
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div id="localUser">
                    <StreamComponent
                      user={localUser}
                      handleNickname={this.nicknameChanged}
                    />
                  </div>
                )}

              {this.state.subscribers.map((sub, i) =>
                i < 3 ? (
                  <div key={i} id="remoteUsers">
                    <StreamComponent
                      user={sub}
                      streamId={sub.streamManager.stream.streamId}
                    />
                  </div>
                ) : null
              )}

              {/* {this.state.subscribers.length === 0 ? (
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
              ) : null} */}
            </WebCamBoard>

            <div className="relative w-[9.5em]">
              <CommonBtn
                text="AR 버튼"
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
                        className=" ml-[3em] inline-block p-[3px] cursor-pointer  duration-300 "
                        onClick={() => this.changeEffect(item.path)}
                      >
                        {item.img}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="ml-[1em] absolute bottom-0">
                <Link to="/">
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
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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
