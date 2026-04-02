import React, { useState } from "react";
import {
  TextField, Button, Typography, Box, InputAdornment, Avatar,
  Paper, Stack, IconButton, alpha, Container
} from "@mui/material";
import {  } from "framer-motion"; // ✅ FIXED
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
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: colors.bg }}>
      <Container maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper elevation={0} sx={{ p: 5, borderRadius: '24px', border: `1px solid ${colors.border}`, bgcolor: '#fff', textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: alpha(colors.indigo, 0.1), color: colors.indigo, width: 64, height: 64, mx: 'auto', mb: 2 }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 800, color: colors.slate, mb: 1 }}>
              <span style={{ color: colors.indigo }}>Smart</span>Health
            </Typography>

            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
              Staff Access Portal
            </Typography>

            <Stack spacing={2.5}>
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
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={login}
                endIcon={!loading && <ArrowForwardIcon />}
                sx={{
                  py: 1.8,
                  borderRadius: '12px',
                  bgcolor: colors.indigo,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: `0 8px 20px ${alpha(colors.indigo, 0.2)}`,
                  '&:hover': { bgcolor: '#4f46e5' }
                }}
              >
                {loading ? "Authenticating..." : "Sign In"}
              </Button>

              <Typography variant="body2" sx={{ color: '#94a3b8', mt: 2 }}>
                New Staff?{" "}
                <span
                  style={{ color: colors.indigo, cursor: 'pointer', fontWeight: 800 }}
                  onClick={() => navigate("/register")}
                >
                  Create Account
                </span>
              </Typography>
            </Stack>
          </Paper>
        </motion.div>
      </Container>

      <Box sx={{ position: 'fixed', bottom: 30, display: 'flex', alignItems: 'center', gap: 1, opacity: 0.5 }}>
        <ShowChartIcon sx={{ fontSize: 16, color: "#64748b" }} />
        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', letterSpacing: '2px' }}>
          HOSPITAL SYSTEM v4.2.0
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