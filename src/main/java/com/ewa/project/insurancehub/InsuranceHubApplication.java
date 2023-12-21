package com.ewa.project.insurancehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class InsuranceHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(InsuranceHubApplication.class, args);
    }

}
