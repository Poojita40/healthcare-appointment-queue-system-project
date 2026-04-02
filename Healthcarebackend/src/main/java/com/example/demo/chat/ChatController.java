package com.example.demo.chat;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

import com.example.demo.service.QueueService;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private QueueService queueService;

    // ✅ MULTI-USER STORAGE
    private Map<String, String> userSteps = new HashMap<>();
    private Map<String, String> userNames = new HashMap<>();

    @PostMapping
    public Map<String, Object> chat(@RequestBody Map<String, String> request) {

        String message = request.get("message");
        String sessionId = request.getOrDefault("sessionId", "default");

        Map<String, Object> response = new HashMap<>();

        try {
            String step = userSteps.getOrDefault(sessionId, "");

            // START BOOKING
            if (message.toLowerCase().contains("book")) {
                userSteps.put(sessionId, "ASK_NAME");
                response.put("reply", "What is your name?");
                return response;
            }

            // NAME STEP
            if (step.equals("ASK_NAME")) {
                userNames.put(sessionId, message);
                userSteps.put(sessionId, "ASK_EMAIL");
                response.put("reply", "Enter your email");
                return response;
            }

            // EMAIL STEP
            if (step.equals("ASK_EMAIL")) {

                String email = message;

                int token = queueService.generateToken();

                // ✅ SAFE EMAIL (NO CRASH)
                try {
                    queueService.addPatientAndNotify(email, token);
                } catch (Exception e) {
                    System.out.println("Email failed, but continuing...");
                }

                userSteps.remove(sessionId);
                userNames.remove(sessionId);

                response.put("reply", "✅ Appointment booked!\nToken: " + token + "\nEmail sent!");
                return response;
            }

            // OTHER FEATURES
            if (message.toLowerCase().contains("queue")) {
                int count = queueService.getWaitingCount();
                response.put("reply", "Current queue: " + count + " patients");
            } 
            else if (message.toLowerCase().contains("token")) {
                int token = queueService.generateToken();
                response.put("reply", "Your token number is: " + token);
            } 
            else {
                response.put("reply", "Say 'book appointment' to start 😊");
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.put("reply", "Something went wrong ❌");
        }

        return response;
    }
}