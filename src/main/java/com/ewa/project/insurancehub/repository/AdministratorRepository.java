package com.ewa.project.insurancehub.repository;

import com.ewa.project.insurancehub.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {

    Optional<Administrator> findByUsername(String username);
}
