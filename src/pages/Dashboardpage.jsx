import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboardpage() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const navigate = useNavigate();

  const paginatedVideos = videos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  const video = {
    thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    title: "React Crash Course React Crash course",
    channelName: "CodeWithAI",
    channelAvatar:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    views: "1.2M views",
    uploaded: "2 weeks ago",
    duration: "12:34", // 🕒 Add this
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">All Videos Dashboard</h1>

        <div className="space-y-6">
          {paginatedVideos.map((video) => (
            <div
              key={video._id}
              className="flex justify-between items-center border p-4 rounded-xl"
            >
              <VideoCardCompact video={video} />

              <div className="flex flex-col items-end space-y-2 min-w-[120px] pl-4">
                <button
                  onClick={() => navigate(`/edit-video/${video._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 w-full"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
