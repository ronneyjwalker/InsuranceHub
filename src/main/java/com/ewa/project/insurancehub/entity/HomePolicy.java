package com.ewa.project.insurancehub.entity;

import com.ewa.project.insurancehub.dto.AutomobilePolicyRequest;
import com.ewa.project.insurancehub.dto.HomePolicyRequest;
import com.ewa.project.insurancehub.repository.HomePolicyRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "homePolicy")
@Getter
@Setter
public class HomePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homePolicyId;

    @Size(max = 50)
    private String propertyType;

    private double estimatedPropertyValue;

    @Size(max = 150)
    private String leaseAgreementDetails;

    private boolean hasPets;

    @Size(max = 50)
    private String petDetails;

    private int numberOfOccupants;

    @Size(max = 100)
    private String propertyLocation;

    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private double squareFootage;


    private Long transactionId;

    @NotBlank
    @Size(max = 20)
    private String username;

    public HomePolicy() {

    }

    public HomePolicy(Long homePolicyId, String propertyType, double estimatedPropertyValue, String leaseAgreementDetails, boolean hasPets, String petDetails, int numberOfOccupants, String propertyLocation, int numberOfBedrooms, int numberOfBathrooms, double squareFootage, String username) {
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

    public HomePolicyRequest toBeanDto() {
        return new HomePolicyRequest(this.getHomePolicyId(), this.getPropertyType(), this.getEstimatedPropertyValue(), this.getLeaseAgreementDetails(), this.isHasPets(), this.getPetDetails(), this.getNumberOfOccupants(), this.getPropertyLocation(), this.getNumberOfBedrooms(), this.getNumberOfBathrooms(), this.getSquareFootage(), this.getUsername());
    }


    public HomePolicy toBean(HomePolicyRequest newHomePolicy) {
        this.homePolicyId = newHomePolicy.getHomePolicyId();
        this.propertyType = newHomePolicy.getPropertyType();
        this.estimatedPropertyValue = newHomePolicy.getEstimatedPropertyValue();
        this.leaseAgreementDetails = newHomePolicy.getLeaseAgreementDetails();
        this.hasPets = newHomePolicy.isHasPets();
        this.petDetails = newHomePolicy.getPetDetails();
        this.numberOfOccupants = newHomePolicy.getNumberOfOccupants();
        this.propertyLocation = newHomePolicy.getPropertyLocation();
        this.numberOfBedrooms = newHomePolicy.getNumberOfBedrooms();
        this.numberOfBathrooms = newHomePolicy.getNumberOfBathrooms();
        this.squareFootage = newHomePolicy.getSquareFootage();
        this.username = newHomePolicy.getUsername();

        return this;
    }

}
