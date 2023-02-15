import React, { Component } from "react";
import OvVideoComponent from "./OvVideo";
import "./StreamComponent.css";

import MicOff from "@material-ui/icons/MicOff";
import VideocamOff from "@material-ui/icons/VideocamOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeOff from "@material-ui/icons/VolumeOff";
import IconButton from "@material-ui/core/IconButton";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      mutedSound: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

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
        {/* <div className="pointer nickname">
          <span id="nickname">{this.props.user.getNickname()}</span>
          {this.props.user.isLocal() && <span id=""> (edit)</span>}
        </div> */}

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            <div id="statusIcons">
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
            </div>
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
          </div>
        ) : null}
      </div>
    );
  }
}
