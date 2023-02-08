import { OpenVidu } from "openvidu-browser";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";
import ArBottomBarBase from "../components/atoms/ArBottomBarBase";
import WebCamBoard from "../components/atoms/WebCamBoard";
import FriendIsComing from "../components/atoms/FriendIsComing";
import MicBtn from "../components/atoms/MicBtn";
import VideoBtn from "../components/atoms/VideoBtn";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// const APPLICATION_SERVER_URL = "http://localhost:5000/";
// "http://localhost:5000/";

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

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";

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
// var deepAR = null;

class Video extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      publisher: undefined,
      subscribers: [],
      mediaStream: undefined,
      arEnable: false,
      deepAR: undefined,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.applyDeepAR = this.applyDeepAR.bind(this);
    this.canvasRef = document.createElement("canvas");

    this.changeEffectOne = this.changeEffectOne.bind(this);
  }

  changeEffectOne(effectName) {
    this.state.deepAR.switchEffect(0, "slot", effectName);
  }

  async applyDeepAR() {
    console.log("잘들어왔나확인");
    if (this.state.arEnable) {
      this.setState({
        arEnable: false,
      });
    } else {
      this.setState({
        arEnable: true,
      });
    }

    this.startDeepAR(this.canvasRef);
    await this.setState({
      mediaStream: this.canvasRef.captureStream(),
    });
    console.log("mediaStream", this.state.mediaStream);
    var videoTracks = this.state.mediaStream.getVideoTracks();
    console.log("videoTracks[0]", videoTracks[0]);
    console.log(this.state.publisher.properties.videoSource);

    if (this.state.publisher.properties.videoSource == undefined) {
      this.state.publisher.properties.videoSource = videoTracks[0];
    } else {
      this.state.publisher.properties.videoSource = undefined;
    }
    console.log(this.state.publisher.properties.videoSource);
    this.state.session.unpublish(this.state.publisher).then(() => {
      this.state.session.publish(this.state.publisher);
    });
  }

  startDeepAR(canvas) {
    var { DeepAR } = window;
    // this.state.DeepAR = window;

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
        // console.log("deepAR Ready");

        this.state.deepAR.startVideo(true);

        // deepAR.switchEffect(0, "slot", "/effects/flowers", () => {
        //   console.log("flower loaded");
        // });
      },
    });

    this.state.deepAR.downloadFaceTrackingModel("/lib/models-68-extreme.bin");
  }

  camStatusChanged() {
    if (this.state.publisher.properties.videoSource) {
      this.applyDeepAR();
    }
    this.state.publisher.stream.videoActive =
      !this.state.publisher.stream.videoActive;

    this.state.session.unpublish(this.state.publisher).then(() => {
      this.state.session.publish(this.state.publisher);
    });
  }

  micStatusChanged() {
    if (this.state.publisher.properties.videoSource) {
      this.applyDeepAR();
    }
    this.state.publisher.stream.audioActive =
      !this.state.publisher.stream.audioActive;

    this.state.session.unpublish(this.state.publisher).then(() => {
      this.state.session.publish(this.state.publisher);
    });
    // if (this.state.publisher.properties.videoSourc == undefined) {
    //   this.applyDeepAR();
    // }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);

    // 컴포넌트가 마운트 되면 자동 세션 접속
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    // this.startDeepAR(this.canvasRef);

    this.setState(
      {
        session: this.OV.initSession(),
        // session: "http://3.35.166.44:4443/",
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---
              console.log("connect Session");

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                // videoSource: videoTracks[0], // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "555x307", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                publisher: publisher,
              });
              // }
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    // this.state.deepAR.startVideo(false);
    // console.log("this.stae.deepAR", this.state.deepAR.startVideo());
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      publisher: undefined,
      subscribers: [],
      mediaStream: undefined,
      arEnable: false,
      deepAR: undefined,
    };
    // this.setState({
    //   session: undefined,
    //   subscribers: [],
    //   mySessionId: "SessionA",
    //   myUserName: "Participant" + Math.floor(Math.random() * 100),
    //   mainStreamManager: undefined,
    //   publisher: undefined,
    //   mediaStream: undefined,
    // });
  }

  render() {
    // const mySessionId = this.state.mySessionId;
    // const myUserName = this.state.myUserName;

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
            <WebCamBoard>
              {this.state.publisher !== undefined ? (
                <div className="mt-3 mb-3 mr-3 rounded-[30px] w-[570px] h-[307px] flex items-center justify-center">
                  <div className="relative">
                    <UserVideoComponent streamManager={this.state.publisher} />
                    <div
                      className="absolute bottom-0 right-0"
                      onClick={this.micStatusChanged}
                      id="mic"
                    >
                      <MicBtn />
                    </div>
                    <div
                      className="absolute bottom-0 left-0"
                      onClick={this.camStatusChanged}
                      id="cam"
                    >
                      <VideoBtn />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.subscribers.map((sub, i) =>
                i < 3 ? (
                  <UserVideoComponent streamManager={sub} key={i} />
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
                        onClick={() => this.changeEffectOne(item.path)}
                      >
                        {item.img}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="ml-[1em] absolute bottom-0">
                <Link to="/">
                  <CommonBtn
                    text="나가기"
                    color={"bg-pink-300"}
                    onClick={this.leaveSession}
                  />
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

    console.info("세션 연결");
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

export default Video;
