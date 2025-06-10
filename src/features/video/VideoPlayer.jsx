import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let rafId;

    // Delay initialization until the next animation frame
    rafId = requestAnimationFrame(() => {
      if (!playerRef.current && videoRef.current) {
        const player = videojs(videoRef.current, options, () => {
          player.aspectRatio("16:9");
          if (onReady) onReady(player);
        });
        playerRef.current = player;
      } else if (playerRef.current && options.sources?.[0]?.src) {
        playerRef.current.src(options.sources);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (playerRef.current) {
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
