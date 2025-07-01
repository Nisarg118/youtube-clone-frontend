import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import Modal from "../Modal"; // adjust path if needed
import {
  getUserPlaylists,
  toggleVideoInPlaylist,
} from "../../services/api-service/playlist/playlist"; // make sure you have this service
import Endpoint from "../../services/api-service/endpoints";
import { currentUser } from "../../services/api-service/user/user";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  function handlePlay() {
    navigate(`/watch/${video.id}`);
  }

  async function fetchUserId() {
    try {
      const res = await currentUser(Endpoint.CURRENT_USER);
      return res._id;
    } catch (error) {
      console.log("Error while fetching userId ", error);
    }
  }

  async function openPlaylistModal() {
    try {
      const id = await fetchUserId();
      const res = await getUserPlaylists(Endpoint.USER_PLAYLISTS(id)); // Should return playlists with videos
      setPlaylists(res);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    }
  }

  async function handleToggle(playlistId) {
    try {
      const res = await toggleVideoInPlaylist(
        Endpoint.TOGGLE_PLAYLIST(video._id, playlistId)
      );

      const message = res;
      console.log(message);
      setPlaylists((prev) =>
        prev.map((pl) => {
          if (pl._id !== playlistId) return pl;

          const existingVideos = Array.isArray(pl.videos) ? pl.videos : [];

          const updatedVideos =
            message === "Video removed from playlist"
              ? existingVideos.filter((id) => id !== video._id)
              : [...existingVideos, video._id];

          return { ...pl, videos: updatedVideos };
        })
      );
    } catch (error) {
      console.log("Error while toggling video:", error);
    }
  }

  return (
    <>
      <div className="w-full max-w-[360px] cursor-pointer">
        {/* Thumbnail */}
        <div
          onClick={handlePlay}
          className="relative w-full aspect-video rounded-lg overflow-hidden"
        >
          <img
            src={video.thumbnail}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </div>

        {/* Video Info */}
        <div className="flex pt-3 gap-3 justify-between">
          <div className="flex gap-3">
            {/* Channel Avatar */}
            {video?.owner?.[0]?.avatar && (
              <img
                src={video.owner[0].avatar}
                alt="Channel Avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
            )}
            {/* Text Info */}
            <div className="flex flex-col text-sm">
              <h3 className="font-medium text-black leading-snug line-clamp-2">
                {video.title}
              </h3>
              {video?.owner?.[0] && (
                <p
                  onClick={() =>
                    navigate(`/channel/${video.owner[0]._id}/videos`)
                  }
                  className="text-gray-600 mt-0.5 hover:underline w-fit"
                >
                  @{video.owner[0].username}
                </p>
              )}
              <p className="text-gray-600">
                {video.views} Views •{" "}
                {new Date(video.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* 3 Dot Menu Icon */}

          <div onClick={() => openPlaylistModal()} className="self-start">
            <MoreVertical className="w-5 h-5 text-gray-600 hover:text-black" />
          </div>
        </div>
      </div>

      {/* Playlist Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-black">
          Add video to Playlist
        </h2>
        <div className="space-y-3">
          {playlists.length === 0 && (
            <p className="text-black">No playlists found.</p>
          )}
          {playlists.map((playlist) => (
            <div key={playlist._id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={playlist.videos?.includes(video._id) || false}
                onChange={() => handleToggle(playlist._id)}
              />

              <label className="text-sm text-black ">{playlist.name}</label>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default VideoCard;
