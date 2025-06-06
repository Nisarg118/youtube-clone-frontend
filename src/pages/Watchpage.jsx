import { useRef, useState } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";
import { Comment, VideoCardCompact } from "../components/";
import { useNavigate } from "react-router-dom";

const Watchpage = ({ vid: video, suggestedVideos }) => {
  const playerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

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
    player.on("waiting", () => videojs.log("player is waiting"));
    player.on("dispose", () => videojs.log("player will dispose"));
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1350px] gap-6">
      {/* LEFT SECTION */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <VideoPlayer
            className="w-full h-full"
            options={videoPlayerOptions}
            onReady={handlePlayerReady}
          />
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
