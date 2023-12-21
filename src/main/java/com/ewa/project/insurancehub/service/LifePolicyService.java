package com.ewa.project.insurancehub.service;


import com.ewa.project.insurancehub.customexceptions.CustomerExceptionHandling;
import com.ewa.project.insurancehub.dto.LifePolicyRequest;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.LifePolicy;
import com.ewa.project.insurancehub.entity.Transaction;
import com.ewa.project.insurancehub.repository.CustomerRepository;
import com.ewa.project.insurancehub.repository.LifePolicyRepository;
import com.ewa.project.insurancehub.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LifePolicyService {

    @Autowired
    LifePolicyRepository lifePolicyRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    TransactionRepository transactionRepository;

    public LifePolicyRequest createLifePolicy(LifePolicyRequest hPolicy, String username) {

        Customer customer = customerRepository.findByUsername(username).orElse(null);

        if (customer != null) {

            LifePolicy newLifePolicy = new LifePolicy();
            newLifePolicy.toBean(hPolicy);

            Transaction newTransaction = new Transaction();
            newTransaction.toBean(hPolicy);
            Transaction transaction = transactionRepository.save(newTransaction);

            newLifePolicy.setTransactionId(transaction.getTransactionID());
            LifePolicy LifePolicyData = lifePolicyRepository.save(newLifePolicy);

            return LifePolicyData.toBeanDto();
        } else {
            throw new CustomerExceptionHandling("Customer with username " + username + " not found.");
        }



    }
}
