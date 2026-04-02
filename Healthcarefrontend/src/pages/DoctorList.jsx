import React, { useEffect, useState } from "react";
import api from "../api/api";
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  InputAdornment, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  IconButton, 
  Tooltip,
  Fade,
  Avatar,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EditIcon from "@mui/icons-material/Edit";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/doctors")
      .then(res => setDoctors(res.data))
      .catch(() => {
        // Mock data for demonstration
        setDoctors([
          { id: 1, name: "Dr. Gregory House", specialization: "Diagnostics", available: true },
          { id: 2, name: "Dr. Shaun Murphy", specialization: "Surgery", available: true },
          { id: 3, name: "Dr. Lisa Cuddy", specialization: "Endocrinology", available: false },
        ]);
      });
  }, []);

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={800}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Medical <span style={{ color: '#10b981' }}>Directory</span></Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Global roster of healthcare professionals</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<LocalHospitalIcon />}
                onClick={() => navigate("/add-doctor")}
                sx={{ bgcolor: '#10b981', borderRadius: '12px', px: 3, fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#059669' } }}
              >
                Add Specialist
              </Button>
            </Box>

            <Box className="glass-card" sx={{ p: 4 }}>
              <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <TextField 
                  fullWidth
                  variant="outlined"
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    maxWidth: 500,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover fieldset': { borderColor: '#10b981' },
                    }
                  }}
                />
              </Box>

              <TableContainer component={Box}>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b', py: 2 }}>Specialist</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Specialization</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Availability</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDoctors.map((d) => (
                      <TableRow key={d.id} sx={{ '&:hover': { bgcolor: '#f8fafc' }, transition: '0.2s' }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#10b98110', color: '#10b981', fontWeight: 800 }}>{d.name.split(' ').pop()[0]}</Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{d.name}</Typography>
                              <Typography variant="caption" sx={{ color: '#94a3b8' }}>NPI: #{d.id + 1000}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={d.specialization} size="small" sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 700, border: '1px solid #bbf7d0' }} />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={d.available ? "Available" : "In Meeting"} 
                            color={d.available ? "success" : "warning"}
                            size="small"
                            variant="filled"
                            sx={{ fontWeight: 700 }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Schedule">
                            <IconButton size="small" sx={{ color: '#6366f1' }}><DateRangeIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Profile">
                            <IconButton size="small" sx={{ color: '#10b981' }}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default DoctorList;