import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, Container, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, Divider
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Patients", path: "/patients", icon: <PeopleIcon /> },
    { label: "Doctors", path: "/doctors", icon: <LocalHospitalIcon /> },
    { label: "Appointments", path: "/appointments", icon: <EventAvailableIcon /> },
  ];

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e2e8f0',
        zIndex: 1201
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ p: 1, bgcolor: '#6366f1', borderRadius: '10px', color: 'white', display: 'flex' }}>🏥</Box>
              Smart<span style={{ color: '#6366f1' }}>Health</span>
            </Typography>

            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button key={item.path} onClick={() => navigate(item.path)} startIcon={item.icon} sx={{
                    textTransform: 'none', fontWeight: 700, borderRadius: '10px', px: 2,
                    color: isActive(item.path) ? '#6366f1' : '#64748b',
                    bgcolor: isActive(item.path) ? '#6366f110' : 'transparent'
                  }}>{item.label}</Button>
                ))}
                <Button onClick={() => { localStorage.clear(); navigate("/"); }} color="error" variant="contained" sx={{ ml: 2, borderRadius: '10px', textTransform: 'none' }}>Logout</Button>
              </Box>
            ) : (
              <IconButton onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* THIS IS THE FIX: It prevents the Dashboard from sliding under the Navbar */}
      <Toolbar />
    </>
  );
}
export default Navbar;