import { useEffect, useMemo, useRef, useState } from "react";
import videojs from "video.js";
import { VideoPlayer } from "../features";
import { Comment, VideoCard } from "../components/";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialSubscription,
  toggleSubscription,
} from "../store/slices/subscriptionSlice";
import { fetchVideoById } from "../services/api-service/video/video";
import { fetchSubscribersNo } from "../services/api-service/subscription/subscription";
import Endpoint from "../services/api-service/endpoints";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { getLikeCounts, toggleLike } from "../services/api-service/like/like";
import { addToWatchHistory } from "../services/api-service/user/user";

const Watchpage = ({ suggestedVideos }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [vid, setVid] = useState({});
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const subscribed = useSelector((state) => state.subscription.isSubscribed);
  const ownerId = useMemo(() => vid?.owner?.[0]?._id, [vid]);
  const navigate = useNavigate();

  async function handleSubscription() {
    if (!ownerId) return;
    await dispatch(toggleSubscription(ownerId));
  }

  async function handleLike() {
    try {
      const res = await toggleLike(Endpoint.TOGGLE_LIKE(id));
      setLiked(res);
      if (res === true) setLikeCount((prev) => prev + 1);
      else if (res === false) setLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    async function fetchVideo() {
      const data = await fetchVideoById(Endpoint.VIDEO_BY_ID(id));
      setVid(data.video);
      setLiked(data.isLikedByCurrentUser);
      dispatch(setInitialSubscription(data.isSubscribed));
    }
    fetchVideo();
  }, []);

  useEffect(() => {
    async function fetchCount() {
      if (!ownerId) return;
      const count = await fetchSubscribersNo(Endpoint.SUBSCRIBERSNO(ownerId));
      setSubscriberCount(count);
    }
    fetchCount();
  }, [vid, subscribed]);

  useEffect(() => {
    async function fetchLikeCounts() {
      const res = await getLikeCounts(Endpoint.GET_LIKE_COUNTS(id));
      setLikeCount(res);
    }
    fetchLikeCounts();
  }, []);

  const videoOptions = {
    controls: true,
    fluid: true,
    responsive: true,
    sources: [{ src: vid.videoFile, type: "video/mp4" }],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => videojs.log("player is waiting"));
    player.on("dispose", () => videojs.log("player will dispose"));
    player.on("play", () => {
      console.log(id);
      if (id) {
        addToWatchHistory({
          url: Endpoint.ADD_TO_WATCH_HISTORY,
          videoId: id,
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1350px] gap-6">
      {/* LEFT SECTION */}
      <div className="flex-1">
        {/* Video Player */}
        <div>
          <VideoPlayer options={videoOptions} onReady={handlePlayerReady} />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-black mt-4">{vid.title}</h1>

        {/* Channel + Subscribe */}
        <div className="flex items-center mt-4">
          {/* Channel Info */}
          <div
            onClick={() => navigate(`/channel/${vid.owner?.[0]._id}/videos`)}
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

          <button
            onClick={handleLike}
            className={`group flex items-center gap-2 ml-4 px-4 py-2 rounded-full border transition-all duration-200 ${
              liked
                ? "bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            }`}
          >
            {liked ? (
              <AiFillLike className="text-xl" />
            ) : (
              <AiOutlineLike className="text-xl group-hover:scale-105" />
            )}
            <span className="text-sm font-medium">
              {!isNaN(likeCount) ? likeCount : 0}
            </span>
          </button>
        </div>

        {/* Stats + Description */}
        <p className="text-sm text-gray-600 mt-4">
          {vid.views} views • Uploaded at:{" "}
          {new Date(vid.createdAt).toLocaleDateString()}
        </p>
        <div className="bg-gray-100 text-sm text-black mt-2 p-4 rounded-lg whitespace-pre-wrap">
          {vid.description}
        </div>

        <Comment videoId={id} />
      </div>

      {/* RIGHT SECTION: Suggested Videos */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {suggestedVideos.slice(0, 15).map((vid, idx) => (
          <VideoCard key={idx} video={vid} />
        ))}
      </div>
    </div>
  );
};

export default Watchpage;
