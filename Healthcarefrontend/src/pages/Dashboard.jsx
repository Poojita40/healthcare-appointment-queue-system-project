import React, { useState, useEffect } from "react";
import {
  Grid, Typography, Box, Avatar, Container, Fade, Grow, Button, Chip, Paper, Stack, alpha
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'; // Better icon for Medical History
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from "../api/api";
import Chatbot from "./Chatbot";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    patients: 12, doctors: 1, appointments: 6,
    analytics: [3, 5, 4, 6, 3, 4, 12],
    activities: [
      { name: "G.Harisha", disease: "fever" },
      { name: "Arun", disease: "fever" },
      { name: "Raj", disease: "fever" },
      { name: "Raj", disease: "fever" },
      { name: "Vamshika", disease: "fever" }
    ]
  });

  useEffect(() => {
    api.get("/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching dashboard stats:", err));
  }, []);

  const today = "Thursday, April 2, 2026";

  const colors = {
    indigo: "#6366f1", emerald: "#10b981", amber: "#f59e0b",
    rose: "#f43f5e", violet: "#8b5cf6", cyan: "#06b6d4", slate: "#0f172a"
  };

  const chartData = stats.analytics.map((val, i) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    visits: val
  }));

  // SQUARE CARDS CONFIGURATION
  const actionCards = [
    { title: "Registration", icon: <AddCircleOutlineIcon />, path: "/book", color: colors.violet },
    { title: "Live Queue", icon: <ScheduleIcon />, path: "/queue", color: colors.rose },
    { title: "Medical History", icon: <HistoryEduIcon />, path: "/patients", color: colors.cyan },
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%', 
      minHeight: '100vh', 
      bgcolor: 'transparent', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Background Blobs */}
      <Box className="glass-blob" sx={{ top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'rgba(99, 102, 241, 0.15)' }} />
      <Box className="glass-blob" sx={{ bottom: '10%', right: '-5%', width: '30vw', height: '30vw', background: 'rgba(168, 85, 247, 0.15)', animationDelay: '-5s' }} />
      <Box className="glass-blob" sx={{ top: '40%', left: '20%', width: '20vw', height: '20vw', background: 'rgba(16, 185, 129, 0.1)', animationDelay: '-10s' }} />

      <Container maxWidth={false} sx={{ py: 6, px: { xs: 2, md: 8 }, position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, flexWrap: 'wrap', gap: 3 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar 
                component={motion.div}
                whileHover={{ rotate: 15, scale: 1.1 }}
                sx={{ 
                  bgcolor: colors.indigo, 
                  width: 64, 
                  height: 64, 
                  boxShadow: `0 12px 32px ${alpha(colors.indigo, 0.4)}`,
                  fontSize: '2rem'
                }}
              >
                <AdminPanelSettingsIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: colors.slate, letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Welcome, <span className="text-gradient">Administrator</span>
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeFilledIcon sx={{ fontSize: 18, color: colors.indigo }} /> {today}
                </Typography>
              </Box>
            </Stack>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/add-patient")}
              className="btn-premium"
              sx={{ 
                bgcolor: colors.indigo, 
                px: 5, 
                boxShadow: `0 12px 24px ${alpha(colors.indigo, 0.3)}`,
                '&:hover': { bgcolor: '#4f46e5' }
              }}
            >
              New Patient
            </Button>
          </Box>
        </motion.div>

        <Grid container spacing={5}>
          <Grid item xs={12} lg={8.5}>
            {/* STATS */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {[
                { label: "Total Patients", value: stats.patients, icon: <PeopleIcon />, color: colors.indigo },
                { label: "Active Doctors", value: stats.doctors, icon: <LocalHospitalIcon />, color: colors.emerald },
                { label: "Weekly Visits", value: stats.appointments, icon: <EventAvailableIcon />, color: colors.amber },
              ].map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <Box className="glass-card" sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: '20px', 
                        bgcolor: alpha(item.color, 0.1), 
                        color: item.color, 
                        width: 'fit-content', 
                        mb: 3,
                        display: 'flex',
                        boxShadow: `0 8px 16px ${alpha(item.color, 0.1)}`
                      }}>
                        {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
                      </Box>
                      <Typography variant="h2" sx={{ fontWeight: 900, color: colors.slate, mb: 0.5 }}>{item.value}</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* CHART */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Box className="glass-card" sx={{ p: 5, mb: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: colors.slate }}>Analytics Overview</Typography>
                  <Chip label="Live Updates" variant="outlined" sx={{ fontWeight: 700, borderRadius: '8px', color: colors.indigo, borderColor: alpha(colors.indigo, 0.3) }} />
                </Box>
                <Box sx={{ width: '100%', height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="pFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.indigo} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={colors.indigo} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha('#94a3b8', 0.1)} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '20px', 
                          border: 'none', 
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          backdropFilter: 'blur(10px)',
                          background: 'rgba(255,255,255,0.85)'
                        }} 
                      />
                      <Area type="monotone" dataKey="visits" stroke={colors.indigo} strokeWidth={6} fillOpacity={1} fill="url(#pFill)" dot={{ r: 6, fill: colors.indigo, strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* SIDEBAR */}
          <Grid item xs={12} lg={3.5}>
            <Stack spacing={5}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Box sx={{ p: 4, borderRadius: '32px', bgcolor: alpha(colors.rose, 0.05), border: `1px solid ${alpha(colors.rose, 0.1)}`, boxShadow: `0 20px 40px ${alpha(colors.rose, 0.05)}` }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: colors.rose, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <WarningAmberIcon /> Emergency Alerts
                  </Typography>
                  <Paper className="glass-card" sx={{ p: 3, borderLeft: `6px solid ${colors.rose}`, borderRadius: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Server Synchronization</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontWeight: 500 }}>New medical records pending sync from secondary center.</Typography>
                  </Paper>
                </Box>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <Box className="glass-card" sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Recent Activity</Typography>
                  <Stack spacing={3.5}>
                    {stats.activities.map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                        <Avatar sx={{ bgcolor: colors.indigo, width: 44, height: 44, fontWeight: 800 }}>{item.name[0]}</Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{item.name}</Typography>
                          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Diagnosed: {item.disease}</Typography>
                        </Box>
                        <Chip label="Active" size="small" sx={{ fontWeight: 800, bgcolor: alpha(colors.emerald, 0.1), color: colors.emerald, borderRadius: '8px' }} />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>

        {/* SYSTEM MANAGEMENT SECTION */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 900, color: colors.indigo, mb: 4, textTransform: 'uppercase', letterSpacing: '4px', textAlign: 'center' }}>
            System Intelligence Management
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {actionCards.map((card, index) => (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <motion.div
                   whileHover={{ y: -15 }}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Box
                    onClick={() => navigate(card.path)}
                    className="glass-card"
                    sx={{
                      p: 5,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      '&:hover': {
                        borderColor: card.color,
                        bgcolor: alpha(card.color, 0.03)
                      }
                    }}
                  >
                    <Box sx={{
                      p: 2.5,
                      borderRadius: '24px',
                      bgcolor: alpha(card.color, 0.15),
                      color: card.color,
                      mb: 3,
                      display: 'flex',
                      boxShadow: `0 12px 24px ${alpha(card.color, 0.15)}`
                    }}>
                      {React.cloneElement(card.icon, { sx: { fontSize: 44 } })}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: colors.slate }}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1, color: '#64748b', fontWeight: 600 }}>Access Central Data</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Chatbot />
    </Box>
  );
}

export default Dashboard;