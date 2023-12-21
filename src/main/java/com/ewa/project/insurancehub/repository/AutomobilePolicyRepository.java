package com.ewa.project.insurancehub.repository;


import com.ewa.project.insurancehub.entity.AutomobilePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AutomobilePolicyRepository extends JpaRepository<AutomobilePolicy, Long> {

    List<AutomobilePolicy> findAllByUsername(String username);
}
