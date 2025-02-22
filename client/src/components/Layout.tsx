import React, { ReactNode, useState } from "react";
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: drawerWidth, p: 2 }}>
      <Typography variant="h6">Menu</Typography>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/hotels">Hotels</a></li>
        <li><a href="/booking">Booking</a></li>
      </ul>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />

      {/* Fixed Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Hotel Booking</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
     

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px", // Push content down (same height as AppBar)
          mb: "50px", // Space for footer
          overflowY: "auto"
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* Fixed Footer */}
      <Box component="footer" sx={{ position: "fixed", bottom: 0, width: "100%", height: "50px", bgcolor: "primary.main", color: "white", textAlign: "center", lineHeight: "50px" }}>
        © 2025 Hotel Booking App
      </Box>
    </Box>
  );
};

export default Layout;
