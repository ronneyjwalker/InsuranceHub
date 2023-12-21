package com.ewa.project.insurancehub.service;

import com.ewa.project.insurancehub.entity.Administrator;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.EnumUserType;
import com.ewa.project.insurancehub.entity.User;
import com.ewa.project.insurancehub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdministratorService {

    @Autowired
    AdministratorRepository administratorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    HomePolicyRepository homePolicyRepository;

    @Autowired
    LifePolicyRepository lifePolicyRepository;

    @Autowired
    AutomobilePolicyRepository automobilePolicyRepository;

    public Administrator getAdminDetails(String username) {
        return administratorRepository.findByUsername(username).get();
    }

    public String deleteUser(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Customer with given id does not exist"));
        if (user.getUsertype().equals(EnumUserType.CUSTOMER)) {
            Customer deleteCust = customerRepository.findByUsername(username).get();
            customerRepository.delete(deleteCust);
            userRepository.delete(user);
        }
        return "User Deleted";

    }

    public List<Administrator> getAllAdmins() {
        return administratorRepository.findAll();
    }

    public Map<String, List<?>> getAllPolicies() {
            Map<String, List<?>> policies = new HashMap<>();

            List<?> homePolicies = homePolicyRepository.findAll();
            List<?> automobilePolicies = automobilePolicyRepository.findAll();
            List<?> lifePolicies = lifePolicyRepository.findAll();

            policies.put("home", homePolicies);
            policies.put("auto", automobilePolicies);
            policies.put("life", lifePolicies);

            return policies;
    }
}
