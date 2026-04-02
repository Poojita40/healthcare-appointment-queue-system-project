package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Patient;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByPhone(String phone);
    Patient findByEmail(String email);

    // Fetches the last 5 patients added to the database
    List<Patient> findTop5ByOrderByIdDesc();
}