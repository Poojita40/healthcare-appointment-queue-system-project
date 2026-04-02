import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  Stack,
  IconButton,
  Container,
  alpha,
  InputAdornment
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import api from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const colors = {
    indigo: "#6366f1",
    slate: "#1e293b",
    border: "#eef2f6",
    bg: "#f8fafc"
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (!user.username || !user.email || !user.password) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);
    try {
      // ✅ CORRECT BACKEND URL
      const response = await api.post("/api/auth/register", user);

      if (response.data) {
        toast.success("Account Created Successfully");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed. Verify network connection.");
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
      <Box className="glass-blob" sx={{ top: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'rgba(99, 102, 241, 0.15)' }} />
      <Box className="glass-blob" sx={{ bottom: '10%', left: '-5%', width: '30vw', height: '30vw', background: 'rgba(168, 85, 247, 0.15)', animationDelay: '-5s' }} />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <Box className="glass-card" sx={{ p: 5, bgcolor: 'rgba(255,255,255,0.85)' }}>
            <IconButton onClick={() => navigate("/")} sx={{ mb: 2, ml: -1, color: colors.indigo }}>
              <ArrowBackIcon />
            </IconButton>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar component={motion.div} whileHover={{ scale: 1.1 }} sx={{ bgcolor: alpha(colors.indigo, 0.1), color: colors.indigo, width: 72, height: 72, mx: 'auto', mb: 2, boxShadow: `0 8px 24px ${alpha(colors.indigo, 0.2)}` }}>
                <PersonAddAlt1Icon sx={{ fontSize: 40 }} />
              </Avatar>

              <Typography variant="h4" sx={{ fontWeight: 900, color: colors.slate, letterSpacing: '-1px' }}>
                Join <span className="text-gradient">Network</span>
              </Typography>

              <Typography variant="body2" sx={{ color: '#64748b', mt: 1.5, fontWeight: 600 }}>
                Create your Administrator identity
              </Typography>
            </Box>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Full Name"
                name="username"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: colors.indigo, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={dashboardInputStyle}
              />

              <TextField
                fullWidth
                label="Official Email"
                name="email"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: colors.indigo, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={dashboardInputStyle}
              />

              <TextField
                fullWidth
                label="Security Password"
                name="password"
                type="password"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: colors.indigo, fontSize: 20 }} />
                    </InputAdornment>
                  ),
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
                onClick={register}
                className="btn-premium"
                sx={{
                  mt: 2,
                  py: 2,
                  bgcolor: colors.indigo,
                  fontWeight: 800,
                  fontSize: '1rem',
                  boxShadow: `0 12px 24px ${alpha(colors.indigo, 0.3)}`,
                  '&:hover': { bgcolor: '#4f46e5' }
                }}
              >
                {loading ? "Creating Profile..." : "Initialize Account"}
              </Button>

              <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748b', mt: 3, fontWeight: 500 }}>
                Already a member?{" "}
                <span
                  style={{ color: colors.indigo, cursor: 'pointer', fontWeight: 800 }}
                  onClick={() => navigate("/")}
                >
                  Sign In
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
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#6366f1'
  }
};

export default Register;