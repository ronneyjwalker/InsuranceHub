package com.ewa.project.insurancehub.entity;

import com.ewa.project.insurancehub.dto.LifePolicyRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "lifePolicy")
@Getter
@Setter
public class LifePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long healthPolicyId;

    @Enumerated(EnumType.STRING)
    private Employment employement;

    @Size (max = 50)
    private Double height;

    @Size
    private Double weight;

    @Enumerated(EnumType.STRING)
    private BloodGroup bloodGroup;

    @Size (max = 5)
    private int dependent;

    @Size (max = 50)
    private Double annualIncome;

//    @Size (max = 100)
//    private String otherSourceOfIncome;

    @Size (max = 50)
    private String healthHistory;

//    @Size (max = 100)
//    private String familyMedicalHistory;

//    @Size (max = 100)
//    private String existingInsuranceDetails;

    private boolean smoking;

    private Long transactionId;

    @NotBlank
    @Size(max = 20)
    private String username;

    public LifePolicy(){

    }

    public LifePolicy(Long healthPolicyId, Employment employement, Double height, Double weight, BloodGroup bloodGroup, int dependent, Double annualIncome, String otherSourceOfIncome, String healthHistory, String familyMedicalHistory, String existingInsuranceDetails, boolean smoking, String username) {
        this.healthPolicyId = healthPolicyId;
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

    public LifePolicy toBean(LifePolicyRequest hPolicy) {

        this.employement = hPolicy.getEmployement();
        this.height = hPolicy.getHeight();
        this.weight = hPolicy.getWeight();
        this.bloodGroup = hPolicy.getBloodGroup();
        this.dependent = hPolicy.getDependent();
        this.annualIncome = hPolicy.getAnnualIncome();
//        this.otherSourceOfIncome = hPolicy.getOtherSourceOfIncome();
        this.healthHistory = hPolicy.getHealthHistory();
//        this.familyMedicalHistory = hPolicy.getFamilyMedicalHistory();
//        this.existingInsuranceDetails = hPolicy.getExistingInsuranceDetails();
        this.smoking = hPolicy.isSmoking();
        this.username = hPolicy.getUsername();

        return this;

    }

    public LifePolicyRequest toBeanDto() {

        LifePolicyRequest hp = new LifePolicyRequest(this.getEmployement(), this.getHeight(), this.getWeight(), this.getBloodGroup(), this.getDependent(), this.getAnnualIncome(), this.getHealthHistory(), this.isSmoking(), this.getUsername());

        return hp;
    }

}
