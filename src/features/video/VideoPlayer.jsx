import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        videoRef.current &&
        videoRef.current.isConnected &&
        options?.sources?.length > 0 &&
        !playerRef.current
      ) {
        const player = videojs(videoRef.current, options, () => {
          player.aspectRatio("16:9");
          if (onReady) onReady(player);
        });
        playerRef.current = player;
      } else if (
        playerRef.current &&
        options?.sources?.[0]?.src !== playerRef.current.src()
      ) {
        playerRef.current.src(options.sources);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  // ✅ YOU NEED THIS
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
