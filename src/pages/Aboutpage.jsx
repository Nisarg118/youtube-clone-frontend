import { LikedVideos, Playlists, WatchHistory } from "../components";

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
    owner: [
      {
        avatar:
          "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
        username: user.username,
      },
    ],
    views: "1.5M views",
    createdAt: "1 week ago",
    duration: "12:34",
  }));
  return (
    <div className="p-6 space-y-10">
      {/* Channel Info */}
      <WatchHistory mockVideos={mockVideos} />
      <Playlists mockVideos={mockVideos} />
      <LikedVideos mockVideos={mockVideos} />
    </div>
  );
};

export default Aboutpage;
