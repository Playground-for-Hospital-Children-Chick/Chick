import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import FriendIsComing from "../components/atoms/FriendIsComing";

export default class UserVideoComponent extends Component {
  // getNicknameTag() {
  //     // Gets the nickName of the user
  //     return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  // }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            {/* <div><p>{this.getNicknameTag()}</p></div> */}
          </div>
        ) : (
          <FriendIsComing />
        )}
      </div>
    );
  }
}
