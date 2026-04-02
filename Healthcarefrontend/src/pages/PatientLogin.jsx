import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Avatar,
  Paper,
  Stack,
  IconButton,
  alpha
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  UserCircle, 
  Key, 
  Eye, 
  EyeOff, 
  Heart, 
  Stethoscope,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

function PatientLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !password) {
      toast.error("Enter ID & Access Key");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8081/patients/login",
        { id, password }
      );
      
      if (res.data) {
        localStorage.setItem("patientId", res.data.id);
        toast.success(`Welcome back, ${res.data.name || 'Patient'}. Accessing Records...`);
        setTimeout(() => navigate("/patient-dashboard"), 1200);
      }
    } catch (error) {
      toast.error("Access Denied. Verify Credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        bgcolor: '#fff'
      }}
    >
      {/* Warm Patient Theme Background Blobs */}
      <Box className="glass-blob" sx={{ top: '15%', left: '10%', width: 400, height: 400, bgcolor: alpha('#ec4899', 0.3) }} />
      <Box className="glass-blob" sx={{ bottom: '10%', right: '15%', width: 350, height: 350, bgcolor: alpha('#f43f5e', 0.25), animationDelay: '-12s' }} />
      <Box className="glass-blob" sx={{ top: '50%', right: '5%', width: 250, height: 250, bgcolor: alpha('#f59e0b', 0.2), animationDelay: '-6s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <Paper
          className="glass-card"
          elevation={0}
          sx={{
            width: { xs: '92vw', sm: 440 },
            p: { xs: 4, sm: 8 },
            textAlign: "center",
            position: 'relative',
            zIndex: 1,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(32px) saturate(200%)'
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ display: 'inline-block' }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: '#ec4899', 
                  width: 80, 
                  height: 80, 
                  mb: 3, 
                  mx: 'auto',
                  boxShadow: '0 12px 32px rgba(236, 72, 153, 0.3)'
                }}
              >
                <Heart size={40} fill="white" />
              </Avatar>
            </motion.div>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#1e293b', mb: 1, letterSpacing: '-2.5px' }}>
              Patient<span style={{ color: '#ec4899' }}>Portal</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: '1px' }}>
              YOUR PERSONAL HEALTH CABIN
            </Typography>
          </Box>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Patient Account ID"
              type="number"
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserCircle size={22} color="#ec4899" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: '#fff' },
                  '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.1)' }
                }
              }}
            />

            <TextField
              fullWidth
              label="Security Pin"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key size={22} color="#ec4899" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: '#fff' },
                  '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.1)' }
                }
              }}
            />

            <Button
              className="btn-premium"
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              sx={{ 
                mt: 3, 
                bgcolor: '#ec4899',
                height: 64,
                fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(236, 72, 153, 0.25)',
                '&:hover': { bgcolor: '#db2777' }
              }}
              endIcon={!loading && <ArrowRight size={22} />}
            >
              {loading ? "Authenticating..." : "Open Health Cabin"}
            </Button>

            <Box sx={{ pt: 3 }}>
              <Button
                variant="text"
                startIcon={<ArrowLeft size={16} />}
                onClick={() => navigate("/")}
                sx={{ 
                  color: '#94a3b8', 
                  fontWeight: 700, 
                  textTransform: 'none',
                  '&:hover': { color: '#6366f1', bgcolor: 'transparent' }
                }}
              >
                Go to Administrator Gateway
              </Button>
            </Box>
          </Stack>
        </Paper>
      </motion.div>

      {/* Subtle Bottom Branding */}
      <Box sx={{ position: 'fixed', bottom: 30, display: 'flex', alignItems: 'center', gap: 1.5, opacity: 0.6 }}>
        <Stethoscope size={18} color="#ec4899" />
        <Typography variant="caption" sx={{ fontWeight: 900, color: '#1e293b', letterSpacing: '2.5px' }}>
          PATIENT HUB V2.0
        </Typography>
      </Box>
    </Box>
  );
}

export default PatientLogin;