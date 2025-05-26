import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-xs md:max-w-sm hover:scale-[1.02] transition-transform cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-video rounded-xl overflow-hidden">
        <img
          src={video.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video info */}
      <div className="flex mt-3 gap-3">
        {/* Channel avatar */}
        <img
          src={video.channelAvatar}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Video details */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold line-clamp-2 text-white">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400">{video.channelName}</p>
          <p className="text-sm text-gray-400">
            {video.views} • {video.uploaded}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
