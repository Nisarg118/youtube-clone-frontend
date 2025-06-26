import { useEffect, useMemo, useRef, useState } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";
import { Comment, VideoCardCompact } from "../components/";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialSubscription,
  toggleSubscription,
} from "../store/slices/subscriptionSlice";
import { fetchVideoById } from "../services/api-service/video/video";
import { fetchSubscribersNo } from "../services/api-service/subscription/subscription";
import { getToken } from "../utils/token";
import Endpoint from "../services/api-service/endpoints";

const Watchpage = ({ suggestedVideos }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [vid, setVid] = useState({});
  const [subscriberCount, setSubscriberCount] = useState(0);

  const token = getToken();
  const subscribed = useSelector((state) => state.subscription.isSubscribed);

  async function handleSubscription() {
    const ownerId = vid?.owner?.[0]?._id;
    if (ownerId) dispatch(toggleSubscription(ownerId));
  }

  useEffect(() => {
    async function fetchVideo() {
      const data = await fetchVideoById(Endpoint.VIDEO_BY_ID(id));
      setVid(data.video);
      dispatch(setInitialSubscription(data.isSubscribed));
    }
    fetchVideo();
  }, []);

  useEffect(() => {
    async function fetchCount() {
      const ownerId = vid?.owner?.[0]?._id;
      if (!ownerId) return;
      const count = await fetchSubscribersNo({
        url: `http://localhost:8000/api/v1/subscriptions/c/${ownerId}`,
        token,
      });
      setSubscriberCount(count);
    }
    fetchCount();
  }, [vid, subscribed]);

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

  console.log();
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1350px] gap-6">
      {/* LEFT SECTION */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <VideoPlayer options={videoOptions} onReady={handlePlayerReady} />
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
              <p className="text-sm text-gray-500">
                {subscriberCount} subscribers
              </p>
            </div>
          </div>

          {/* Subscribe */}
          <button
            onClick={() => handleSubscription()}
            className={`${
              subscribed ? "bg-gray-300 text-black" : "bg-black text-white"
            } ml-20  text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90`}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
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
