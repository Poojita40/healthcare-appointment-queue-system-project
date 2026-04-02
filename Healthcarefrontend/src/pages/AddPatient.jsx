import {
  TextField,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid
} from "@mui/material";

import { useState } from "react";
import api from "../api/api";
import { addPatient as sendEmail } from "../api/api"; // 🔥 email API
import PageContainer from "../components/PageContainer";

function AddPatient() {

  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    disease: ""
  });

  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const submitPatient = async () => {

    if (!token) {
      alert("Please enter token number");
      return;
    }

    try {
      // ✅ Save patient (your existing API)
      await api.post("/api/patients", patient);

      // 🔥 Send email (NEW)
      await sendEmail(patient.email, token);

      alert("Patient Added & Email Sent Successfully");

      // reset form
      setPatient({
        name: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        disease: ""
      });
      setToken("");

    } catch (error) {
      console.error(error);
      alert("Error occurred");
    }
  };

  return (
    <PageContainer 
      title="Register New Patient" 
      subtitle="Complete the form below to add a patient to the healthcare system."
    >
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              sx={premiumInputStyle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={patient.email}
              onChange={handleChange}
              sx={premiumInputStyle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={patient.phone}
              onChange={handleChange}
              sx={premiumInputStyle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={premiumInputStyle}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={patient.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={patient.address}
              onChange={handleChange}
              sx={premiumInputStyle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Disease / Chief Complaint"
              name="disease"
              value={patient.disease}
              onChange={handleChange}
              sx={premiumInputStyle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Token Number"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              sx={premiumInputStyle}
            />
          </Grid>
        </Grid>

        <Button 
          variant="contained" 
          onClick={submitPatient}
          className="btn-premium"
          sx={{ 
            mt: 4, 
            bgcolor: '#6366f1', 
            py: 2, 
            fontSize: '1rem',
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
          }}
        >
          Add Patient & Call Queue
        </Button>
      </Stack>
    </PageContainer>
  );
}

const premiumInputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: '#fff',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#cbd5e1' },
    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' }
};

export default AddPatient;