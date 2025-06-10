import React, { useEffect, useState } from "react";
import { VideoCard } from "../components";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVideos() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/videos");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      // update state with actual videos
      setVideos(data.data.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);
  console.log(videos);
  return (
    <div className="min-h-screen text-white px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Home</h1>

      <div className="w-full max-w-screen-xl mx-auto px-4">
        {loading ? (
          <p>Loading...</p>
        ) : videos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
