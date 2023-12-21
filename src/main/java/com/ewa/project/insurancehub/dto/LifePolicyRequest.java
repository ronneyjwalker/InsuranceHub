package com.ewa.project.insurancehub.dto;


import com.ewa.project.insurancehub.entity.BloodGroup;
import com.ewa.project.insurancehub.entity.Customer;
import com.ewa.project.insurancehub.entity.Employment;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LifePolicyRequest {

    private Employment employement;


    private Double height;


    private Double weight;

    private BloodGroup bloodGroup;

    private int dependent;

    private Double annualIncome;

//    private String otherSourceOfIncome;

    private String healthHistory;

//    private String familyMedicalHistory;

//    private String existingInsuranceDetails;

    private boolean smoking;

    private Date date;

    private double paymentAmount;

    private String paymentMethod;

    private String username;

    public LifePolicyRequest() {

    }

    public LifePolicyRequest(Employment employement, Double height, Double weight, BloodGroup bloodGroup, int dependent, Double annualIncome, String healthHistory, boolean smoking, String username) {
        this.employement = employement;
        this.height = height;
        this.weight = weight;
        this.bloodGroup = bloodGroup;
        this.dependent = dependent;
        this.annualIncome = annualIncome;
//        this.otherSourceOfIncome = otherSourceOfIncome;
        this.healthHistory = healthHistory;
//        this.familyMedicalHistory = familyMedicalHistory;
//        this.existingInsuranceDetails = existingInsuranceDetails;
        this.smoking = smoking;
        this.username = username;
    }

//    public HealthPolicyRequest(Employment employement, Double height, Double weight, BloodGroup bloodGroup, int dependent, Double annualIncome, String otherSourceOfIncome, String healthHistory, String familyMedicalHistory, String existingInsuranceDetails, boolean smoking, Date date, double paymentAmount, String paymentMethod, Customer customer) {
    public LifePolicyRequest(Employment employement, Double height, Double weight, BloodGroup bloodGroup, int dependent, Double annualIncome, String healthHistory, boolean smoking, Date date, double paymentAmount, String paymentMethod) {
        this.employement = employement;
        this.height = height;
        this.weight = weight;
        this.bloodGroup = bloodGroup;
        this.dependent = dependent;
        this.annualIncome = annualIncome;
//        this.otherSourceOfIncome = otherSourceOfIncome;
        this.healthHistory = healthHistory;
//        this.familyMedicalHistory = familyMedicalHistory;
//        this.existingInsuranceDetails = existingInsuranceDetails;
        this.smoking = smoking;
        this.date = date;
        this.paymentAmount = paymentAmount;
        this.paymentMethod = paymentMethod;
//        this.customer= customer;
    }

}
