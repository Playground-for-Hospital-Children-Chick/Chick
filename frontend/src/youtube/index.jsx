import YouTube from "react-youtube";
import React from "react";
import SmallVideoRoomComponent from "../boardRTC/VideoRoomComponent";
import { Link } from "react-router-dom";
import CommonBtn from "../components/atoms/CommonBtn";

function YouTubeVideo() {
  const videoOptions = {
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
        <SmallVideoRoomComponent />
        <div className="flex items-center justify-center w-full">
          {/* <YouTube videoId="pU4i0_O6cUo" opts={videoOptions} /> */}
          <YouTube videoId="KvmnmnqF6dc" opts={videoOptions} />
          <YouTube videoId="j5-mTBP9O7E" opts={videoOptions} />
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
