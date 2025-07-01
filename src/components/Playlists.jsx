import { useState } from "react";
import { PlaylistCard } from "../components";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import {
  createPlaylist,
  getUserPlaylists,
} from "../services/api-service/playlist/playlist";
import Endpoint from "../services/api-service/endpoints";
import { useEffect } from "react";

const Playlists = ({ userId }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [playlists, setPlaylists] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    async function fetchUserPlaylists() {
      try {
        const res = await getUserPlaylists(Endpoint.USER_PLAYLISTS(userId));
        setPlaylists(res);
      } catch (error) {
        console.log("Error while fetching user playlists", error);
      }
    }
    fetchUserPlaylists();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await createPlaylist({
        url: Endpoint.CREATE_PLAYLIST,
        formData: form,
      });
      console.log(res);
      const newArr = [res, ...playlists];
      setPlaylists(newArr);
      setForm({ name: "", description: "" });
      setOpen(false);
    } catch (error) {
      console.log("Error while creating playlist", error);
    }
  };

  return (
    <div>
      {/* Playlists */}
      <section className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Playlists</h3>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setOpen(true)}
              className="bg-gray-200 rounded-xl text-xl hover:bg-gray-100 px-5 py-2"
            >
              +
            </button>
            {playlists.length > 4 && (
              <button
                onClick={() => setViewAll((prev) => !prev)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {viewAll ? "View Less" : "View All"}
              </button>
            )}
          </div>
        </div>

        {/* Grid display */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {(viewAll ? playlists : playlists.slice(0, 4)).map(
            (playlist, index) => (
              <PlaylistCard key={playlist._id || index} playlist={playlist} />
            )
          )}
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Create Playlist</h2>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Playlist name"
              className="w-full border rounded-md p-2 text-m"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Short description"
              className="w-full border rounded-md p-2 text-sm resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!form.name.trim() || !form.description.trim()}
            className={`px-4 py-2 rounded-full text-sm text-white ${
              form.name.trim() && form.description.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Playlists;
