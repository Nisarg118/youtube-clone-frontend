import React from "react";
import { useNavigate } from "react-router-dom";

const ChannelInfo = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-7xl space-y-10 rounded-lg p-2 bg-gray-400">
        <div
          onClick={() => navigate("/channel")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.channelName}</h2>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <p className="text-sm text-gray-500">
              {user.subscribers} subscribers
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="text-sm text-gray-700">
          <p>{user.totalVideos} videos</p>
          <p>Joined on {new Date(user.joinedAt).toLocaleDateString()}</p>
        </div>

        {/* Description / Bio */}
        <div className="bg-gray-100 p-4 rounded-lg text-sm">
          <p className="whitespace-pre-wrap">
            {user.description || "No description yet."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
