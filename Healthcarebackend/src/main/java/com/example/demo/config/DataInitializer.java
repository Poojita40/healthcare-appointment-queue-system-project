package com.example.demo.config;

import com.example.demo.model.Doctor;
import com.example.demo.repository.DoctorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(DoctorRepository doctorRepository) {
        return args -> {
            if (doctorRepository.count() == 0) {
                System.out.println("No doctors found. Initializing default doctor catalog...");
                
                Doctor doc1 = new Doctor();
                doc1.setName("Dr. Sarah Johnson");
                doc1.setSpecialization("Cardiology");
                
                Doctor doc2 = new Doctor();
                doc2.setName("Dr. Michael Chen");
                doc2.setSpecialization("Pediatrics");
                
                Doctor doc3 = new Doctor();
                doc3.setName("Dr. Emily Davis");
                doc3.setSpecialization("Orthopedics");
                
                Doctor doc4 = new Doctor();
                doc4.setName("Dr. James Wilson");
                doc4.setSpecialization("General Medicine");
                
                Doctor doc5 = new Doctor();
                doc5.setName("Dr. Robert Brown");
                doc5.setSpecialization("Dermatology");
                
                doctorRepository.saveAll(List.of(doc1, doc2, doc3, doc4, doc5));
                System.out.println("Default doctor catalog initialized successfully!");
            } else {
                System.out.println("Doctors already exist in the database. Skipping initialization.");
            }
        };
    }
}
