package com.ewa.project.insurancehub.dto;



import com.ewa.project.insurancehub.entity.EnumUserType;
import com.ewa.project.insurancehub.entity.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class UserRegisterRequest {

    private String username;
    private String password;
    private String email;
    private EnumUserType usertype;
    private String firstName;
    private String lastName;
    private String address;
    private Gender gender;
    private String dob;
    private String phoneNumber;


    public UserRegisterRequest() {

    }

    public UserRegisterRequest(String username, String password, String email) {

        super();
        this.username = username;
        this.password = password;
        this.email = email;

    }

    public UserRegisterRequest(String username, String password, String email, EnumUserType usertype, String firstName, String lastName, String address, String phoneNumber) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
        this.usertype = usertype;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public UserRegisterRequest toBeanDto(UserRegisterRequest user) {

        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.address = user.getAddress();
        this.gender = user.getGender();
        this.usertype = user.getUsertype();
        this.phoneNumber = user.getPhoneNumber();
        this.dob = user.getDob();

        return this;


    }

}