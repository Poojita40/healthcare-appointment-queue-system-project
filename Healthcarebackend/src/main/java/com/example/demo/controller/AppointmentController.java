package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.demo.model.Appointment;
import com.example.demo.service.AppointmentService;
import com.example.demo.dto.AppointmentResponse;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // 🔹 Book Appointment (UPDATED WITH ERROR HANDLING)
    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam String problem) {

        try {
            Appointment appointment =
                    appointmentService.bookAppointment(patientId, doctorId, date, time, problem);

            AppointmentResponse response =
                    appointmentService.convertToResponse(appointment);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 🔹 Get All Appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    // 🔹 Get Doctor Queue
    @GetMapping("/queue")
    public ResponseEntity<List<Appointment>> getDoctorQueue(
            @RequestParam Long doctorId,
            @RequestParam String date) {

        return ResponseEntity.ok(
                appointmentService.getDoctorQueue(doctorId, date)
        );
    }

    // 🔹 Get Next Patient
    @GetMapping("/next")
    public ResponseEntity<?> getNextPatient(
            @RequestParam Long doctorId,
            @RequestParam String date) {

        try {
            return ResponseEntity.ok(
                    appointmentService.getNextPatient(doctorId, date)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ⭐ Cancel Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {

        String result = appointmentService.cancelAppointment(id);

        if (result.equals("Appointment not found")) {
            return ResponseEntity.status(404).body(result);
        }

        return ResponseEntity.ok(result);
    }

    // ⭐ Get Queue with Estimated Waiting Time
    @GetMapping("/waiting-time")
    public ResponseEntity<List<String>> getQueueWithWaitingTime(
            @RequestParam Long doctorId,
            @RequestParam String date) {

        return ResponseEntity.ok(
                appointmentService.getQueueWithWaitingTime(doctorId, date)
        );
    }
}