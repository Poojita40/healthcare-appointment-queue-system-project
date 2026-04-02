package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.QueueService;
import com.example.demo.service.AppointmentService;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/add")
    public String addPatient(
            @RequestParam String email,
            @RequestParam int token) {

        System.out.println("Adding patient: " + email + " Token: " + token);

        return queueService.addPatientAndNotify(email, token);
    }

    // ✅ Get Queue Status by Phone
    @GetMapping("/{phone}")
    public java.util.Map<String, Object> getQueueStatusByPhone(@PathVariable String phone) {
        return appointmentService.getPatientQueueStatusByPhone(phone);
    }
}