package com.ewa.project.insurancehub.entity;

import com.ewa.project.insurancehub.dto.UserRegisterRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Customer")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerID;

    @NotBlank
    @Size(max = 50)
    private String customerFname;

    @NotBlank
    @Size(max = 50)
    private String customerLname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotBlank
    @Size(max = 120)
    private String customerAddress;

    @NotBlank
    @Size(max = 20)
    private String phoneNumber;

//    @NotBlank
//    @Size(max = 10)
//    private String dob;

    @NotBlank
    @Size(max = 20)
    private String username;

    public Customer(Long customerID, String customerFname, String customerLname, Gender gender, String customerAddress, String username) {
        this.customerID = customerID;
        this.customerFname = customerFname;
        this.customerLname = customerLname;
        this.gender = gender;
        this.customerAddress = customerAddress;
        this.username = username;
    }

    public Customer() {

    }

    public Customer toBean(UserRegisterRequest user) {

        this.username = user.getUsername();
        this.customerFname = user.getFirstName();
        this.customerLname = user.getLastName();
        this.customerAddress = user.getAddress();
        this.gender = user.getGender();
        this.phoneNumber = user.getPhoneNumber();
        return this;
    }
}
