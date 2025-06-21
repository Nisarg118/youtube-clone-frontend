import { useEffect, useState } from "react";
import { VideoCardCompact } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideosOfChannel } from "../store/slices/videoSlice";

export default function Dashboardpage() {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnId, setBtnId] = useState(null);
  const savedUser = JSON.parse(localStorage.getItem("userData"));
  const id = savedUser.user._id;
  const user = useSelector((state) => state.user.data);
  const token = user?.accessToken;

  async function fetchVideos() {
    const resultAction = await dispatch(getAllVideosOfChannel(id));
    try {
      if (getAllVideosOfChannel.fulfilled.match(resultAction)) {
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
      const res = await fetch(`http://localhost:8000/api/v1/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Filter out deleted video and update state
        const updatedVideos = videos.filter((vid) => vid.id !== id);
        setVideos(updatedVideos);
        setLoading(false);
      } else {
        setLoading(false);
        const err = await res.json();
        console.error("Delete failed:", err.message || res.statusText);
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
                <VideoCardCompact video={video} />
                <div className="flex justify-center gap-2 mr-4">
                  <button
                    onClick={() => handleUpdate(video.id)}
                    className="bg-yellow-300 text-black hover:bg-yellow-400 px-7 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="bg-red-500 text-white hover:bg-red-600 px-7 py-2 rounded"
                  >
                    {video.id === btnId && loading ? "Loading..." : "Delete"}
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
