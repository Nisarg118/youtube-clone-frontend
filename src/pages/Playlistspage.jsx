import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoCard } from "../components"; // assuming you already have this
import { getPlaylistById } from "../services/api-service/playlist/playlist"; // your API
import Endpoint from "../services/api-service/endpoints";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await getPlaylistById(Endpoint.PLAYLIST_BY_ID(playlistId));
        setPlaylist(res);
      } catch (err) {
        console.error("Failed to fetch playlist", err);
      }
    }

    fetchPlaylist();
  }, [playlistId]);

  if (!playlist) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
      {/* LEFT SECTION */}
      <div className="space-y-4 h-[530px] rounded-lg p-3 bg-green-300">
        {/* Thumbnail */}
        <div className="w-[300px] mx-auto p-2 mt-4 aspect-video overflow-hidden rounded-xl">
          <img
            src={
              playlist.videos[0]?.thumbnail ||
              "https://img.icons8.com/ios/500/no-video.png"
            }
            alt="Playlist Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-m text-gray-800 whitespace-pre-wrap">
          Playlist Name :{playlist.name}
        </div>
        {/* Meta */}
        <div className="text-m text-gray-600">
          {playlist.videos.length} videos
        </div>

        {/* Description */}
        <div className="text-sm text-gray-800 whitespace-pre-wrap">
          Descripton: {playlist.description || "No description yet"}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
            Edit
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="space-y-4">
        {playlist.videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
