import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children }) {
  const user = useSelector((state) => state.user.data);
  const token = user?.accessToken;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
