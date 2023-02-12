import YouTube from "react-youtube";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommonBtn from "../components/atoms/CommonBtn";
import DanceVideoRoomComponent from "./danceRTC/VideoRoomComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";
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

function YouTubeVideo() {
  const user = useSelector((state) => state.user);
  const [youtubeKey, setYoutubeKey] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: APPLICATION_SERVER_URL + "api/s3/youtubekey",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then((response) => {
      setYoutubeKey(response.data.streamingKey[0].streamingKey);
      console.log("dhkdhkhdkhkahfkklasdjfkldjasfklj", response);
      console.log(youTubeKey);
    });
  }, []);

  return (
    <>
      <div className="flex">
        <DanceVideoRoomComponent
          user={user["userChName"]}
          email={user["userEmail"]}
          userType={user["userType"]}
        />
        <div className="flex items-center justify-center w-full">
          <YouTube videoId={youtubeKey} opts={videoOptions} />
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
