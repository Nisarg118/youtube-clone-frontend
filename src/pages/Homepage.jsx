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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
