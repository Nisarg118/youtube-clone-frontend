import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../store/slices/subscriptionSlice";
import { getSubscribedChannels } from "../services/api-service/subscription/subscription";
import Endpoint from "../services/api-service/endpoints";

const exampleVideo = {
  id: 1,
  thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
  title: "React Crash Course",
  views: "1.2M",
  createdAt: "2 weeks ago",
  duration: "12:34",
  owner: [
    {
      avatar:
        "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
      username: "CodeWithAI",
    },
  ],
};

const Subscriptionpage = () => {
  const [channels, setChannels] = useState([]);
  const [showAllChannels, setShowAllChannels] = useState(false);
  const visibleChannels = showAllChannels ? channels : channels.slice(0, 5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videos = Array.from({ length: 21 }, (_, i) => ({
    id: i + 1,
    ...exampleVideo,
    title: `${exampleVideo.title} #${i + 1}`,
  }));

  async function fetchChannels() {
    try {
      const res = await getSubscribedChannels(Endpoint.SUBSCRIBECHANNELS);
      setChannels(res);
    } catch (error) {
      console.log("Error fetching subscribed channels : ", error);
    }
  }

  async function handleToggle(channelId) {
    dispatch(toggleSubscription(channelId));
  }

  useEffect(() => {
    fetchChannels();
  }, [channels]);

  return (
    <div className="w-full max-w-[1440px] px-4 py-6 mx-auto">
      {/* Top: Subscribed Channels */}
      <h1 className="text-2xl font-bold mb-4">All Subscriptions</h1>
      <div className="flex flex-wrap gap-6">
        {visibleChannels.map((ch) => (
          <div
            key={ch._id}
            className="flex items-center w-full sm:w-[48%] lg:w-[32%] gap-4 p-4 bg-white rounded-lg shadow-sm border"
          >
            <img
              src={ch.avatar}
              alt={ch.name}
              className="w-14 h-14 rounded-full cursor-pointer"
              onClick={() => navigate(`/channel/${ch._id}/videos`)}
            />
            <div className="flex-1">
              <p v className="cursor-pointer font-semibold">
                {ch.fullName}
              </p>
              <p
                onClick={() => navigate(`/channel/${ch._id}/videos`)}
                className="text-sm text-gray-500 cursor-pointer"
              >
                @{ch.username} • {ch.subscribersCount} Subscribers
              </p>
              <p className="text-sm mt-1 line-clamp-2">{ch.description}</p>
            </div>
            <button
              onClick={() => handleToggle(ch._id)}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              Subscribed
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
