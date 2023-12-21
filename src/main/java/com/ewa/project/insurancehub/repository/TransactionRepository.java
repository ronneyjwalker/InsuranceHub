package com.ewa.project.insurancehub.repository;


import com.ewa.project.insurancehub.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Override
    List<Transaction> findAll();

    List<Transaction> findAllByUsername(String username);
}
