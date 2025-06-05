import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "../components";

// Dummy data
const channels = [...Array(12)].map((_, i) => ({
  id: i,
  name: `Channel ${i + 1}`,
  handle: `@channel${i + 1}`,
  subscribers: `${Math.floor(Math.random() * 1000)}K subscribers`,
  avatar:
    "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  description: "This is a sample description for the channel.",
}));

const exampleVideo = {
  thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
  title: "React Crash Course",
  channelName: "CodeWithAI",
  channelAvatar:
    "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  views: "1.2M views",
  uploaded: "2 weeks ago",
  duration: "12:34", // 🕒 Add this
};

const Subscriptionpage = () => {
  const [showAllChannels, setShowAllChannels] = useState(false);
  const visibleChannels = showAllChannels ? channels : channels.slice(0, 5);

  const navigate = useNavigate();
  const videos = Array.from({ length: 21 }, (_, i) => ({
    ...exampleVideo,
    title: `${exampleVideo.title} #${i + 1}`,
  }));

  return (
    <div className="w-full max-w-[1440px] px-4 py-6 mx-auto">
      {/* Top: Subscribed Channels */}
      <h1 className="text-2xl font-bold mb-4">All Subscriptions</h1>
      <div className="flex flex-wrap gap-6">
        {visibleChannels.map((ch) => (
          <div
            key={ch.id}
            className="flex items-center w-full sm:w-[48%] lg:w-[32%] gap-4 p-4 bg-white rounded-lg shadow-sm border"
          >
            <img
              src={ch.avatar}
              alt={ch.name}
              className="w-14 h-14 rounded-full cursor-pointer"
              onClick={() => navigate("/channel")}
            />
            <div className="flex-1">
              <p
                onClick={() => navigate("/channel")}
                className="cursor-pointer font-semibold"
              >
                {ch.name}
              </p>
              <p
                onClick={() => navigate("/channel")}
                className="text-sm text-gray-500 cursor-pointer"
              >
                {ch.handle} • {ch.subscribers}
              </p>
              <p className="text-sm mt-1 line-clamp-2">{ch.description}</p>
            </div>
            <button className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              🔔 Subscribed
            </button>
          </div>
        ))}
      </div>

      {!showAllChannels && channels.length > 6 && (
        <div className="mt-4">
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => setShowAllChannels(true)}
          >
            Show more
          </button>
        </div>
      )}

      {/* Bottom: Subscribed Videos */}
      <h2 className="text-xl font-semibold mt-10 mb-4">
        Latest from your subscriptions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptionpage;
