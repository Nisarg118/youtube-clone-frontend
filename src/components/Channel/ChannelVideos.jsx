import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { getAllVideosOfChannelThunk } from "../../store/slices/videoSlice";
import { useEffect, useState } from "react";
import { VideoCard } from "../VideoCard";

const ChannelVideos = () => {
  const { userId } = useOutletContext();
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchChannelVideos() {
    try {
      const data = await dispatch(getAllVideosOfChannelThunk(userId));
      setVideos(data.payload);
      console.log("Videos of channel ", data.payload);
    } catch (error) {
      console.error("Error fetching channel videos:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchChannelVideos();
    }
  }, [userId]);
  return (
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
  );
};

export default ChannelVideos;
