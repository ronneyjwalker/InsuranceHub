package com.ewa.project.insurancehub.entity;


import com.ewa.project.insurancehub.dto.UserRegisterRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "Users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 120)
    private String password;


    @Enumerated(EnumType.STRING)
    @Size(max = 50)
    private EnumUserType usertype;

    public User() {
    }

    public User(String  username,String email, String password) {
        this.username=username;
        this.email = email;
        this.password = password;

    }
    public User toBean(UserRegisterRequest user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.usertype= user.getUsertype();

        return this;

    }

    public UserRegisterRequest toBeanDto() {
        UserRegisterRequest urr = new UserRegisterRequest(this.getUsername(), this.getEmail(), this.getPassword());
        return urr;
    }


}
