import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";

// const APPLICATION_SERVER_URL = "http://localhost:5000/";
// "http://localhost:5000/";
const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io:9000/";

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
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.canvasRef = document.createElement("canvas");
  }

  startDeepAR(canvas) {
    var { DeepAR } = window;

    var deepAR = DeepAR({
      canvasWidth: 500,
      canvasHeight: 500,
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
  }

  micStatusChanged() {
    this.state.publisher.stream.audioActive =
      !this.state.publisher.stream.audioActive;
    this.state.session.publish(this.state.publisher);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    console.log("canvasRef", this.canvasRef);
    // console.log("canvasRef.current", this.canvasRef.current);
    var canvasContext = this.canvasRef.getContext("webgl");
    console.log("canvasContext", canvasContext);

    this.startDeepAR(this.canvasRef);
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

              // if (canvasRef) {
              this.setState({
                mediaStream: this.canvasRef.captureStream(),
              });
              console.log("mediaStream", this.state.mediaStream);
              var videoTracks = this.state.mediaStream.getVideoTracks();
              console.log("videoTracks[0]", videoTracks[0]);

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoTracks[0], // The source of video. If undefined default webcam
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
    const mySessionId = "SessionID";

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="resources/images/openvidu_grey_bg_transp_cropped.png"
                alt="OpenVidu logo"
              />
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
            </div>

            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6">
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div key={i} className="stream-container col-md-6 col-xs-6">
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
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

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      {
        customSessionId: sessionId,
        // email: "ssafy@ssafy.com",
        // gameType: "face",
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {
        // customIceServers: [
        //   {
        //     url: "https://3.35.166.44:4443/",
        //     username: "OPENVIDUAPP",
        //     credential: "MY_SECRET",
        //   },
        // ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default Video;
