import axios from "axios";
import { getToken } from "../../../utils/token";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  timeout: 5000,
});

export const apiRequest = async (config = {}, withAuth = true) => {
  try {
    const headers = withAuth
      ? { ...config.headers, ...getToken() }
      : config.headers;

    console.log("headers: ", headers);
    const response = await api({
      ...config,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
