import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state?.user?.user); 
  const location = useLocation();

    // <Navigate to="/login" replace state={{ from: location }} />;
 

  return children;
};

export default ProtectedRoutes;