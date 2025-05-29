import { useRef, useState } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";
import { VideoCardCompact } from "../components/";

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

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1440px] gap-6">
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
          <div className="flex items-center gap-3">
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

        {/* Comments */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <img
                  src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                  className="w-9 h-9 rounded-full object-cover"
                  alt="User"
                />
                <div>
                  <p className="text-sm font-medium">User #{i + 1}</p>
                  <p className="text-sm text-gray-700">
                    This is a sample comment.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Suggested Videos */}
      <div className="w-full lg:w-[400px] bg-pink-500 flex flex-col gap-4">
        {suggestedVideos.slice(0, 15).map((vid, idx) => (
          <VideoCardCompact key={idx} video={vid} />
        ))}
      </div>
    </div>
  );
};

export default Watchpage;
