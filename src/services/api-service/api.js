import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 5000,
});

// Adding Authorization Token
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiRequest = async (config = {}) => {
  try {
    const response = await api({
      ...config,
      headers: { ...config.headers, ...getAuthHeaders() },
    });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
