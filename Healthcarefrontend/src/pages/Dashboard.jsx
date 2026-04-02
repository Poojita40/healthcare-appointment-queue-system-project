import React, { useState, useEffect } from "react";
import {
  Grid, Typography, Box, Avatar, Container, Fade, Grow, Button, Chip, Paper, Stack, alpha
} from "@mui/material";

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
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 6 } }}>

        {/* HEADER */}
        <Fade in timeout={800}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: colors.indigo, width: 50, height: 50, boxShadow: `0 8px 20px ${alpha(colors.indigo, 0.3)}` }}>
                <AdminPanelSettingsIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: colors.slate, letterSpacing: '-0.5px' }}>
                  Welcome, <span style={{ color: colors.indigo }}>Administrator</span>
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeFilledIcon sx={{ fontSize: 16 }} /> {today}
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/add-patient")}
              sx={{ bgcolor: colors.indigo, borderRadius: '12px', px: 4, py: 1.8, fontWeight: 700, textTransform: 'none', boxShadow: `0 8px 16px ${alpha(colors.indigo, 0.2)}`, '&:hover': { bgcolor: '#4f46e5' } }}
            >
              New Patient
            </Button>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8.5}>
            {/* STATS */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { label: "Total Patients", value: stats.patients, icon: <PeopleIcon />, color: colors.indigo },
                { label: "Active Doctors", value: stats.doctors, icon: <LocalHospitalIcon />, color: colors.emerald },
                { label: "Weekly Visits", value: stats.appointments, icon: <EventAvailableIcon />, color: colors.amber },
              ].map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Grow in timeout={1000 + (index * 200)}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #eef2f6', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                      <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: alpha(item.color, 0.1), color: item.color, width: 'fit-content', mb: 2 }}>
                        {React.cloneElement(item.icon, { sx: { fontSize: 30 } })}
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: colors.slate }}>{item.value}</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{item.label}</Typography>
                    </Paper>
                  </Grow>
                </Grid>
              ))}
            </Grid>

            {/* CHART */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #eef2f6', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Analytics Overview</Typography>
              <Box sx={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="pFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.indigo} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={colors.indigo} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }} />
                    <Area type="monotone" dataKey="visits" stroke={colors.indigo} strokeWidth={4} fillOpacity={1} fill="url(#pFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* SIDEBAR */}
          <Grid item xs={12} lg={3.5}>
            <Stack spacing={4}>
              <Box sx={{ p: 3, borderRadius: '24px', bgcolor: alpha(colors.rose, 0.03), border: `1px solid ${alpha(colors.rose, 0.1)}` }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: colors.rose, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningAmberIcon sx={{ fontSize: 22 }} /> Alerts
                </Typography>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: '16px', borderLeft: `5px solid ${colors.rose}` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Emergency Sync</Typography>
                  <Typography variant="body2" color="textSecondary">Updates pending.</Typography>
                </Paper>
              </Box>

              <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #eef2f6' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Live Activity</Typography>
                <Stack spacing={3}>
                  {stats.activities.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: colors.slate, width: 40, height: 40 }}>{item.name[0]}</Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{item.disease}</Typography>
                      </Box>
                      <Chip label="New" size="small" sx={{ fontWeight: 700, bgcolor: alpha(colors.emerald, 0.1), color: colors.emerald }} />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        {/* SQUARE MANAGEMENT CARDS SECTION */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#64748b', mb: 3, textTransform: 'uppercase', letterSpacing: '2px' }}>
            System Management
          </Typography>
          <Grid container spacing={3}>
            {actionCards.map((card, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Paper
                  elevation={0}
                  onClick={() => navigate(card.path)}
                  sx={{
                    aspectRatio: '1/1', // FORCES SQUARE SHAPE
                    p: 3,
                    borderRadius: '32px',
                    border: '1px solid #eef2f6',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      borderColor: card.color,
                      boxShadow: `0 20px 40px ${alpha(card.color, 0.15)}`,
                      bgcolor: alpha(card.color, 0.02)
                    }
                  }}
                >
                  <Box sx={{
                    p: 2,
                    borderRadius: '20px',
                    bgcolor: alpha(card.color, 0.1),
                    color: card.color,
                    mb: 2,
                    display: 'flex'
                  }}>
                    {React.cloneElement(card.icon, { sx: { fontSize: 36 } })}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: colors.slate, lineHeight: 1.2 }}>
                    {card.title}
                  </Typography>
                </Paper>
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