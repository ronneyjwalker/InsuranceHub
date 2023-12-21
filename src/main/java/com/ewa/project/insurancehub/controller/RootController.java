package com.ewa.project.insurancehub.controller;


import com.ewa.project.insurancehub.customexceptions.UserExceptionHandling;
import com.ewa.project.insurancehub.dto.LoginRequest;
import com.ewa.project.insurancehub.entity.User;
import com.ewa.project.insurancehub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class RootController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userService.findUser(loginRequest.getUsername());
        if (Objects.isNull(user)) {
            throw new UserExceptionHandling("User" + loginRequest.getUsername() + "not found");
        }

        if (loginRequest.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
