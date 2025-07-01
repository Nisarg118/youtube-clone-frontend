import { apiRequest } from "../api/api";

async function createTweet({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });

    return res.data;
  } catch (error) {
    console.log("Error in createTweet api service : ", error);
    throw error;
  }
}

async function getUserTweets(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    return res.data;
  } catch (error) {
    console.log("Error in getUserTweets api service : ", error);
    throw error;
  }
}

async function updateTweet({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      url: url,
      data: formData,
    });
    return res.data;
  } catch (error) {
    console.log("Error in updateTweet api service : ", error);
    throw error;
  }
}

async function deleteTweet(url) {
  try {
    const res = await apiRequest({
      method: "DELETE",
      url: url,
    });
    return res.success;
  } catch (error) {
    console.log("Error in getUserTweets api service : ", error);
    throw error;
  }
}
export { createTweet, getUserTweets, updateTweet, deleteTweet };
