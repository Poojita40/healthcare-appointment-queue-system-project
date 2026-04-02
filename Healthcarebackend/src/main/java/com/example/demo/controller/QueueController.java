package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.QueueService;

@RestController
@RequestMapping("/queue")
@CrossOrigin(origins = "*")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @PostMapping("/add")
    public String addPatient(
            @RequestParam String email,
            @RequestParam int token) {

        System.out.println("Adding patient: " + email + " Token: " + token);

        return queueService.addPatientAndNotify(email, token);
    }
}