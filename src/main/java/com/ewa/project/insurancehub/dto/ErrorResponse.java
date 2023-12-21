package com.ewa.project.insurancehub.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ErrorResponse {
    private String message;
    private LocalDateTime timeStamp;
    private String errDetails;
    public ErrorResponse() {
        // TODO Auto-generated constructor stub
    }
    public ErrorResponse(String message,String errDetails) {
        super();
        this.message = message;
        this.errDetails=errDetails;
        this.timeStamp=LocalDateTime.now();
    }
}
