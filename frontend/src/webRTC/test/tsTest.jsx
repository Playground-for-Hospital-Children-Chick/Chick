const streamRef = useRef < HTMLVideoElement > null;
  const joinRoom = async function (event) {
    event.preventDefault();
    getToken()
      .then((token) => {
        session.connect(token, { clientData: myUserName }).then(async () => {
          const newPublisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          // 세션에 스트리밍 등록
          session.publish(newPublisher);

          // 현재 사용 가능한 비디오 가져오기
          // const devices = await OV.getDevices();
          // const videoDevices = devices.filter(
          //   (device) => device.kind === "videoinput"
          // );
          // const currentVideoDeviceId = newPublisher.stream
          //   .getMediaStream()
          //   .getVideoTracks()[0]
          //   .getSettings().deviceId;
          // const newCurrentVideoDevice = videoDevices.find(
          //   (device) => device.deviceId === currentVideoDeviceId
          // );

          // 사업자 스트리밍 출력
          newPublisher.addVideoElement(streamRef.current);
          setPublisher(newPublisher);

          // setCurrentVideoDevice(newCurrentVideoDevice);
          // setMainStreamManager(newPublisher);
        });
      })
      .catch((err) => console.log(err));
  };

  //세션 나가기
  const leaveSession = function () {
    session?.disconnect();
  };

  return (
    <div>
      <form onSubmit={joinRoom}>
        <button>입장</button>
      </form>
      <button onClick={leaveSession}>퇴장</button>

      <video autoPlay={true} ref={streamRef} />
    </div>
  );
};

export default Owner;