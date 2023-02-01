import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
// import './UserVideo.css';
import FriendIsComing from "./../components/atoms/FriendIsComing/index";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <OpenViduVideoComponent streamManager={this.props.streamManager} />
        ) : (
          <FriendIsComing />
        )}
      </div>
    );
  }
}

{
  /* <div><p>{this.getNicknameTag()}</p></div> */
}
