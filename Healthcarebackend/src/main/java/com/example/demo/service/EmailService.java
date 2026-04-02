package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {

        System.out.println("📩 Sending email to: " + toEmail);

        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("poojitalakkakula@gmail.com"); // 🔥 VERY IMPORTANT
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            System.out.println("✅ Email sent successfully!");

        } catch (Exception e) {
            System.out.println("❌ Email failed: " + e.getMessage());
            throw e;
        }
    }
}