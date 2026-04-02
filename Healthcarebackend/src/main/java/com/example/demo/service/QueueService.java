package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueueService {

    private int avgTimePerPatient = 10;
    private int currentToken = 2;

    @Autowired
    private EmailService emailService;

    public int getEstimatedWaitTime(int tokenNumber) {

        if (tokenNumber <= currentToken) {
            return 0;
        }

        int patientsAhead = tokenNumber - currentToken;

        return patientsAhead * avgTimePerPatient;
    }

    public String addPatientAndNotify(String email, int tokenNumber) {

        int waitTime = getEstimatedWaitTime(tokenNumber);

        String subject = "Appointment Confirmed";

        String body = "Hello,\n\n"
                + "Your token number is: " + tokenNumber + "\n"
                + "Estimated wait time: " + waitTime + " minutes.\n\n"
                + "Please be ready.\n"
                + "Thank you.";

        try {
            emailService.sendEmail(email, subject, body);
            return "✅ Patient added & email sent!";
        } catch (Exception e) {
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