package com.ewa.project.insurancehub.service;

import com.ewa.project.insurancehub.customexceptions.CustomerExceptionHandling;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.HomePolicy;
import com.ewa.project.insurancehub.entity.Transaction;
import com.ewa.project.insurancehub.entity.User;
import com.ewa.project.insurancehub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    HomePolicyRepository homePolicyRepository;

    @Autowired
    LifePolicyRepository lifePolicyRepository;

    @Autowired
    AutomobilePolicyRepository automobilePolicyRepository;

    public Customer getCustomerDetails(String username) {
        Optional<Customer> customer = customerRepository.findByUsername(username);
        if(customer.isEmpty()) {
            throw new CustomerExceptionHandling("Customer not found");
        }
        return customer.get();
    }

    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    public List<Transaction> getCustomerTransaction(String username) {
        Customer customer = customerRepository.findByUsername(username).orElse(null);
        if (customer != null) {
            return transactionRepository.findAllByUsername(username);
        } else {
            throw new CustomerExceptionHandling("Customer with username " + username + " not found.");
        }
    }

    public Map<String, List<?>> getCustomerPolicies(String username) {
        Customer customer = customerRepository.findByUsername(username).orElse(null);
        if (customer != null) {
            Map<String, List<?>> policies = new HashMap<>();

            List<?> homePolicies = homePolicyRepository.findAllByUsername(username);
            List<?> automobilePolicies = automobilePolicyRepository.findAllByUsername(username);
            List<?> lifePolicies = lifePolicyRepository.findAllByUsername(username);

            policies.put("home", homePolicies);
            policies.put("auto", automobilePolicies);
            policies.put("life", lifePolicies);

            return policies;
        } else {
            throw new CustomerExceptionHandling("Customer with username " + username + " not found.");
        }
    }
}
