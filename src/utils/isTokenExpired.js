import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now();
    const expiryTime = decoded.exp * 1000;

    return expiryTime < currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return true;
  }
};

export default isTokenExpired;
