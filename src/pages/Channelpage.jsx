import React from "react";
import { ChannelInfo } from "../components";
import { useLocation } from "react-router-dom";

const user = {
  avatar: "https://i.pravatar.cc/150?img=12",
  channelName: "Code with Dev",
  username: "devcode123",
  subscribers: "12.3K",
  totalVideos: 42,
  joinedAt: "2023-08-01T00:00:00Z",
  description: `Welcome to Code with Dev! 🚀\n\nWe cover fullstack tutorials, JavaScript, React, and more.`,
};

const arr = [
  { element: "Home", path: "/channel" },

  { element: "Videos", path: "/channel/videos" },
  { element: "Playlists", path: "/playlists" },
  { element: "Posts", path: "/posts" },
];

const Channelpage = () => {
  const location = useLocation();

  return (
    <div className="border-b-2">
      <ChannelInfo user={user} />
      <div className="flex mt-4 gap-16">
        {arr.map((element) => (
          <p
            className={`p-2 rounded-md  text-xl cursor-pointer      
              ${
                location.pathname === element.path
                  ? "bg-gray-400"
                  : "hover:bg-gray-100"
              }`}
          >
            {element.element}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Channelpage;
