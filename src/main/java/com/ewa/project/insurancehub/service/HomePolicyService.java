package com.ewa.project.insurancehub.service;


import com.ewa.project.insurancehub.customexceptions.CustomerExceptionHandling;
import com.ewa.project.insurancehub.dto.HomePolicyRequest;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.HomePolicy;
import com.ewa.project.insurancehub.entity.Transaction;
import com.ewa.project.insurancehub.repository.CustomerRepository;
import com.ewa.project.insurancehub.repository.HomePolicyRepository;
import com.ewa.project.insurancehub.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomePolicyService {

    @Autowired
    HomePolicyRepository homePolicyRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    TransactionRepository transactionRepository;

    public HomePolicyRequest createHomePolicy(HomePolicyRequest homePolicy, String username) {

        Customer customer = customerRepository.findByUsername(username).orElse(null);
        if (customer != null) {
            // Customer exists, create a new policy
            HomePolicy newHomePolicy = new HomePolicy();
            newHomePolicy.toBean(homePolicy);

            Transaction newTransaction = new Transaction();
            newTransaction.toBean(homePolicy);
            Transaction transaction = transactionRepository.save(newTransaction);

            newHomePolicy.setTransactionId(transaction.getTransactionID());
            HomePolicy homePolicyData = homePolicyRepository.save(newHomePolicy);

            return homePolicyData.toBeanDto();
        } else {
            throw new CustomerExceptionHandling("Customer with username " + username + " not found.");
        }
    }
}
