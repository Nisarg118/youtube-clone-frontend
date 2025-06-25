import axios from "axios";

async function fetchSubscribersNo({ url, token }) {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch videos:", error.message);
  }
}

export { fetchSubscribersNo };
