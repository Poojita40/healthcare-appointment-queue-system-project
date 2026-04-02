package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, String appointmentDate);

    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            Long doctorId, String appointmentDate, String appointmentTime);

    // ✅ NEW: prevent duplicate patient booking
    boolean existsByPatientIdAndDoctorIdAndAppointmentDateAndAppointmentTime(
            Long patientId, Long doctorId, String appointmentDate, String appointmentTime);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByPatientPhone(String phone);

    List<Appointment> findByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
            Long doctorId, String appointmentDate);

    Appointment findFirstByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
            Long doctorId, String appointmentDate);
}