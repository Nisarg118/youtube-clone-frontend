import { useEffect, useState } from "react";
import { VideoCard } from "../components";
import { useNavigate } from "react-router-dom";
import { getLikedVideos } from "../services/api-service/like/like";
import Endpoint from "../services/api-service/endpoints";

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchLikedVideos() {
      const res = await getLikedVideos(Endpoint.GET_LIKED_VIDEOS);
      setVideos(res);
    }
    fetchLikedVideos();
  }, []);

  const displayedVideos = showAll ? videos : videos.slice(0, 5);

  return (
    <div className="space-y-2">
      {/* Header with Toggle */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Liked Videos</h3>
        {videos.length > 4 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        )}
      </div>

      {/* Grid of Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {displayedVideos.map((vid) => (
          <VideoCard key={vid._id} video={vid} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
