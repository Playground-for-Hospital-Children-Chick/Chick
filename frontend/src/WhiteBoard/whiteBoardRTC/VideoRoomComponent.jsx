import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import StreamComponent from "./StreamComponent";
import ToolbarComponent from "./ToolbarComponent";
import UserModel from "./models/user-model";

import SmallFriendIsComing from "../../components/atoms/SmallFriendIsComing";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";

import IconButton from "@material-ui/core/IconButton";
import SmallWebCamBoard from "../../components/atoms/SmallWebCamBoard";

var localUser = new UserModel();
const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";

class BoardVideoRoomComponent extends Component {
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

    this.switchCamera = this.switchCamera.bind(this);
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
      resolution: "300x150",
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

  async leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    const response = await axios.post(
      APPLICATION_SERVER_URL +
        "api/sessions/" +
        this.state.mySessionId +
        "/disconnect",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status == 200) {
      console.log("leaveSession");
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
      <>
        {this.state.session === undefined ? (
          <div className="p-2 m-2">
            <Box sx={{ width: "50%" }}>
              <CircularProgress />
            </Box>
          </div>
        ) : null}
        {this.state.session !== undefined ? (
          // <div className="flex flex-row w-[90em]">
          <SmallWebCamBoard>
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  id="localUser"
                  className="relative m-3 rounded-[30px] w-[300px] h-[150px] flex items-center justify-center "
                >
                  <StreamComponent
                    user={localUser}
                    handleNickname={this.nicknameChanged}
                  />

                  <div className="rounded-[30px] absolute right-0 bottom-0 flex flex-row bg-emerald-500">
                    <IconButton
                      color="inherit"
                      className="navButton"
                      id="navCamButton"
                      onClick={this.camStatusChanged}
                    >
                      {localUser !== undefined && localUser.isVideoActive() ? (
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
                      {localUser !== undefined && localUser.isAudioActive() ? (
                        <Mic />
                      ) : (
                        <MicOff color="secondary" />
                      )}
                    </IconButton>
                  </div>
                </div>
              )}

            {this.state.subscribers.map((sub, i) =>
              i < 3 ? (
                <div
                  key={i}
                  className=" m-3 rounded-[30px] w-[300px] h-[150px] flex items-center justify-center"
                  id="remoteUsers"
                >
                  <StreamComponent
                    user={sub}
                    streamId={sub.streamManager.stream.streamId}
                  />
                </div>
              ) : null
            )}

            {this.state.subscribers.length === 0 ? (
              <SmallFriendIsComing />
            ) : null}
            {this.state.subscribers.length === 0 ? (
              <SmallFriendIsComing />
            ) : null}
            {this.state.subscribers.length === 0 ? (
              <SmallFriendIsComing />
            ) : null}

            {this.state.subscribers.length === 1 ? (
              <SmallFriendIsComing />
            ) : null}
            {this.state.subscribers.length === 1 ? (
              <SmallFriendIsComing />
            ) : null}

            {this.state.subscribers.length === 2 ? (
              <SmallFriendIsComing />
            ) : null}
          </SmallWebCamBoard>
        ) : null}
      </>
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
        gameType: "draw",
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
export default BoardVideoRoomComponent;
