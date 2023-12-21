package com.ewa.project.insurancehub.repository;


import com.ewa.project.insurancehub.entity.AutomobilePolicy;
import com.ewa.project.insurancehub.entity.LifePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LifePolicyRepository extends JpaRepository<LifePolicy, Long> {

    List<LifePolicy> findAllByUsername(String username);

}
