import React, { useEffect, useState } from "react";
import api from "../api/api";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Chip, 
  Button, 
  Avatar, 
  Stack, 
  IconButton,
  Tooltip,
  Fade,
  Divider,
  LinearProgress
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function ViewQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 10000); // Poll every 10s for "live" feel
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = () => {
    api.get("/appointments")
      .then(res => {
        setQueue(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Mock data for demo
        setQueue([
          { id: 1, patientName: "John Doe", doctorName: "Dr. House", status: "In Consultation", waitTime: "0 min" },
          { id: 2, patientName: "Jane Smith", doctorName: "Dr. Murphy", status: "Waiting", waitTime: "15 min" },
          { id: 3, patientName: "Alice Brown", doctorName: "Dr. House", status: "Waiting", waitTime: "30 min" },
          { id: 4, patientName: "Bob Wilson", doctorName: "Dr. Murphy", status: "Waiting", waitTime: "45 min" },
        ]);
        setLoading(false);
      });
  };

  const updateStatus = (id, newStatus) => {
    // API call logic would go here
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const currentPatient = queue.find(p => p.status === "In Consultation");
  const waitingPatients = queue.filter(p => p.status === "Waiting");

  return (
    <Box sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Live Queue <span style={{ color: '#6366f1' }}>Manager</span></Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 6, fontWeight: 500 }}>Monitor and coordinate patient flow in real-time</Typography>

        <Grid container spacing={4}>
          {/* LEFT: Current Consultation */}
          <Grid item xs={12} lg={5}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsActiveIcon sx={{ color: '#ef4444' }} /> Now In Consultation
            </Typography>
            <Paper className="glass-card" sx={{ p: 4, bgcolor: '#fff', border: '1px solid #eef2ff' }}>
              {currentPatient ? (
                <Fade in={true}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                      <Avatar sx={{ width: 80, height: 80, bgcolor: '#6366f1', fontSize: '2rem', fontWeight: 800 }}>
                        {currentPatient.patientName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>{currentPatient.patientName}</Typography>
                        <Chip label={`Assigned to ${currentPatient.doctorName}`} color="primary" variant="outlined" sx={{ mt: 1, fontWeight: 700 }} />
                      </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 2 }}>Consultation Progress</Typography>
                    <LinearProgress variant="determinate" value={45} sx={{ height: 10, borderRadius: 5, mb: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#6366f1' } }} />
                    <Stack direction="row" spacing={2}>
                      <Button 
                        fullWidth variant="contained" 
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => updateStatus(currentPatient.id, "Completed")}
                        sx={{ bgcolor: '#10b981', borderRadius: '12px', py: 1.5, fontWeight: 700, '&:hover': { bgcolor: '#059669' } }}
                      >
                        Finish Session
                      </Button>
                      <IconButton sx={{ bgcolor: '#f1f5f9', borderRadius: '12px', p: 1.5 }}><CancelIcon sx={{ color: '#ef4444' }} /></IconButton>
                    </Stack>
                  </Box>
                </Fade>
              ) : (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#94a3b8' }}>No active consultation. Call next patient.</Typography>
                  <Button variant="outlined" sx={{ mt: 3, borderRadius: '12px', fontWeight: 700 }}>Call Next</Button>
                </Box>
              )}
            </Paper>
            
            <Box className="glass-card" sx={{ mt: 4, p: 3, bgcolor: '#f8fafc' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>Quick Stats</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>AVG WAIT TIME</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>18 min</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>PATIENTS WAITING</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{waitingPatients.length}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* RIGHT: Waiting List */}
          <Grid item xs={12} lg={7}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Upcoming Queue List</Typography>
            <Stack spacing={2}>
              {waitingPatients.map((p, index) => (
                <Fade in={true} timeout={500 + index * 100} key={p.id}>
                  <Paper 
                    className="glass-card" 
                    sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: index === 0 ? '6px solid #6366f1' : '1px solid transparent' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        {index + 1}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{p.patientName}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 14 }} /> {p.waitTime} wait
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>DOCTOR</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{p.doctorName}</Typography>
                      </Box>
                      <Button 
                        variant="contained" 
                        size="small"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => updateStatus(p.id, "In Consultation")}
                        sx={{ bgcolor: '#6366f1', borderRadius: '8px', fontWeight: 700, textTransform: 'none' }}
                      >
                        Call
                      </Button>
                    </Box>
                  </Paper>
                </Fade>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ViewQueue;