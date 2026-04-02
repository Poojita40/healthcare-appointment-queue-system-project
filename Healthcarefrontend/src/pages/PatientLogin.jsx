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
import {  } from "framer-motion";
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
        "https://healthcare-backend-api-vnfk.onrender.com/patients/login",
        { id, password }
      );

      if (res.data) {
        localStorage.setItem("patientId", res.data.id);
        toast.success(
          `Welcome back, ${res.data.name || "Patient"}. Accessing Records...`
        );
        setTimeout(() => navigate("/patient-dashboard"), 1200);
      }
    } catch (error) {
      console.error(error);
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
        bgcolor: "#fff"
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          bgcolor: alpha("#ec4899", 0.3)
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <Paper
          elevation={0}
          sx={{
            width: { xs: "92vw", sm: 440 },
            p: { xs: 4, sm: 8 },
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(32px)"
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#ec4899",
              width: 80,
              height: 80,
              mb: 3,
              mx: "auto"
            }}
          >
            <Heart />
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            Patient Portal
          </Typography>

          <Stack spacing={3} mt={3}>
            <TextField
              fullWidth
              label="Patient Account ID"
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserCircle />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Security Pin"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                )
              }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              sx={{ bgcolor: "#ec4899", height: 50 }}
              endIcon={<ArrowRight />}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>

            <Button
              variant="text"
              startIcon={<ArrowLeft />}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </Stack>
        </Paper>
      </motion.div>

      <Box sx={{ position: "fixed", bottom: 20, display: "flex", gap: 1 }}>
        <Stethoscope />
        <Typography variant="caption">PATIENT HUB</Typography>
      </Box>
    </Box>
  );
}

export default PatientLogin;