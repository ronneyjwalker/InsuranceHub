package com.ewa.project.insurancehub.repository;

import java.util.Optional;


import com.ewa.project.insurancehub.entity.EnumUserType;
import com.ewa.project.insurancehub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Boolean existsByUsername(String username);


    Boolean existsByEmail(String email);



    Optional<User> findByUsername(String username);
    Optional<User> findByUsertype(EnumUserType usertype);



}