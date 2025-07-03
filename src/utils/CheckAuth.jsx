import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import isTokenExpired from "./isTokenExpired";
import Spinner from "../components/Spinner";
import { refreshAccessToken } from "../services";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.user.accessToken);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasRefreshed = useRef(false); // ✅ avoids looping

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const expired = isTokenExpired(token);

      if (!expired) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // 🔁 Token is expired — try refresh only once
      if (hasRefreshed.current) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      hasRefreshed.current = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          dispatch({
            type: "loginUser/fulfilled",
            payload: newAccessToken,
          });
          localStorage.setItem("token", newAccessToken);
          setIsAuthenticated(true);
        } else {
          dispatch({ type: "logoutUser" });
          setIsAuthenticated(false);
        }
      } catch {
        dispatch({ type: "logoutUser" });
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []); // ✅ only run once on mount

  if (loading) return <Spinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isAuthenticated && location.pathname.includes("login")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
