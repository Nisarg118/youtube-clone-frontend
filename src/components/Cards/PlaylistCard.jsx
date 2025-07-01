import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[360px] cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <img
          src={
            playlist.thumbnail ||
            "https://kingdomfellowship.org/wp-content/uploads/2009/08/no-video-available-image.jpg"
          }
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h12v2H3v-2z" />
            </svg>
            {playlist.totalVideos} videos
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-2">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-lg">{playlist.name}</h2>

            <a
              onClick={() => navigate(`/playlists/${playlist._id}`)}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              View full playlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
