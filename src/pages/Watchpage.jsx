import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";
import { Comment, VideoCardCompact } from "../components/";
import { useLocation, useNavigate } from "react-router-dom";

const Watchpage = ({ vid: video, suggestedVideos }) => {
  const playerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const path = useLocation();
  const [vidLink, setVidLink] = useState("");

  const arr = path.pathname.split("/");

  async function fetchVideo() {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/videos/${arr[2]}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ0NzExYWM5NTY0MmFmOGMwY2RjODEiLCJlbWFpbCI6Im5pc2FyZzRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJuaXNhcmc0IiwiZnVsbE5hbWUiOiJOaXNhcmcgQmhhbWF0IiwiaWF0IjoxNzQ5NDk2MzI5LCJleHAiOjE3NDk1ODI3Mjl9.UCA2YmXzTcnM8iuO0xPe_JWT0df5UnzAxlyupG7EEC0",
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      // update state with actual videos
      setVidLink(data.data.videoFile);
    } catch (error) {
      console.error("Failed to fetch videos:", error.message);
    }
  }

  useEffect(() => {
    fetchVideo();
  }, []);

  console.log("Video Source URL:", vidLink);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    autoplay: false,
    sources: [
      {
        src: vidLink,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => videojs.log("player is waiting"));
    player.on("dispose", () => videojs.log("player will dispose"));
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1350px] gap-6">
      {/* LEFT SECTION */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            {vidLink ? (
              <VideoPlayer
                options={{
                  controls: true,
                  fluid: true,
                  autoplay: false,
                  sources: [{ src: vidLink, type: "video/mp4" }],
                }}
                onReady={handlePlayerReady}
              />
            ) : (
              <div className="text-white text-center p-4">Loading video...</div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-black mt-4">{video.title}</h1>

        {/* Channel + Subscribe */}
        <div className="flex items-center mt-4">
          {/* Channel Info */}
          <div
            onClick={() => navigate("/channel")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={video.channelAvatar}
              alt="Channel Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-sm">{video.channelName}</p>
              <p className="text-sm text-gray-500">
                {video.subscribers} subscribers
              </p>
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
          {video.views} • {video.uploaded}
        </p>
        <div className="bg-gray-100 text-sm text-black mt-2 p-4 rounded-lg whitespace-pre-wrap">
          {showMore
            ? video.description
            : video.description.slice(0, 150) + "..."}
          <button
            className="text-blue-600 font-medium ml-2"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
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
