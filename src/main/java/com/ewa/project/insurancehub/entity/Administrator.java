package com.ewa.project.insurancehub.entity;

import com.ewa.project.insurancehub.dto.UserRegisterRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Administrator")
@Getter
@Setter
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminID;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    private String adminFname;

    @NotBlank
    @Size(max = 50)
    private String adminLname;

    @NotBlank
    @Size(max = 120)
    private String adminAddress;

    public Administrator(){

    }

    public Administrator(Long adminID, String username, String adminFname, String adminLname, String adminAddress) {
        this.adminID = adminID;
        this.username = username;
        this.adminFname = adminFname;
        this.adminLname = adminLname;
        this.adminAddress = adminAddress;

    }
    public Administrator toBean(UserRegisterRequest user) {

        this.username = user.getUsername();
        this.adminFname = user.getFirstName();
        this.adminLname = user.getLastName();
        this.adminAddress = user.getAddress();


        return this;
    }


}
