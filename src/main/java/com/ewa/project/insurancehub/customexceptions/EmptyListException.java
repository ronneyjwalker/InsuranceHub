package com.ewa.project.insurancehub.customexceptions;

public class EmptyListException extends RuntimeException {
    public EmptyListException(String s) {
        super(s);
    }
}
