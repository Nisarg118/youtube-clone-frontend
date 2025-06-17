import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isTokenExpired from "./isTokenExpired";
import { refreshAccessToken } from "../services/api-service";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.data); // Adjust this based on your store
  const token = user?.accessToken;

  const [checked, setChecked] = useState(false);
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token || isTokenExpired(token)) {
          const { accessToken } = await refreshAccessToken();
          if (accessToken) {
            dispatch({
              type: "loginUser/fulfilled",
              payload: { ...user, accessToken },
            });
            localStorage.setItem(
              "userData",
              JSON.stringify({ ...user, accessToken })
            );
            setValidToken(true);
          } else {
            dispatch({ type: "logoutUser" });
            setValidToken(false);
          }
        } else {
          setValidToken(true);
        }
      } catch (err) {
        dispatch({ type: "logoutUser" });
        setValidToken(false);
      } finally {
        setChecked(true);
      }
    };

    verifyToken();
  }, [token, dispatch]);

  // Wait for token check
  if (!checked) return null;

  // Redirects
  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup")
  ) {
    return validToken ? <Navigate to="/" replace /> : <>{children}</>;
  }

  if (!validToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
