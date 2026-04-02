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
import {  } from "framer-motion";
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
      const response = await api.post("/api/patients/register", user);

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
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: colors.bg
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: '24px',
              border: `1px solid ${colors.border}`,
              bgcolor: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}
          >
            <IconButton
              onClick={() => navigate("/")}
              sx={{ mb: 1, ml: -1, color: colors.indigo }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(colors.indigo, 0.1),
                  color: colors.indigo,
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <PersonAddAlt1Icon sx={{ fontSize: 30 }} />
              </Avatar>

              <Typography variant="h5" sx={{ fontWeight: 800, color: colors.slate }}>
                Join <span style={{ color: colors.indigo }}>Network</span>
              </Typography>

              <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
                Create your Administrator identity
              </Typography>
            </Box>

            <Stack spacing={2.5}>
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
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={register}
                sx={{
                  mt: 2,
                  py: 1.8,
                  borderRadius: '12px',
                  bgcolor: colors.indigo,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: `0 8px 20px ${alpha(colors.indigo, 0.25)}`,
                  '&:hover': { bgcolor: '#4f46e5', boxShadow: 'none' }
                }}
              >
                {loading ? "Creating Profile..." : "Initialize Account"}
              </Button>

              <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8', mt: 2 }}>
                Already a member?{" "}
                <span
                  style={{ color: colors.indigo, cursor: 'pointer', fontWeight: 800 }}
                  onClick={() => navigate("/")}
                >
                  Sign In
                </span>
              </Typography>
            </Stack>
          </Paper>
        </motion.div>
      </Container>

      <Box sx={{ position: 'fixed', bottom: 30, display: 'flex', alignItems: 'center', gap: 1, opacity: 0.5 }}>
        <ShowChartIcon sx={{ fontSize: 16, color: "#64748b" }} />
        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', letterSpacing: '2px' }}>
          SMARTHEALTH OS
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