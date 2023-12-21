package com.ewa.project.insurancehub.repository;


import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUsername(String username);

    void deleteCustomerByUsername(String username);
}
