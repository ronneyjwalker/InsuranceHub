package com.ewa.project.insurancehub.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
public class HomePolicyRequest {
    private Long homePolicyId;


    private String propertyType;

    private double estimatedPropertyValue;


    private String leaseAgreementDetails;

    private boolean hasPets;


    private String petDetails;

    private int numberOfOccupants;


    private String propertyLocation;

    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private double squareFootage;

    private Date date;

    private double paymentAmount;

    private String paymentMethod;

    private String username;

    public HomePolicyRequest(Long homePolicyId, String propertyType, double estimatedPropertyValue, String leaseAgreementDetails, boolean hasPets, String petDetails, int numberOfOccupants, String propertyLocation, int numberOfBedrooms, int numberOfBathrooms, double squareFootage, String username) {
        this.homePolicyId = homePolicyId;
        this.propertyType = propertyType;
        this.estimatedPropertyValue = estimatedPropertyValue;
        this.leaseAgreementDetails = leaseAgreementDetails;
        this.hasPets = hasPets;
        this.petDetails = petDetails;
        this.numberOfOccupants = numberOfOccupants;
        this.propertyLocation = propertyLocation;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.squareFootage = squareFootage;
        this.username = username;
    }
}
