import { useRef } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";

function Watchpage() {
  const playerRef = useRef(null);
  const videoLink = "https://www.w3schools.com/html/mov_bbb.mp4";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div className="max-w-[800px] bg-black rounded-lg">
      <VideoPlayer
        className="rounded-lg"
        options={videoPlayerOptions}
        onReady={handlePlayerReady}
      />
    </div>
  );
}

export default Watchpage;
