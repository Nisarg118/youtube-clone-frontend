import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isReady && videoRef.current && !playerRef.current) {
      const player = (playerRef.current = videojs(
        videoRef.current,
        options,
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isReady, options]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered "
        controls
        preload="auto"
      />
    </div>
  );
};

export default VideoPlayer;
