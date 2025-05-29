import { VideoCard } from "../components";

const Aboutpage = () => {
  const user = {
    avatar: "https://i.pravatar.cc/150?img=12",
    channelName: "Code with Dev",
    username: "devcode123",
    subscribers: "12.3K",
    totalVideos: 42,
    joinedAt: "2023-08-01T00:00:00Z",
    description: `Welcome to Code with Dev! 🚀\n\nWe cover fullstack tutorials, JavaScript, React, and more.`,
  };

  const mockVideos = Array.from({ length: 4 }, (_, i) => ({
    id: `video-${i + 1}`,
    thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    title: `Sample Video #${i + 1}`,
    channelName: user.channelName,
    views: "1.5M views",
    uploaded: "1 week ago",
    duration: "12:34",
  }));

  return (
    <div className=" p-6 space-y-10">
      {/* Channel Info */}
      <div className="max-w-4xl shadow-lg rounded-lg p-2 space-y-5">
        <div className="flex items-center gap-4">
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

      {/* Watch History */}
      <section className="space-y-2">
        {/* Top Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Watch History</h3>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </button>
            <button
              onClick={() => {
                document.getElementById("history-scroll").scrollLeft -= 300;
              }}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={() => {
                document.getElementById("history-scroll").scrollLeft += 300;
              }}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Row */}
        <div
          id="history-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
        >
          {mockVideos.map((vid) => (
            <div key={vid.id} className="flex-shrink-0 w-64">
              <VideoCard video={vid} />
            </div>
          ))}
        </div>
      </section>

      {/* Playlists */}
      <section className="space-y-2">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Playlists</h3>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </button>
            <button
              onClick={() =>
                document.getElementById("playlists-scroll")?.scrollBy({
                  left: -300,
                  behavior: "smooth",
                })
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={() =>
                document.getElementById("playlists-scroll")?.scrollBy({
                  left: 300,
                  behavior: "smooth",
                })
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          id="playlists-scroll"
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 py-2 px-1"
        >
          {mockVideos.map((vid) => (
            <div key={vid.id} className="flex-shrink-0 w-64">
              <VideoCard video={vid} />
            </div>
          ))}
        </div>
      </section>

      {/* Liked Videos */}
      <section className="space-y-2">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Liked Videos</h3>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </button>
            <button
              onClick={() =>
                document.getElementById("playlists-scroll")?.scrollBy({
                  left: -300,
                  behavior: "smooth",
                })
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={() =>
                document.getElementById("playlists-scroll")?.scrollBy({
                  left: 300,
                  behavior: "smooth",
                })
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          id="playlists-scroll"
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 py-2 px-1"
        >
          {mockVideos.map((vid) => (
            <div key={vid.id} className="flex-shrink-0 w-64">
              <VideoCard video={vid} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Aboutpage;
