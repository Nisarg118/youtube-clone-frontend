import React, { useRef, useEffect, useReducer } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const useRef = useReducer();
  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const player = videojs(videoRef.current, options, () => {
        player.aspectRatio("16:9");
        if (onReady) onReady(player);
      });
      playerRef.current = player;
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  return (
    <div data-vjs-player className="w-full h-full">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full h-full"
        controls
        preload="auto"
      />
    </div>
  );
};

export default VideoPlayer;
