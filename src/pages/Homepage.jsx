import React from "react";
import { VideoCard } from "../components";

const exampleVideo = {
  thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
  title: "React Crash Course",
  channelName: "CodeWithAI",
  channelAvatar:
    "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  views: "1.2M views",
  uploaded: "2 weeks ago",
  duration: "12:34", // 🕒 Add this
};

const HomePage = () => {
  // Create an array of 21 videos
  const videos = Array.from({ length: 21 }, (_, i) => ({
    ...exampleVideo,
    title: `${exampleVideo.title} #${i + 1}`,
  }));

  return (
    <div className=" min-h-screen text-white px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Home</h1>

      {/* Grid with 3 columns on md and up */}
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
  q;
};

export default HomePage;
