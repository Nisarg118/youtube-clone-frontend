import React from "react";

const Playlistspage = () => {
  const playlists = [
    {
      id: "vid1",
      title: "Learn React in 10 Minutes",
      thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
      watchedAt: "2025-05-28T18:00:00Z",
    },
    {
      id: "vid2",
      title: "Understanding JavaScript Closures",
      thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
      watchedAt: "2025-05-29T09:30:00Z",
    },
    {
      id: "vid3",
      title: "Tailwind CSS Crash Course",
      thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
      watchedAt: "2025-05-30T11:15:00Z",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your playlists</h1>
      <ul className="space-y-4">
        {playlists.map((video) => (
          <li
            key={video.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-500">
                  Watched on: {new Date(video.watchedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlistspage;
