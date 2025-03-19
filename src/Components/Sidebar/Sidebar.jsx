import React, { useState } from "react";

import {
  Drawer,
  AppBar,
  Toolbar,
  Collapse,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Icons
import QueueIcon from "@mui/icons-material/Queue";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArticleIcon from "@mui/icons-material/Article";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = open ? (isMobile ? 200 : 240) : 60;

  const { user } = useSelector((state) => state.user);

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = () => {
    if (window.confirm("Confirm Logout")) {
      console.log('Logging out...');      
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("user"); 

      navigate('/login');  
      console.log('Logging Success...');
    }
  };  

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  const toggleSubMenu = (label) => {
    setOpenSubMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const allLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    {
      label: "Admin Panel",
      icon: <AdminPanelSettingsIcon />, 
      children: [
        { path: "/recent_blog", label: "Blogs", icon: <ArticleIcon /> },
        { path: "/gallery", label: "Album", icon: <PhotoAlbumIcon /> },
        { path: "/createblog", label: "Create Blog", icon: <PhotoAlbumIcon /> },
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
    {/* Top Navbar */}
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Gautam Solar</Typography>
        <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
      </Toolbar>
    </AppBar>

    {/* Sidebar Drawer */}
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "width 0.3s ease",
          top: "64px",
          height: "100vh",
        },
      }}
    >
      <List>
        {allLinks.map((item, index) => (
          <React.Fragment key={index}>
            {item.children ? (
              <>
                <ListItemButton onClick={() => toggleSubMenu(item.label)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.label} />}
                  {open && (openSubMenu[item.label] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={openSubMenu[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, idx) => (
                      <ListItemButton
                        key={idx}
                        sx={{ pl: 4, background: location.pathname === child.path ? "#ddd" : "transparent" }}
                        onClick={() => handleNavigation(child.path)}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        {open && <ListItemText primary={child.label} />}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{ background: location.pathname === item.path ? "#ddd" : "transparent" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>

    {/* Main Content */}
    <Box component="main" sx={{ flexGrow: 1, transition: "margin 0.3s", marginLeft: `${drawerWidth}px`, marginTop: "64px" }}>
      {children}
    </Box>
  </Box>
);
};


export default Sidebar;