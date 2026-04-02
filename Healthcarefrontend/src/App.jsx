import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import AddDoctor from "./pages/AddDoctor";
import BookAppointment from "./pages/BookAppointment";
import ViewQueue from "./pages/ViewQueue";
import WaitingTime from "./pages/WaitingTime";
import QueueStatus from "./pages/QueueStatus";

import PatientList from "./pages/PatientList";
import DoctorList from "./pages/DoctorList";
import AppointmentList from "./pages/AppointmentList";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";

import Chatbot from "./pages/Chatbot";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function AnimatedRoutes() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/patient-login" ||
    location.pathname === "/patient-dashboard" ||
    location.pathname === "/queue-status";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ minHeight: "100vh" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/queue" element={<ViewQueue />} />
            <Route path="/waiting" element={<WaitingTime />} />
            <Route path="/queue-status" element={<QueueStatus />} />
            <Route path="/patient-login" element={<PatientLogin />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { borderRadius: '14px', background: '#333', color: '#fff', fontSize: '14px', padding: '12px 20px' } 
        }} 
      />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;