import axios from "axios";
import { getToken } from "../../../utils/token";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  timeout: 5000,
});

export const apiRequest = async (config = {}) => {
  try {
    const response = await api({
      ...config,
      headers: { ...config.headers, ...getToken() },
    });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
