import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";
import ArBottomBarBase from "../components/atoms/ArBottomBarBase";
import WebCamBoard from "../components/atoms/WebCamBoard";
import FriendIsComing from "../components/atoms/FriendIsComing";
import MicBtn from "../components/atoms/MicBtn";
import VideoBtn from "../components/atoms/VideoBtn";

const APPLICATION_SERVER_URL = "http://localhost:5000/";
// "http://localhost:5000/";

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";

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
      stream: undefined,
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
  }

  async applyDeepAR() {
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
    this.state.session.publish(this.state.publisher);
  }

  startDeepAR(canvas) {
    var { DeepAR } = window;

    var deepAR = DeepAR({
      canvasWidth: 550,
      canvasHeight: 307,
      licenseKey:
        "17b3582869e511e992581d53ee247344cfe4ea5b2787852672d14e03a419c3a887dafb093b8aa3ea",

      canvas: canvas,
      numberOfFaces: 1,
      libPath: "/lib",
      segmentationInfoZip: "segmentation.zip",
      onInitialize: () => {
        console.log("deepAR Ready");

        deepAR.startVideo(true);

        deepAR.switchEffect(0, "slot", "/effects/flowers", () => {
          console.log("flower loaded");
        });
      },
    });

    deepAR.downloadFaceTrackingModel("/lib/models-68-extreme.bin");
  }

  camStatusChanged() {
    this.state.publisher.stream.videoActive =
      !this.state.publisher.stream.videoActive;
    this.state.session.publish(this.state.publisher);
    // this.state.session.publish();
    console.log(this.state);
  }

  // micStatusChanged() {
  //   this.state.publisher.stream.audioActive =
  //     !this.state.publisher.stream.audioActive;
  //   this.state.session.publish(this.state.publisher);
  // }
  async micStatusChanged() {
    console.log(this.state.session);
    this.state.session.unpublish(this.state.publisher);

    this.state.publisher.stream.audioActive =
      !this.state.publisher.stream.audioActive;
    await this.state.session.publish(this.state.publisher);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);

    // console.log("canvasRef.current", this.canvasRef.current);
    // var canvasContext = this.canvasRef.getContext("webgl");

    // this.startDeepAR(this.canvasRef);
    // this.joinSession();
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

              // ararararar
              // this.setState({
              //   mediaStream: this.canvasRef.captureStream(),
              // });
              // console.log("mediaStream", this.state.mediaStream);
              // var videoTracks = this.state.mediaStream.getVideoTracks();
              // console.log("videoTracks[0]", videoTracks[0]);

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
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="flex justify-center">
        {this.state.session === undefined ? (
          <div>
            <div>
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p className="text-center">
                  <input
                    className="bg-pink-300 text-3xl"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div>
            <WebCamBoard>
              {this.state.publisher !== undefined ? (
                <div className="m-3 rounded-[30px] w-[555px] h-[307px] flex items-center justify-center">
                  <div class="relative">
                    <UserVideoComponent streamManager={this.state.publisher} />
                    <div
                      class="absolute bottom-0 right-0"
                      onClick={this.micStatusChanged}
                    >
                      <MicBtn />
                    </div>
                    <div
                      class="absolute bottom-0 left-0"
                      onClick={this.camStatusChanged}
                    >
                      <VideoBtn />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.subscribers.map((sub, i) =>
                i < 3 ? <UserVideoComponent streamManager={sub} /> : null
              )}

              {this.state.subscribers.length === 0 ? <FriendIsComing /> : null}
              {this.state.subscribers.length === 0 ? <FriendIsComing /> : null}
              {this.state.subscribers.length === 0 ? <FriendIsComing /> : null}

              {this.state.subscribers.length === 1 ? <FriendIsComing /> : null}
              {this.state.subscribers.length === 1 ? <FriendIsComing /> : null}

              {this.state.subscribers.length === 2 ? <FriendIsComing /> : null}
            </WebCamBoard>

            <div className="flex justify-center">
              <ArBottomBarBase>
                <div className="flex">
                  <input
                    className="bg-pink-400 text-3xl rounded-[30px]"
                    type="button"
                    onClick={this.leaveSession}
                    value="나가기"
                  />
                </div>
                <button onClick={this.applyDeepAR}>ar버튼입니다</button>
              </ArBottomBarBase>
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
