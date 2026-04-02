import {
  TextField,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl
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
      await api.post("/patients", patient);

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
    <PageContainer>

      <Typography variant="h5">Add Patient</Typography>

      <Stack spacing={2} marginTop={2}>

        <TextField
          label="Name"
          name="name"
          value={patient.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          value={patient.email}
          onChange={handleChange}
        />

        {/* ❌ PASSWORD REMOVED */}

        <TextField
          label="Phone"
          name="phone"
          value={patient.phone}
          onChange={handleChange}
        />

        <FormControl fullWidth>
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

        <TextField
          label="Address"
          name="address"
          value={patient.address}
          onChange={handleChange}
        />

        <TextField
          label="Disease"
          name="disease"
          value={patient.disease}
          onChange={handleChange}
        />

        {/* 🔥 TOKEN FIELD (IMPORTANT FOR EMAIL) */}
        <TextField
          label="Token Number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <Button variant="contained" onClick={submitPatient}>
          Add Patient
        </Button>

      </Stack>

    </PageContainer>
  );
}

export default AddPatient;