import { apiRequest } from "../api/api";

async function getAllVideos(url) {
  try {
    const res = await apiRequest(
      {
        method: "GET",
        url: url,
      },
      false
    );
    return res.data.videos || [];
  } catch (error) {
    console.error("Failed to fetch all  videos:", error.message);
    return [];
  }
}

async function fetchVideoById(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch video:", error.message);
  }
}

async function getAllVideosOfChannel(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    return res.data.videos;
  } catch (error) {
    console.error("Failed to fetch all videos of Channel : ", error.message);
  }
}

async function publishVideo({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });
  } catch (error) {
    console.error("Failed to publish video:", error.message);
  }
}

async function deleteVideo(url) {
  try {
    const res = await apiRequest({
      method: "DELETE",
      url: url,
    });
    return res.success;
  } catch (error) {
    console.log("Error while deleting video : ", error);
  }
}

async function editVideo({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
      data: formData,
    });

    return res.success;
  } catch (error) {
    console.error("Failed to edit video:", error.message);
  }
}

async function toggleIsPublished(url) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
    });

    return res.success;
  } catch (error) {
    console.error("Failed to edit video:", error.message);
  }
}
export {
  getAllVideos,
  fetchVideoById,
  getAllVideosOfChannel,
  publishVideo,
  deleteVideo,
  editVideo,
  toggleIsPublished,
};
