import { useState } from "react";
import { useSelector } from "react-redux";
import { publishVideo } from "../services/api-service/video/video";
import { useNavigate } from "react-router-dom";
import Endpoint from "../services/api-service/endpoints";
const Uploadpage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoFile: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", video.title);
    formData.append("description", video.description);
    formData.append("thumbnail", video.thumbnail);
    formData.append("videoFile", video.videoFile);

    await publishVideo({ url: Endpoint.UPLOAD_VIDEO, formData });
    setLoading(false);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Video</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter video description"
              onChange={(e) =>
                setVideo({ ...video, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-red-400 outline-none"
            ></textarea>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setVideo({ ...video, thumbnail: e.target.files[0] })
              }
              className="w-full px-3 py-2 border rounded-lg cursor-pointer"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideo({ ...video, videoFile: e.target.files[0] })
              }
              className="w-full px-3 py-2 border rounded-lg cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Uploadpage;
