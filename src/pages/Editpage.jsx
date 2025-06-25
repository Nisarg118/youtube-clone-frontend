import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editVideo } from "../services/api-service/video/video";
import Endpoint from "../services/api-service/endpoints";
const Editpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", info.title);
    formData.append("description", info.description);
    formData.append("thumbnail", info.thumbnail);
    const flag = await editVideo({
      url: Endpoint.EDIT_VIDEO_BY_ID(id),
      formData,
    });
    if (!flag) {
      console.log("Error in editing video");
    }
    setLoading(false);
    navigate("/profile/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit video info
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              onChange={(e) => setInfo({ ...info, title: e.target.value })}
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
                setInfo({ ...info, description: e.target.value })
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
                setInfo({ ...info, thumbnail: e.target.files[0] })
              }
              className="w-full px-3 py-2 border rounded-lg cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
