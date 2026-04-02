package com.example.demo.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.service.QueueService;

@Service
public class ChatService {

    @Autowired
    private QueueService queueService;

    public String getResponse(String message) {

        message = message.toLowerCase();

        if (message.contains("hi") || message.contains("hello")) {
            return "Hello! How can I help you?";
        }

        if (message.contains("wait")) {

            int token = extractToken(message);

            if (token == -1) {
                return "Please provide your token number. Example: wait time for token 5";
            }

            int wait = queueService.getEstimatedWaitTime(token);

            return "Estimated wait time for token " + token + " is " + wait + " minutes.";
        }

        if (message.contains("doctor")) {
            return "Doctors are available from 9 AM to 5 PM.";
        }

        if (message.contains("book")) {
            return "To book appointment, please provide your details.";
        }

        return "Sorry, I didn’t understand. Try: wait time for token 5";
    }

    private int extractToken(String message) {

        String[] words = message.split(" ");

        for (String word : words) {
            if (word.matches("\\d+")) {
                return Integer.parseInt(word);
            }
        }

        return -1;
    }
}