import { useEffect, useState } from "react";
import { ChannelInfo } from "../components";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { getUserChannelProfile } from "../services/api-service/user/user";
import Endpoint from "../services/api-service/endpoints";

const tabs = [
  { element: "Videos", path: "videos" },
  { element: "Playlists", path: "playlists" },
  { element: "Posts", path: "posts" },
];

const Channelpage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchCurrentChannelData() {
      try {
        const res = await getUserChannelProfile(
          Endpoint.USERCHANNELPROFILE(userId)
        );
        console.log(res);
        setUserData(res);
      } catch (error) {
        console.log("Error while fetching user channel data ", error);
      }
    }

    fetchCurrentChannelData();
  }, [userId]);

  return (
    <div>
      {/* Channel Info */}
      <ChannelInfo user={userData} />

      {/* Tabs */}
      <div className="flex gap-10 px-6 border-b mt-4">
        {tabs.map((tab) => {
          const fullPath = `/channel/${userId}/${tab.path}`;
          const isActive =
            location.pathname === fullPath ||
            (tab.path === "" && location.pathname === `/channel/${userId}`);

          return (
            <button
              key={tab.path}
              onClick={() => navigate(fullPath)}
              className={`relative py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.element}
            </button>
          );
        })}
      </div>

      {/* Render tab content */}
      <div className="p-6">
        <Outlet context={{ userId }} />
      </div>
    </div>
  );
};

export default Channelpage;
