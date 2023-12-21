package com.ewa.project.insurancehub.customexceptions;

@SuppressWarnings("serial")
public class UserExceptionHandling extends RuntimeException {
    public UserExceptionHandling(String mesg) {
        super(mesg);
    }
}
