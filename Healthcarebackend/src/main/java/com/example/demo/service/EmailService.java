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
            jakarta.mail.internet.MimeMessage mimeMessage = mailSender.createMimeMessage();
            org.springframework.mail.javamail.MimeMessageHelper helper = new org.springframework.mail.javamail.MimeMessageHelper(mimeMessage, "utf-8");

            helper.setFrom("poojitalakkakula@gmail.com", "Smart Health");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, false);

            mailSender.send(mimeMessage);

            System.out.println("✅ Email sent successfully!");

        } catch (Exception e) {
            System.out.println("❌ Email failed: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}