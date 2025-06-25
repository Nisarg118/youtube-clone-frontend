import axios from "axios";
async function getAllVideos(url) {
  try {
    const res = await axios.get(url);

    return res.data.data.videos || [];
  } catch (error) {
    console.error("Failed to fetch videos:", error.message);
    return [];
  }
}

async function fetchVideoById({ url, token }) {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch video:", error.message);
  }
}

async function getAllVideosOfChannel({ url, token }) {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.videos;
  } catch (error) {
    console.error("Failed to fetch all videos : ", error.message);
  }
}

async function publishVideo({ url, formData, token }) {
  try {
    const res = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Failed to publish video:", error.message);
  }
}

async function deleteVideo({ url, token }) {
  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.success;
  } catch (error) {
    console.log("Error while deleting video : ", error);
  }
}

async function editVideo({ url, formData, token }) {
  try {
    const res = await axios.patch(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.success;
  } catch (error) {
    console.error("Failed to edit video:", error.message);
  }
}

async function toggleIsPublished({ url, token }) {
  try {
    const res = await axios.patch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.success;
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
