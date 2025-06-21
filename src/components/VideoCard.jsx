import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  function handlePlay() {
    navigate(`/watch/${video.id}`);
  }

  return (
    <div className="w-full max-w-[360px] cursor-pointer">
      {/* Thumbnail */}
      <div
        onClick={handlePlay}
        className="relative w-full aspect-video rounded-lg overflow-hidden"
      >
        <img
          src={video.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex pt-3 gap-3">
        {/* Channel Avatar */}
        <img
          src={video.owner[0].avatar}
          alt="Channel Avatar"
          className="w-9 h-9 rounded-full object-cover"
        />

        {/* Text Info */}
        <div className="flex flex-col text-sm">
          <h3 className="font-medium text-black leading-snug line-clamp-2">
            {video.title}
          </h3>
          <p
            onClick={() => navigate("/channel")}
            className="text-gray-600 mt-0.5"
          >
            {video.owner[0].username}
          </p>
          <p className="text-gray-600">
            {video.views} Views • {video.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

const VideoCardCompact = ({ video }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 w-full cursor-pointer">
      {/* Thumbnail */}
      <div
        onClick={() => navigate("/watch/4")}
        className="relative min-w-[168px] aspect-video rounded overflow-hidden"
      >
        <img
          src={video.thumbnail}
          alt="Thumbnail"
          className="object-cover rounded-lg w-[200px]"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h3
          onClick={() => navigate("/watch/4")}
          className="text-sm font-medium text-wrap leading-tight text-black line-clamp-2"
        >
          {video.title}
        </h3>
        <p
          onClick={() => navigate("/channel")}
          className="text-xs text-[#606060] mt-1"
        >
          {video.channelName}
        </p>
        <p className="text-xs text-[#606060]">
          {video.views} Views • {video.createdAt}
        </p>
      </div>
    </div>
  );
};

export { VideoCard, VideoCardCompact };
