import YouTube from "react-youtube";
import React from "react";
import { Link } from "react-router-dom";
import CommonBtn from "../components/atoms/CommonBtn";
import DanceVideoRoomComponent from "./danceRTC/VideoRoomComponent";
import { useSelector } from "react-redux";

function YouTubeVideo() {
  const user = useSelector((state) => state.user);
  const videoOptions = {
    width: window.innerWidth - 400,
    height: window.innerHeight,
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 1,
    },
  };

  return (
    <>
      <div className="flex">
        <DanceVideoRoomComponent
          user={user["userChName"]}
          email={user["userEmail"]}
          userType={user["userType"]}
        />
        <div className="flex items-center justify-center w-full">
          <YouTube videoId="S1p_XUY2Jx8" opts={videoOptions} />
        </div>
      </div>
      <div className="ml-[1em] absolute bottom-0 right-20 z-10">
        <Link to="/">
          <CommonBtn text="나가기" color={"bg-pink-300"} />
        </Link>
      </div>
    </>
  );
}

export default YouTubeVideo;
