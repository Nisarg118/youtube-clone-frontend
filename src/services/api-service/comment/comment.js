import { apiRequest } from "../api/api";

async function createComment({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });
    return res.success;
  } catch (error) {
    console.log("Error in createComment api service : ", error);
    throw error;
  }
}

async function getVideoComments(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    return res.data.paginatedComments;
  } catch (error) {
    console.log("Error in getVideoComments api service : ", error);
    throw error;
  }
}

async function updateComment({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
      data: formData,
    });
    return res.success;
  } catch (error) {
    console.log("Error in updateComment api service : ", error);
    throw error;
  }
}

async function deleteComment(url) {
  try {
    const res = await apiRequest({
      method: "DELETE",
      url: url,
    });
    return res.success;
  } catch (error) {
    console.log("Error in deleteComment api service : ", error);
    throw error;
  }
}
export { createComment, getVideoComments, updateComment, deleteComment };
