import { useState } from "react";
import { VideoCardCompact } from "../components";

export default function Dashboardpage() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Learn React in 10 Minutes",
      thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
      channelName: "CodeWithAI",
      views: "1.2M views",
      uploaded: "2 weeks ago",
      duration: "12:34",
    },
    {
      id: 2,
      title: "JavaScript Async/Await Explained",
      thumbnail: "https://i.ytimg.com/vi/PoRJizFvM7s/maxresdefault.jpg",
      channelName: "DevSimplified",
      views: "834K views",
      uploaded: "1 month ago",
      duration: "8:20",
    },
  ]);
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="pt-20 max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">All Videos Dashboard</h1>
        <div className="p-4 space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="border p-2 rounded shadow space-y-2">
              <div className="flex items-center justify-between w-full gap-4">
                <VideoCardCompact video={video} />
                <div className="flex justify-center gap-2 mr-4">
                  <button className="bg-yellow-300 text-black hover:bg-yellow-400 px-7 py-2 rounded">
                    Update
                  </button>
                  <button className="bg-red-500 text-white hover:bg-red-600 px-7 py-2 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
