import { apiRequest } from "../api/api";

async function toggleLike({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });

    if (res.message === "Liked successfully") {
      return 1;
    } else if (res.message === "Unliked successfully") {
      return -1;
    }
  } catch (error) {
    console.log("Error in toggleLike api-service : ", error);
    throw error;
  }
}

async function getLikeCounts({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
      data: formData,
    });

    return res.data.likeCount;
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

    return res.data.videos;
  } catch (error) {
    console.log("Error in getLikedVideos api-service : ", error);
    throw error;
  }
}

export { toggleLike, getLikeCounts };
