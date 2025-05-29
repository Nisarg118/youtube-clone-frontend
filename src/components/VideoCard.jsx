import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="w-full max-w-[360px] cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
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
          src={video.channelAvatar}
          alt="Channel Avatar"
          className="w-9 h-9 rounded-full object-cover"
        />

        {/* Text Info */}
        <div className="flex flex-col text-sm">
          <h3 className="font-medium text-black leading-snug line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 mt-0.5">{video.channelName}</p>
          <p className="text-gray-600">
            {video.views} • {video.uploaded}
          </p>
        </div>
      </div>
    </div>
  );
};

const VideoCardCompact = ({ video }) => {
  return (
    <div className="flex gap-3 w-full cursor-pointer">
      {/* Thumbnail */}
      <div className="relative min-w-[168px] aspect-video rounded overflow-hidden">
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
        <h3 className="text-sm font-medium text-wrap leading-tight text-black line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-[#606060] mt-1">{video.channelName}</p>
        <p className="text-xs text-[#606060]">
          {video.views} • {video.uploaded}
        </p>
      </div>
    </div>
  );
};

export { VideoCard, VideoCardCompact };
