import { useEffect, useMemo, useRef, useState } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";
import { Comment, VideoCardCompact } from "../components/";
import { useLocation, useNavigate } from "react-router-dom";

const Watchpage = ({ suggestedVideos }) => {
  const playerRef = useRef(null);
  const path = useLocation();
  const [vid, setVid] = useState({});
  const arr = path.pathname.split("/");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchVideo() {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/videos/${arr[2]}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ0NzExYWM5NTY0MmFmOGMwY2RjODEiLCJlbWFpbCI6Im5pc2FyZzRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJuaXNhcmc0IiwiZnVsbE5hbWUiOiJOaXNhcmcgQmhhbWF0IiwiaWF0IjoxNzQ5NzQxOTgwLCJleHAiOjE3NDk4MjgzODB9.mD7QWjNGcNHJmChMSSbOv5AaOlUBAA2xSMda1QgVI0g",
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setVid(data.data);
      // update state with actual videos
    } catch (error) {
      console.error("Failed to fetch videos:", error.message);
    }
  }

  useEffect(() => {
    fetchVideo();
  }, []);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => videojs.log("player is waiting"));
    player.on("dispose", () => videojs.log("player will dispose"));
  };

  const navigate = useNavigate();
  const videoOptions = useMemo(
    () => ({
      controls: true,
      fluid: true,
      autoplay: false,
      sources: [{ src: vid.videoFile, type: "video/mp4" }],
    }),
    [vid.videoFile]
  );

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1350px] gap-6">
      {/* LEFT SECTION */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            {isMounted && vid.videoFile && vid.videoFile.endsWith(".mp4") ? (
              <VideoPlayer options={videoOptions} onReady={handlePlayerReady} />
            ) : (
              <div className="text-white text-center p-4">Loading video...</div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-black mt-4">{vid.title}</h1>

        {/* Channel + Subscribe */}
        <div className="flex items-center mt-4">
          {/* Channel Info */}
          <div
            onClick={() => navigate("/channel")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={vid.owner?.[0]?.avatar}
              alt="Channel Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-sm">{vid.owner?.[0]?.username}</p>
              <p className="text-sm text-gray-500">100k subscribers</p>
            </div>
          </div>

          {/* Subscribe */}
          <button className="bg-black text-white ml-20  text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90">
            Subscribe
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-full hover:bg-gray-200">
            👍 Like
          </button>
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-full hover:bg-gray-200">
            🔁 Share
          </button>
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-full hover:bg-gray-200">
            ⬇️ Download
          </button>
        </div>

        {/* Stats + Description */}
        <p className="text-sm text-gray-600 mt-4">
          {vid.views} • {vid.createdAt}
        </p>
        <div className="bg-gray-100 text-sm text-black mt-2 p-4 rounded-lg whitespace-pre-wrap">
          {vid.description}
        </div>

        <Comment />
      </div>

      {/* RIGHT SECTION: Suggested Videos */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {suggestedVideos.slice(0, 15).map((vid, idx) => (
          <VideoCardCompact key={idx} video={vid} />
        ))}
      </div>
    </div>
  );
};

export default Watchpage;
