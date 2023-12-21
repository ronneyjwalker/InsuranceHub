package com.ewa.project.insurancehub.controller;


import com.ewa.project.insurancehub.dto.UserRegisterRequest;
import com.ewa.project.insurancehub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<UserRegisterRequest>createUser(@RequestBody UserRegisterRequest user){

        return ResponseEntity.ok(userService.createUser(user));

    }

//    @GetMapping("/login")
//    public

}
