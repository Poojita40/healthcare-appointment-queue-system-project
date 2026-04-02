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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/patients")
      .then(res => setPatients(res.data))
      .catch(() => {
        // Mock data for demonstration if API is unavailable
        setPatients([
          { id: 101, name: "John Doe", email: "john@example.com", phone: "9876543210", gender: "Male", disease: "Flu", status: "Active" },
          { id: 102, name: "Jane Smith", email: "jane@example.com", phone: "8765432109", gender: "Female", disease: "Covid-19", status: "Recovery" },
          { id: 103, name: "Alice Brown", email: "alice@example.com", phone: "7654321098", gender: "Female", disease: "Cold", status: "Waiting" },
        ]);
      });
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'success';
      case 'recovery': return 'info';
      case 'waiting': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={800}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Patient <span style={{ color: '#6366f1' }}>Database</span></Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Manage and monitor patient health records</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<PersonAddIcon />}
                onClick={() => navigate("/add-patient")}
                sx={{ bgcolor: '#6366f1', borderRadius: '12px', px: 3, fontWeight: 700, textTransform: 'none' }}
              >
                Register Patient
              </Button>
            </Box>

            <Box className="glass-card" sx={{ p: 4 }}>
              <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <TextField 
                  fullWidth
                  variant="outlined"
                  placeholder="Search patients by name, email, or disease..."
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
                      '&:hover fieldset': { borderColor: '#6366f1' },
                    }
                  }}
                />
              </Box>

              <TableContainer component={Box}>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b', py: 2 }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Contact Info</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Medical Record</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Status</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPatients.map((p) => (
                      <TableRow key={p.id} sx={{ '&:hover': { bgcolor: '#f8fafc' }, transition: '0.2s' }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#6366f110', color: '#6366f1', fontWeight: 800 }}>{p.name[0]}</Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{p.name}</Typography>
                              <Typography variant="caption" sx={{ color: '#94a3b8' }}>ID: #{p.id}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>{p.email}</Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>{p.phone}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label={p.disease} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 600 }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>{p.gender}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={p.status || 'Active'} 
                            variant="filled"
                            color={getStatusColor(p.status || 'Active')}
                            size="small"
                            sx={{ fontWeight: 700, px: 1 }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Details">
                            <IconButton size="small" sx={{ color: '#6366f1' }}><VisibilityIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ color: '#0ea5e9' }}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Archive">
                            <IconButton size="small" sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {filteredPatients.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="h6" sx={{ color: '#94a3b8' }}>No patients found matching "{searchTerm}"</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default PatientList;