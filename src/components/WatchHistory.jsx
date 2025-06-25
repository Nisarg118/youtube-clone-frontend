import { VideoCard } from "../components";
import { useNavigate } from "react-router-dom";

const WatchHistory = ({ mockVideos }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/history`);
  };
  return (
    <div>
      {/* Watch History */}
      <section className="space-y-2">
        {/* Top Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Watch History</h3>
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium text-blue-600 hover:underline"
              onClick={handleClick}
            >
              View All
            </button>
            <button
              onClick={() => {
                document.getElementById("history-scroll").scrollLeft -= 300;
              }}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={() => {
                document.getElementById("history-scroll").scrollLeft += 300;
              }}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Row */}
        <div
          id="history-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
        >
          {mockVideos.map((vid) => (
            <div key={vid.id} className="flex-shrink-0 w-64">
              <VideoCard video={vid} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WatchHistory;
