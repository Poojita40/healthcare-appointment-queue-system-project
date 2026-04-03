package com.example.demo;

import com.example.demo.model.Appointment;
import com.example.demo.model.Doctor;
import com.example.demo.model.Patient;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Ensure Doctor exists
        Doctor doctor = doctorRepository.findAll().stream().findFirst().orElseGet(() -> {
            Doctor newDoctor = new Doctor();
            newDoctor.setName("Dr. Smith");
            newDoctor.setSpecialization("General Physician");
            newDoctor.setAvailable(true);
            return doctorRepository.save(newDoctor);
        });

        // 2. Check if we already have seeded data (to avoid duplicates on restart)
        if (patientRepository.count() > 5) {
            System.out.println("Data already seeded. Skipping...");
            return;
        }

        System.out.println("Seeding 30 patients and appointments...");

        String todayDate = "2026-04-03";

        String[] names = {
            "Liam Smith", "Emma Johnson", "Noah Williams", "Olivia Brown", "James Jones",
            "Ava Garcia", "Robert Miller", "Sophia Davis", "Michael Rodriguez", "Isabella Martinez",
            "William Hernandez", "Mia Lopez", "David Gonzalez", "Charlotte Wilson", "Richard Anderson",
            "Amelia Thomas", "Joseph Taylor", "Evelyn Moore", "Thomas Jackson", "Abigail Martin",
            "Charles Lee", "Harper Perez", "Christopher Thompson", "Emily White", "Daniel Harris",
            "Elizabeth Sanchez", "Matthew Clark", "Sofia Ramirez", "Anthony Lewis", "Avery Robinson"
        };

        for (int i = 0; i < 30; i++) {
            // Create Patient
            Patient patient = new Patient();
            patient.setName(names[i]);
            patient.setEmail("patient" + (i + 1) + "@example.com");
            patient.setPhone("98765432" + String.format("%02d", i + 1));
            patient.setPassword("password" + (i + 1));
            patient.setGender(i % 2 == 0 ? "Male" : "Female");
            patient.setAddress("Street " + (i + 1) + ", City");
            patient.setDisease("Symptom " + (i + 1));
            patient = patientRepository.save(patient);

            // Create Appointment
            Appointment appointment = new Appointment();
            appointment.setPatient(patient);
            appointment.setDoctor(doctor);
            appointment.setAppointmentDate(todayDate);
            appointment.setAppointmentTime(String.format("%02d:00", (9 + (i / 4)) % 24));
            appointment.setProblem("Consultation for " + patient.getDisease());
            appointment.setQueueNumber(i + 1);
            appointment.setStatus("BOOKED");
            appointmentRepository.save(appointment);
        }

        System.out.println("Successfully seeded 30 patients and appointments.");
    }
}
