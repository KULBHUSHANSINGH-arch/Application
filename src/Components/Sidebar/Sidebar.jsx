import React, { useState } from "react";
import { Drawer, AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery, useTheme, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; 

const drawerWidth = 240;

const Sidebar = ({ children, setSidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get user from Redux
  const { user } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setOpen(!open);
    if (setSidebarOpen) {
      setSidebarOpen(!open);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Confirm Logout");
    if (confirmLogout) {
      sessionStorage.removeItem("authToken");
      toast.success("Logout Successful");
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // ✅ Define all navigation links dynamically
  const allLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/registration", label: "Registration", icon: <PersonAddIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {/* Header AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Basic Messaging Application
          </Typography>

          {/* Show Logout only if user is logged in */}
          {user && (
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: "64px",
            height: `calc(100% - 64px)`,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {allLinks.map((link, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton onClick={() => handleNavigation(link.path)}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease-out",
          marginLeft: open ? `${drawerWidth}px` : "0px",
          marginTop: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
