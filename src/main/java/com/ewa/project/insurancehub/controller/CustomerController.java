package com.ewa.project.insurancehub.controller;


import com.ewa.project.insurancehub.customexceptions.CustomerExceptionHandling;
import com.ewa.project.insurancehub.dto.AutomobilePolicyRequest;
import com.ewa.project.insurancehub.dto.HomePolicyRequest;
import com.ewa.project.insurancehub.dto.LifePolicyRequest;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.Transaction;
import com.ewa.project.insurancehub.entity.User;
import com.ewa.project.insurancehub.repository.UserRepository;
import com.ewa.project.insurancehub.service.AutomobilePolicyService;
import com.ewa.project.insurancehub.service.CustomerService;
import com.ewa.project.insurancehub.service.HomePolicyService;
import com.ewa.project.insurancehub.service.LifePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LifePolicyService lifePolicyService;

    @Autowired
    AutomobilePolicyService automobilePolicyService;

    @Autowired
    HomePolicyService homePolicyService;

    @GetMapping("/{username}")
    public ResponseEntity<Map<String, Object>> getCustomerDetails (@PathVariable String username) {
        Customer cust = customerService.getCustomerDetails(username);
        User user = userRepository.findByUsername(username).orElse(null);
        if (Objects.isNull(cust)) {
            throw new CustomerExceptionHandling("Customer details for "+ username + " not found");
        }

        Map<String, Object> customerDetails = new HashMap<String, Object>();
        customerDetails.put("customer", cust);
        customerDetails.put("user", user);
        return ResponseEntity.ok(customerDetails);
    }

    @PostMapping("/lifepolicy/{username}")
    public ResponseEntity<LifePolicyRequest>createLifePolicy(@PathVariable String username, @RequestBody LifePolicyRequest hPolicy){

        return ResponseEntity.ok(lifePolicyService.createLifePolicy(hPolicy, username));

    }

    @PostMapping("/automobilepolicy/{username}")
    public ResponseEntity<AutomobilePolicyRequest>createAutomobilePolicy(@PathVariable String username, @RequestBody AutomobilePolicyRequest vPolicy){

        return ResponseEntity.ok(automobilePolicyService.createAutomobilePolicy(vPolicy, username));

    }

    @PostMapping("/homepolicy/{username}")
    public ResponseEntity<HomePolicyRequest>createHomePolicy(@PathVariable String username, @RequestBody HomePolicyRequest homePolicy){

        return ResponseEntity.ok(homePolicyService.createHomePolicy(homePolicy, username));

    }


    @GetMapping("/transactions/{username}")
    public ResponseEntity<List<Transaction>> getCustomerTransactions(@PathVariable String username) {
        return ResponseEntity.ok(customerService.getCustomerTransaction(username));
    }

    @GetMapping("/policies/{username}")
    public ResponseEntity<Map<String, List<?>>> getCustomerPolicies(@PathVariable String username) {
        return ResponseEntity.ok(customerService.getCustomerPolicies(username));
    }

}
