import React, { useEffect } from "react";

function BgVideo() {
  useEffect(() => {
    const video = document.getElementById("bg-video") as HTMLVideoElement;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.play();
  }, []);

  return (
    <>
      <video id="bg-video" playsInline autoPlay muted loop>
        <source src="/bg.mp4" type="video/mp4" />
      </video>
    </>
  );
}

export default BgVideo;
