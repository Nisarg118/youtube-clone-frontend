import { useEffect, useState } from "react";
import { LikedVideos, Playlists, WatchHistory } from "../components";
import Endpoint from "../services/api-service/endpoints";
import {
  currentUser,
  getWatchHistory,
} from "../services/api-service/user/user";

const Aboutpage = () => {
  const [userId, setUserId] = useState(null);
  const [videos, setVideos] = useState(null); // null for loading state
  const [loading, setLoading] = useState(true);

  // Step 1: Fetch user ID
  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await currentUser(Endpoint.CURRENT_USER);
        setUserId(res._id);
      } catch (error) {
        console.log("Error while fetching user ID", error);
      }
    }
    fetchUserId();
  }, []);

  // Step 2: Fetch Watch History once userId is available
  useEffect(() => {
    if (!userId) return;
    async function fetchUserHistory() {
      try {
        const res = await getWatchHistory(Endpoint.WATCH_HISTORY);
        setVideos(res);
      } catch (error) {
        console.log("Error while getting watch history", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserHistory();
  }, [userId]);

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      {/* Watch History Section */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading your history...</p>
      ) : videos?.length === 0 ? (
        <p className="text-gray-500 text-center">No videos viewed yet.</p>
      ) : (
        <WatchHistory videos={videos} />
      )}

      {/* Playlists Section */}
      {userId && <Playlists userId={userId} />}

      {/* Liked Videos Section */}
      <LikedVideos />
    </div>
  );
};

export default Aboutpage;
