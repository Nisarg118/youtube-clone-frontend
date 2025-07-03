import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVideosOfChannelThunk } from "../store/slices/videoSlice";
import { useNavigate } from "react-router-dom";
import { deleteVideo } from "../services/api-service/video/video";
import Endpoint from "../services/api-service/endpoints";
import { currentUser } from "../services/api-service/user/user";
import { VideoCard } from "../components";

export default function Dashboardpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnId, setBtnId] = useState(null);

  async function fetchVideos() {
    const id = await currentUser();
    const resultAction = await dispatch(getAllVideosOfChannelThunk(id));
    try {
      if (getAllVideosOfChannelThunk.fulfilled.match(resultAction)) {
        setVideos(resultAction.payload);
      }
    } catch (error) {
      console.log("Error while fetching videos ", error);
    }
  }

  async function handleDelete(id) {
    try {
      setBtnId(id);
      setLoading(true);

      const flag = await deleteVideo(Endpoint.DELETE_VIDEO_BY_ID(id));
      if (flag) {
        // Filter out deleted video and update state
        const updatedVideos = videos.filter((vid) => vid.id !== id);
        setVideos(updatedVideos);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="pt-20 max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">All Videos Dashboard</h1>
        <div className="p-4 space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="border p-2 rounded shadow space-y-2">
              <div className="flex items-center justify-between w-full gap-4">
                <VideoCard video={video} />
                <div className="flex justify-center gap-2 mr-4">
                  <button
                    onClick={() => navigate(`/edit/${video.id}`)}
                    className="bg-yellow-300 text-black hover:bg-yellow-400 px-7 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="bg-red-500 text-white hover:bg-red-600 px-7 py-2 rounded"
                  >
                    {video.id === btnId && loading ? "Deleting..." : "Delete"}
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
