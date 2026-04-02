import React, { useEffect, useState } from "react";
import api from "../api/api";
import { 
  Box, 
  Typography, 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Button, 
  Fade,
  Avatar,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";
import { toast } from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    api.get("/api/appointments")
      .then(res => setAppointments(res.data))
      .catch(() => {
        // Mock data
        setAppointments([
          { id: 1, patient: { name: "John Doe" }, doctor: { name: "Dr. House" }, appointmentDate: "2026-04-05", appointmentTime: "10:30", queueNumber: "A1", status: "Confirmed" },
          { id: 2, patient: { name: "Jane Smith" }, doctor: { name: "Dr. Murphy" }, appointmentDate: "2026-04-05", appointmentTime: "11:15", queueNumber: "A2", status: "Pending" },
        ]);
      });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const cancelAppointment = (id) => {
    api.delete(`/api/appointments/${id}`)
      .then(() => {
        toast.success("Appointment cancelled successfully");
        loadAppointments();
      })
      .catch(() => {
        toast.error("Failed to cancel appointment");
        // Mock remove for demo
        setAppointments(prev => prev.filter(a => a.id !== id));
      });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'info';
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={800}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Appointment <span style={{ color: '#8b5cf6' }}>Scheduler</span></Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Global view of all scheduled medical consultations</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<EventRepeatIcon />}
                  sx={{ borderRadius: '12px', px: 3, fontWeight: 700, textTransform: 'none' }}
                >
                  Reschedule
                </Button>
              </Box>
            </Box>

            <Box className="glass-card" sx={{ p: 4 }}>
              <TableContainer component={Box}>
                <Table sx={{ minWidth: 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b', py: 2 }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Assigned Doctor</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Date & Time</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Queue #</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Status</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((a) => (
                      <TableRow key={a.id} sx={{ '&:hover': { bgcolor: '#f8fafc' }, transition: '0.2s' }}>
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: '#8b5cf610', color: '#8b5cf6', fontWeight: 700 }}>{a.patient.name[0]}</Avatar>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{a.patient.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{a.doctor.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
                              <CalendarTodayIcon sx={{ fontSize: 14 }} /> {a.appointmentDate}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
                              <AccessTimeIcon sx={{ fontSize: 14 }} /> {a.appointmentTime}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={a.queueNumber} size="small" sx={{ fontWeight: 800, bgcolor: '#f1f5f9' }} />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={a.status} 
                            color={getStatusColor(a.status)} 
                            size="small" 
                            variant="filled" 
                            sx={{ fontWeight: 700, minWidth: 80 }} 
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Cancel Appointment">
                            <IconButton 
                              onClick={() => cancelAppointment(a.id)}
                              sx={{ color: '#ef4444', bgcolor: '#fef2f2', '&:hover': { bgcolor: '#fee2e2' } }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {appointments.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="h6" sx={{ color: '#94a3b8' }}>No appointments scheduled</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default AppointmentList;