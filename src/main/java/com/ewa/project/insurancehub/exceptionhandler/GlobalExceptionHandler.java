package com.ewa.project.insurancehub.exceptionhandler;


import com.ewa.project.insurancehub.customexceptions.*;
import com.ewa.project.insurancehub.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(CustomerExceptionHandling.class) //can be array of  exception within ({})
    public ResponseEntity<?> handleCustomerException(CustomerExceptionHandling e) {
        System.out.println("in customer hand exc " + e);
        return new ResponseEntity<>(new ErrorResponse("Customer Not Found", e.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyListException.class)
    public ResponseEntity<?> handleEmptyListException(EmptyListException e) {
        return new ResponseEntity<>(new ErrorResponse("Empty List", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AdministratorExceptionHandling.class) //can be array of  exception within ({})
    public ResponseEntity<?> handleAdminException(AdministratorExceptionHandling e) {
        System.out.println("in admin hand exc " + e);
        return new ResponseEntity<>(new ErrorResponse("Admin Not Found", e.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UserExceptionHandling.class, UserDatabaseExceptionHandling.class})
    public ResponseEntity<?> handleMultipleExceptions(Exception e) {
        if (e instanceof UserExceptionHandling) {
            System.out.println("in user hand exc " + e);
            return new ResponseEntity<>(new ErrorResponse("User Authentication Failed", e.getMessage()), HttpStatus.UNAUTHORIZED);
        } else if (e instanceof UserDatabaseExceptionHandling) {
            return new ResponseEntity<>(new ErrorResponse("User Database Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(new ErrorResponse("Unknown Error", "An unknown error occurred."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @ExceptionHandler(PatientDetailsHandlingException.class)
//    public ResponseEntity<?> handleAccountHandlingException(PatientDetailsHandlingException e) {
//        return new ResponseEntity<>(new ErrorResponse("Account Authentication Failed", e.getMessage()),
//                HttpStatus.UNAUTHORIZED);
//    }
//
//    @ExceptionHandler(PharmacyDetailsHandlingException.class)
//    public ResponseEntity<?> handleAccountHandlingException(PharmacyDetailsHandlingException e) {
//        return new ResponseEntity<>(new ErrorResponse("Account Authentication Failed", e.getMessage()),
//                HttpStatus.UNAUTHORIZED);
//    }
//    @ExceptionHandler(HospitalHandlingException.class)
//    public ResponseEntity<?> handleAccountHandlingException(HospitalHandlingException e) {
//        return new ResponseEntity<>(new ErrorResponse("Account Authentication Failed", e.getMessage()),
//                HttpStatus.UNAUTHORIZED);
//    }
//    @ExceptionHandler(AdminHandlingException.class)
//    public ResponseEntity<?> handleAccountHandlingException(AdminHandlingException e) {
//        return new ResponseEntity<>(new ErrorResponse("Account Authentication Failed", e.getMessage()),
//                HttpStatus.UNAUTHORIZED);
//    }
//    @ExceptionHandler(MaxUploadSizeExceededException.class)
//    public ResponseEntity<ResponseMessage> handleMaxSizeException(MaxUploadSizeExceededException exc) {
//        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("File too large!"));
//    }

}
