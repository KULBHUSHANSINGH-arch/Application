import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoutes;
