import { apiRequest } from "../api/api";

async function createPlaylist({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });
    return res.data.playlist;
  } catch (error) {
    console.log("Error in createPlaylist api service : ", error);
    throw error;
  }
}

async function getUserPlaylists(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    return res.data.playlists;
  } catch (error) {
    console.log("Error in getUserPlaylists api service : ", error);
    throw error;
  }
}

async function getPlaylistById(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    return res.data.playlistVideos;
  } catch (error) {
    console.log("Error in getPlaylistById api service : ", error);
    throw error;
  }
}

async function updatePlaylist({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
      data: formData,
    });
    return res.data.playlist;
  } catch (error) {
    console.log("Error in updatePlaylist api service : ", error);
    throw error;
  }
}

async function deletePlaylist(url) {
  try {
    const res = await apiRequest({
      method: "DELETE",
      url: url,
    });
    return res.success;
  } catch (error) {
    console.log("Error in deletePlaylist api service : ", error);
    throw error;
  }
}

async function addVideoToPlaylist(url) {
  //it returns all updated videos
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
    });
    return res.data.playlistVideos;
  } catch (error) {
    console.log("Error in addVideoToPlaylist api service : ", error);
    throw error;
  }
}

async function removeVideoFromPlaylist(url) {
  //it returns removed video
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
    });
    return res.data.removeVideo;
  } catch (error) {
    console.log("Error in removeVideoFromPlaylist api service : ", error);
    throw error;
  }
}
export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
