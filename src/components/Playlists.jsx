import React from "react";
import { VideoCard } from "../components";

const Playlists = ({ mockVideos }) => {
  return (
    <div>
      {/* Playlists */}
      <section className="space-y-2">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Playlists</h3>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </button>
            <button
              onClick={() =>
                document.getElementById("playlists-scroll")?.scrollBy({
                  left: -300,
                  behavior: "smooth",
                })
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={() =>
                document.getElementById("playlists-scroll")?.scrollBy({
                  left: 300,
                  behavior: "smooth",
                })
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          id="playlists-scroll"
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 py-2 px-1"
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

export default Playlists;
