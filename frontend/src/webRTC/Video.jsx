import { OpenVidu, Publisher, Subscriber } from "openvidu-browser";
import axios from "axios";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";
import ArBottomBarBase from "../components/atoms/ArBottomBarBase";
import WebCamBoard from "../components/atoms/WebCamBoard";
import FriendIsComing from "../components/atoms/FriendIsComing";

import MicBtn from "../components/atoms/MicBtn";

import { prototype } from "events";
import VideoBtn from "../components/atoms/VideoBtn";

const APPLICATION_SERVER_URL = "http://localhost:5000/";
// "http://localhost:5000/";
// const APPLICATION_SERVER_URL = "http://3.35.166.44:9000/";

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
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
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

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
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

    console.log("1231312321312", this.state.subscribers);
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

                    {/* 마이크 온오프 */}
                    <div
                      class="absolute bottom-0 right-0"
                      onClick={this.micStatusChanged}
                    >
                      <MicBtn />
                    </div>

                    {/* 비디오 온오프 */}
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
              </ArBottomBarBase>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
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
