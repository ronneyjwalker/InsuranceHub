package com.ewa.project.insurancehub.repository;

import com.ewa.project.insurancehub.entity.AutomobilePolicy;
import com.ewa.project.insurancehub.entity.HomePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomePolicyRepository extends JpaRepository<HomePolicy, Long> {

    List<HomePolicy> findAllByUsername(String username);
}
