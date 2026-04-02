package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    // ✅ Add Patient
    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    // ✅ Get All Patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // ✅ Get Patient By ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    // ✅ Update Patient
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
                                 @RequestBody Patient updatedPatient) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patient.setName(updatedPatient.getName());
        patient.setEmail(updatedPatient.getEmail());
        patient.setPhone(updatedPatient.getPhone());
        patient.setGender(updatedPatient.getGender());
        patient.setAddress(updatedPatient.getAddress());
        patient.setDisease(updatedPatient.getDisease());

        return patientRepository.save(patient);
    }

    // ✅ Delete Patient
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patientRepository.delete(patient);
        return "Patient deleted successfully";
    }
}