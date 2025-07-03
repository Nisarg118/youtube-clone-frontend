import { useState } from "react";
import { VideoCard } from "../components";

const WatchHistory = ({ videos }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleVideos = showAll ? videos : videos.slice(0, 5);

  const handleToggle = () => setShowAll((prev) => !prev);

  return (
    <div>
      {/* Watch History */}
      <section className="space-y-2">
        {/* Top Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Watch History</h3>
          {videos.length > 5 && (
            <button
              onClick={handleToggle}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {showAll ? "View Less" : "View All"}
            </button>
          )}
        </div>

        {/* Scrollable Row or Full Wrap */}
        <div
          className={`py-2 ${
            showAll
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              : "flex gap-4 overflow-x-auto scrollbar-hide"
          }`}
        >
          {visibleVideos.map((vid) => (
            <div key={vid._id} className={showAll ? "" : "flex-shrink-0 w-64"}>
              <VideoCard video={vid} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WatchHistory;
