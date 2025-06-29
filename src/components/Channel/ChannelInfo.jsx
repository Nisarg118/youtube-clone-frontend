
const ChannelInfo = ({ user }) => {
  return (
    <div className="w-full">
      {/* Profile Section */}
      <div className="w-full pb-6">
        <div className="flex items-start gap-6 px-6 pt-6">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-36 h-36 rounded-full object-cover"
          />

          {/* Channel Meta */}
          <div>
            <h1 className="text-3xl font-semibold">{user.fullName}</h1>
            <p className="text-gray-600 text-sm">@{user.username}</p>
            <p className="text-sm text-gray-600 mt-1">
              {user.subscribersCount} subscribers • {user.videosCount} videos
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-700 max-w-2xl whitespace-pre-wrap">
              {user.description || "No description yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
