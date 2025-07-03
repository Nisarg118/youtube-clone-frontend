import { apiRequest } from "../api/api";

async function toggleLike(url) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
    });

    if (res.message === "Liked successfully") {
      return true;
    } else if (res.message === "Unliked successfully") {
      return false;
    }
  } catch (error) {
    console.log("Error in toggleLike api-service : ", error);
    throw error;
  }
}

async function getLikeCounts(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });

    return res.data;
  } catch (error) {
    console.log("Error in getLikeCounts : ", error);
    throw error;
  }
}

async function getLikedVideos(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    return res.data;
  } catch (error) {
    console.log("Error in getLikedVideos api-service : ", error);
    throw error;
  }
}

export { toggleLike, getLikeCounts, getLikedVideos };
