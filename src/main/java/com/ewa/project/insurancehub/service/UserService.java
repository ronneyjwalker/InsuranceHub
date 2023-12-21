package com.ewa.project.insurancehub.service;


import com.ewa.project.insurancehub.customexceptions.UserDatabaseExceptionHandling;
import com.ewa.project.insurancehub.dto.UserRegisterRequest;
import com.ewa.project.insurancehub.entity.Administrator;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.EnumUserType;
import com.ewa.project.insurancehub.entity.User;
import com.ewa.project.insurancehub.repository.AdministratorRepository;
import com.ewa.project.insurancehub.repository.CustomerRepository;
import com.ewa.project.insurancehub.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CustomerRepository customerRepo;
    @Autowired
    private AdministratorRepository administratorRepository;

    public UserRegisterRequest createUser(UserRegisterRequest user) {
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new UserDatabaseExceptionHandling("User with the given username or email already exists");
        }


        User newUser = new User();
        Customer newCustomer = new Customer();
        Administrator newAdmin = new Administrator();
        newCustomer = newCustomer.toBean(user);
        newUser = newUser.toBean(user);
        newAdmin = newAdmin.toBean(user);
        User userData = userRepository.save(newUser);
        if (newUser.getUsertype() == EnumUserType.CUSTOMER) {
//            newCustomer.setUser(userRepository.findByUsername(user.getUsername()).get());
//            newCustomer.setUser(userData);
            customerRepo.save(newCustomer);

        } else if (newUser.getUsertype() == EnumUserType.ADMIN) {
            administratorRepository.save(newAdmin);

        }

        return user.toBeanDto(user);

    }

    public User findUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }
}
