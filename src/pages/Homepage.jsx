import { useEffect, useState } from "react";
import { VideoCard } from "../components";
import { getAllVideos } from "../services/api-service/video/video";
import Endpoint from "../services/api-service/endpoints";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const fetchedVideos = await getAllVideos(Endpoint.ALLVIDEOS);
      setVideos(fetchedVideos);
      setLoading(false);
    }
    fetchVideos();
  }, []);
  return (
    <div className="min-h-screen text-white px-6 py-4">
      <div className="w-full mt-3 max-w-screen-xl mx-auto px-4">
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
