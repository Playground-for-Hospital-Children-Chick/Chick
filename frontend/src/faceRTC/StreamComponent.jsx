import React, { Component } from "react";
import OvVideoComponent from "./OvVideo";
import "./StreamComponent.css";

import MicOff from "@material-ui/icons/MicOff";
import VideocamOff from "@material-ui/icons/VideocamOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeOff from "@material-ui/icons/VolumeOff";
import IconButton from "@material-ui/core/IconButton";
import DanceVideoRoomComponent from "./../youtube/danceRTC/VideoRoomComponent";
import ReportBtn from "./../components/atoms/ReportBtn/index";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      mutedSound: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    // this.block = this.block.bind(this);
  }

  // block() {
  //   console.log("차단 가즈아앙아아아ㅏㅇ아아아아ㅏ아아아아아아아");
  //   console.log(this.props.user);
  //   console.log(this.user);
  // }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  render() {
    return (
      <div className="OT_widget-container">
        {/* <div className="pointer nickname text-yellow-300 font-chick">
          <span id="nickname">{this.props.user.getNickname()}</span>
          {this.props.user.isLocal() && <span id=""> (나)</span>}
        </div> */}

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent relative">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            {/* <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div> */}
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>

            {/* <div className="absolute top-0">
              {!this.props.user.isLocal() && (
                // <span>여기에 신고버튼 넣을건데 되는거냐이거</span>
                <button onClick={this.block}>
                  <ReportBtn />
                </button>
              )}
            </div> */}
          </div>
        ) : null}
      </div>
    );
  }
}
