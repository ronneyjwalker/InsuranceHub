package com.ewa.project.insurancehub.service;


import com.ewa.project.insurancehub.customexceptions.CustomerExceptionHandling;
import com.ewa.project.insurancehub.dto.AutomobilePolicyRequest;
import com.ewa.project.insurancehub.entity.AutomobilePolicy;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.Transaction;
import com.ewa.project.insurancehub.repository.AutomobilePolicyRepository;
import com.ewa.project.insurancehub.repository.CustomerRepository;
import com.ewa.project.insurancehub.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AutomobilePolicyService {

    @Autowired
    AutomobilePolicyRepository automobilePolicyRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    TransactionRepository transactionRepository;

    public AutomobilePolicyRequest createAutomobilePolicy(AutomobilePolicyRequest vPolicy, String username) {
        Customer customer = customerRepository.findByUsername(username).orElse(null);
        if (customer != null) {
            // Customer exists, create a new policy
            AutomobilePolicy newautomobilePolicy = new AutomobilePolicy();
            newautomobilePolicy.toBean(vPolicy);

            Transaction newTransaction = new Transaction();
            newTransaction.toBean(vPolicy);
            Transaction transaction = transactionRepository.save(newTransaction);

            newautomobilePolicy.setTransactionId(transaction.getTransactionID());
            AutomobilePolicy automobilePolicyData = automobilePolicyRepository.save(newautomobilePolicy);

            return automobilePolicyData.toBeanDto();
        } else {
            throw new CustomerExceptionHandling("Customer with username " + username + " not found.");
        }

    }
}
