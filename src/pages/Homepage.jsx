import React from "react";
import { VideoCard } from "../components";

const exampleVideo = {
  thumbnail: "https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg",
  title: "Example YouTube Video Title That Might Be Long",
  channelName: "CodeWithAI",
  channelAvatar:
    "https://yt3.ggpht.com/ytc/AMLnZu9d-avatar=s68-c-k-c0x00ffffff-no-rj",
  views: "1.2M views",
  uploaded: "2 weeks ago",
};

const HomePage = () => {
  // Create an array of 21 videos
  const videos = Array.from({ length: 21 }, (_, i) => ({
    ...exampleVideo,
    title: `${exampleVideo.title} #${i + 1}`,
  }));

  return (
    <div className="bg-black min-h-screen text-white px-6 py-4">
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
