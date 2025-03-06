import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/Pages/Login";
import Registration from "./Components/Pages/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProtectedRoutes from "./Components/Best_Routes/ProtectedRoutes";
import PublicRoute from "./Components/Best_Routes/PublicRoute"; 

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/registration" element={<ProtectedRoutes><Registration /></ProtectedRoutes>} />
        <Route path="/sidebar" element={<ProtectedRoutes><Sidebar /></ProtectedRoutes>} />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
