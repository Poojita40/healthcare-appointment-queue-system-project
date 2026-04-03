package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueueService {

    private int avgTimePerPatient = 10;
    private int currentToken = 2;

    @Autowired
    private EmailService emailService;

    @Autowired
    private com.example.demo.repository.PatientRepository patientRepository;

    @Autowired
    private com.example.demo.repository.DoctorRepository doctorRepository;

    @Autowired
    private com.example.demo.repository.AppointmentRepository appointmentRepository;

    public int getEstimatedWaitTime(int tokenNumber) {

        if (tokenNumber <= currentToken) {
            return 0;
        }

        int patientsAhead = tokenNumber - currentToken;

        return patientsAhead * avgTimePerPatient;
    }

    public String addPatientAndNotify(String name, String email, int tokenNumber) {

        int waitTime = getEstimatedWaitTime(tokenNumber);

        // ✅ Save Patient to DB (checking if exists by email first if possible, otherwise use random phone)
        com.example.demo.model.Patient patient = patientRepository.findByEmail(email);
        if (patient == null) {
            patient = new com.example.demo.model.Patient();
            patient.setName(name);
            patient.setEmail(email);
            patient.setPhone(String.valueOf(System.currentTimeMillis())); // Unique phone
            patient.setDisease("General Consultation");
            patient = patientRepository.save(patient);
        }

        // ✅ Save Appointment to DB
        java.time.LocalDate today = java.time.LocalDate.now();
        com.example.demo.model.Doctor doctor = doctorRepository.findById(1L).orElse(null);
        
        com.example.demo.model.Appointment appointment = new com.example.demo.model.Appointment();
        appointment.setPatient(patient);
        if (doctor != null) {
            appointment.setDoctor(doctor);
        }
        appointment.setAppointmentDate(today.toString());
        java.time.LocalTime time = java.time.LocalTime.now();
        appointment.setAppointmentTime(time.toString());
        appointment.setProblem("Booked via chat");
        appointment.setQueueNumber(tokenNumber);
        appointment.setStatus("BOOKED");
        appointmentRepository.save(appointment);

        String subject = "Appointment Confirmed";

        String body = "Hello " + name + ",\n\n"
                + "Your token number is: " + tokenNumber + "\n"
                + "Estimated wait time: " + waitTime + " minutes.\n\n"
                + "Please be ready.\n"
                + "Thank you.";

        try {
            emailService.sendEmail(email, subject, body);
            return "✅ Patient added & email sent!";
        } catch (Exception e) {
            System.err.println("Email error: " + e.getMessage());
            return "⚠️ Patient added but email failed";
        }
    }

    public int getWaitingCount() {
        return currentToken;
    }

    public int generateToken() {
        currentToken++;
        return currentToken;
    }
}