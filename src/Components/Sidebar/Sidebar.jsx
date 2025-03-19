import React, { useState } from "react";
import { Drawer, AppBar, Toolbar,  Collapse,IconButton, Typography, Box, useMediaQuery, useTheme, Button } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

// /--------------  Icons ----------------/ 
import QueueIcon from '@mui/icons-material/Queue';
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArticleIcon from "@mui/icons-material/Article";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Mobile Check

  // Responsive Drawer Width
  const drawerWidth = isMobile ? 200 : 240;

  // Redux se user data
  const { user } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    if (window.confirm("Confirm Logout")) {
      sessionStorage.removeItem("authToken");
      toast.success("Logout Successful");
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setOpen(false); // ✅ Mobile me click ke baad drawer close ho
  };

  const toggleSubMenu = (label) => {
    setOpenSubMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };


  const allLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/registration", label: "Registration", icon: <QueueIcon /> },
    // { path: "/adminpanel", label: "Admin Panel", icon: <AdminPanelSettingsIcon /> },
    
    {
      label: "Admin Panel",
      icon: <AdminPanelSettingsIcon />,
      children: [
        {
          path: "/recent_blog",
          label: "Blogs",
          icon: <ArticleIcon />,
        },
        {
          path: "/gallery",
          label: "Album",
          icon: <PhotoAlbumIcon />,
        },
        {
          path: "/createblog",
          label: "Create Blog",
          icon: <PhotoAlbumIcon />,
        },
      ],
    },

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
            Gautam Solar
          </Typography>
          {user && (
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer (Responsive) */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"} // ✅ Mobile: Overlay, Desktop: Persistent
        anchor="left"
        open={open}
        onClose={toggleDrawer}
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
            {allLinks.map((item, index) => (
              <React.Fragment key={index}>
                {item.children ? (
                  <>
                    {/* Parent Item - Click to Expand */}
                    <ListItemButton onClick={() => toggleSubMenu(item.label)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                      {openSubMenu[item.label] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    {/* Child Items */}
                    <Collapse in={openSubMenu[item.label]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child, idx) => (
                          <ListItemButton key={idx} sx={{ pl: 4 }} onClick={() => handleNavigation(child.path)}>
                            <ListItemIcon>{child.icon}</ListItemIcon>
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  /* Direct Navigation Items */
                  <ListItemButton onClick={() => handleNavigation(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                )}
              </React.Fragment>
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
          marginLeft: isMobile ? "0px" : `${drawerWidth}px`, // ✅ Mobile: No margin
          marginTop: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
