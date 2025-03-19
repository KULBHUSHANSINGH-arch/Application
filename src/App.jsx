import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/Pages/Login";
import Registration from "./Components/Pages/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProtectedRoutes from "./Components/Best_Routes/ProtectedRoutes";
import PublicRoute from "./Components/Best_Routes/PublicRoute"; 
import AdminPanel from "./Components/Admin_Panel/Gallery";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Recent_Blog from "./Components/Admin_Panel/Recent_Blog";
import Gallery from "./Components/Admin_Panel/Gallery";
import Create_Blog from "./Components/Admin_Panel/Create_Blog";

// Layout Component jo Sidebar wrap karega
const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        <Outlet /> {/* Ye jagah badlegi based on route */}
      </Box>
    </Box>
  );
};

function App() {
  const { user } = useSelector((state) => state.user) || {};

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Sidebar ke sath Protected Routes */}
        <Route element={<ProtectedRoutes><Layout /></ProtectedRoutes>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recent_blog" element={<Recent_Blog/>} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/createblog" element={<Create_Blog />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
