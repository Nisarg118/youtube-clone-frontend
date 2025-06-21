import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import isTokenExpired from "./isTokenExpired";
import { refreshAccessToken } from "../services/api-service";
import Spinner from "../components/Spinner"; // Optional loading spinner

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user.data);
  const token = user?.accessToken;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading flag

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (isTokenExpired(token)) {
        try {
          const { accessToken } = await refreshAccessToken();

          if (accessToken) {
            const updatedUser = { ...(user || {}), accessToken };
            dispatch({
              type: "loginUser/fulfilled",
              payload: updatedUser,
            });
            localStorage.setItem("userData", JSON.stringify(updatedUser));
            setIsAuthenticated(true);
          } else {
            dispatch({ type: "logoutUser" });
            setIsAuthenticated(false);
          }
        } catch {
          dispatch({ type: "logoutUser" });
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(true);
      }

      setLoading(false); // ✅ done verifying
    };

    verifyToken();
  }, [location.pathname]);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (isAuthenticated && location.pathname.includes("login")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
