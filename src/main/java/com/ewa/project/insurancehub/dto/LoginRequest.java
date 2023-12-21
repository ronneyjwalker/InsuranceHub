package com.ewa.project.insurancehub.dto;


import com.ewa.project.insurancehub.entity.EnumUserType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String username;

    private String password;

    private EnumUserType usertype;
}
