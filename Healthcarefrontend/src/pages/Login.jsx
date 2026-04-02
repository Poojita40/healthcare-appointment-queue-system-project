import React, { useState, useEffect } from "react";
import {
  TextField, Button, Typography, Box, InputAdornment, Avatar,
  Paper, Stack, IconButton, alpha, Container
} from "@mui/material";
import { motion } from "framer-motion"; // ✅ FIXED
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Correct Material UI Icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import api from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("token") === "loggedin") {
      navigate("/dashboard");
    }
  }, [navigate]);


  const colors = { indigo: "#6366f1", slate: "#1e293b", border: "#eef2f6", bg: "#f8fafc" };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!user.email || !user.password) {
      toast.error("Credentials required");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", user);
      if (response.data) {
        localStorage.setItem("token", "loggedin");
        toast.success("Identity Verified.");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Authentication Denied");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      position: 'relative',
      height: "100vh", 
      width: "100vw", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      bgcolor: 'transparent',
      overflow: 'hidden'
    }}>
      {/* Background Blobs */}
      <Box className="glass-blob" sx={{ top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'rgba(99, 102, 241, 0.15)' }} />
      <Box className="glass-blob" sx={{ bottom: '10%', right: '-5%', width: '30vw', height: '30vw', background: 'rgba(168, 85, 247, 0.15)', animationDelay: '-5s' }} />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Box className="glass-card" sx={{ p: 6, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.85)' }}>
            <Avatar component={motion.div} whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} sx={{ bgcolor: alpha(colors.indigo, 0.1), color: colors.indigo, width: 72, height: 72, mx: 'auto', mb: 3, boxShadow: `0 8px 24px ${alpha(colors.indigo, 0.2)}` }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography variant="h4" sx={{ fontWeight: 900, color: colors.slate, mb: 1, letterSpacing: '-1px' }}>
              <span className="text-gradient">Smart</span>Health
            </Typography>

            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, display: 'block', mb: 5, textTransform: 'uppercase', letterSpacing: 2 }}>
              Staff Access Portal
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Staff Email"
                name="email"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon sx={{ color: colors.indigo, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={dashboardInputStyle}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: colors.indigo, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={dashboardInputStyle}
              />

              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={login}
                className="btn-premium"
                endIcon={!loading && <ArrowForwardIcon />}
                sx={{
                  py: 2,
                  bgcolor: colors.indigo,
                  fontSize: '1.1rem',
                  boxShadow: `0 12px 24px ${alpha(colors.indigo, 0.3)}`,
                  '&:hover': { bgcolor: '#4f46e5' }
                }}
              >
                {loading ? "Authenticating..." : "Sign In"}
              </Button>

              <Typography variant="body2" sx={{ color: '#64748b', mt: 3, fontWeight: 500 }}>
                New Staff Member?{" "}
                <span
                  style={{ color: colors.indigo, cursor: 'pointer', fontWeight: 800 }}
                  onClick={() => navigate("/register")}
                >
                  Create Account
                </span>
              </Typography>
            </Stack>
          </Box>
        </motion.div>
      </Container>

      <Box sx={{ position: 'fixed', bottom: 30, display: 'flex', alignItems: 'center', gap: 1.5, opacity: 0.6 }}>
        <ShowChartIcon sx={{ fontSize: 20, color: colors.indigo }} />
        <Typography variant="caption" sx={{ fontWeight: 900, color: colors.slate, letterSpacing: '4px' }}>
          SMARTHEALTH OS v4.2
        </Typography>
      </Box>
    </Box>
  );
}

const dashboardInputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#cbd5e1' },
    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' }
};

export default Login;