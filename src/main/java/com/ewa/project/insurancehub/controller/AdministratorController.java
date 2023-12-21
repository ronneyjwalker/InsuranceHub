package com.ewa.project.insurancehub.controller;

import com.ewa.project.insurancehub.customexceptions.AdministratorExceptionHandling;
import com.ewa.project.insurancehub.customexceptions.EmptyListException;
import com.ewa.project.insurancehub.dto.UserRegisterRequest;
import com.ewa.project.insurancehub.entity.Administrator;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.service.AdministratorService;
import com.ewa.project.insurancehub.service.CustomerService;
import com.ewa.project.insurancehub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdministratorController {

    @Autowired
    AdministratorService adminService;


    @GetMapping("/{username}")
    ResponseEntity<Administrator> getAdminDetails(@PathVariable String username) {
        Administrator admin = adminService.getAdminDetails(username);

        if (Objects.isNull(admin)) {
            throw new AdministratorExceptionHandling("Admin details for "+ username + " not found");
        }

        return ResponseEntity.ok(admin);
    }

    @Autowired
    CustomerService customerService;
    @GetMapping("/customers")
    ResponseEntity<List<Customer>> getAllCustomer() {
        List<Customer> customer = customerService.getAllCustomer();
        if (customer.isEmpty()) {
            throw new EmptyListException("Customer list is empty");
        }
        return ResponseEntity.ok(customer);

    }

    @GetMapping("/admins")
    ResponseEntity<List<Administrator>> getAllAdmins() {
        List<Administrator> admins = adminService.getAllAdmins();
        if (admins.isEmpty()) {
            throw new EmptyListException("Customer list is empty");
        }
        return ResponseEntity.ok(admins);

    }

    @Autowired
    UserService userService;
    @PostMapping("/create")
    public ResponseEntity<UserRegisterRequest> createUser(@RequestBody UserRegisterRequest user) {

        return ResponseEntity.ok(userService.createUser(user));

    }


    @DeleteMapping("/user/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username){

        if (Objects.isNull(username)){
          throw new AdministratorExceptionHandling("User details for "+ username + " not found");
        }
        return ResponseEntity.ok(adminService.deleteUser(username));
    }

    @DeleteMapping("/customer/{username}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String username){

        if (Objects.isNull(username)){
            throw new AdministratorExceptionHandling("User details for "+ username + " not found");
        }
        return ResponseEntity.ok(adminService.deleteUser(username));
    }

    @GetMapping("/policies")
    public ResponseEntity<Map<String, List<?>>> getAllPolicies() {
        return ResponseEntity.ok(adminService.getAllPolicies());
    }


}
