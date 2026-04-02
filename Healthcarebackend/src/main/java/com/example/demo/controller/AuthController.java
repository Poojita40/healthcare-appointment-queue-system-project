package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository usersRepository;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return usersRepository.save(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        User existingUser = usersRepository.findByEmail(user.getEmail());

        if(existingUser != null &&
           existingUser.getPassword().equals(user.getPassword())){

            return existingUser;

        }

        return null;
    }
}