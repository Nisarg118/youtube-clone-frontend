import { apiRequest } from "../api/api";

async function fetchSubscribersNo(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch subscribers count :", error.message);
  }
}

async function changeSubscription(url) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch subscribers count :", error.message);
  }
}

async function getSubscribedChannels(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });

    return res.data;
  } catch (error) {}
}
export { fetchSubscribersNo, changeSubscription, getSubscribedChannels };
