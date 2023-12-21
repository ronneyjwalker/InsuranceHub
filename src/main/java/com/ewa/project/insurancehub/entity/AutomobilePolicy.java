package com.ewa.project.insurancehub.entity;

import com.ewa.project.insurancehub.dto.AutomobilePolicyRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "automobilePolicy")
@Getter
@Setter
public class AutomobilePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long automobilePolicyId;

    @Size(max = 100)
    private String automobileMake;

    @Size(max = 100)
    private String automobileModel;

    @Size(max = 50)
    private int automobileYear;

    @Size(max = 50)
    private String vin;

    @Size(max = 50)
    private String drivingLicenseNumber;

    @Enumerated
    @Size(max = 50)
    private AutomobileUsage automobileUsage; // i.e. personal, commercial

    private int mileage;

    @Size(max = 50)
    private String licensePlateNumber;

    private boolean safetyFeatures;

    private Long transactionId;

    @NotBlank
    @Size(max = 20)
    private String username;

    public AutomobilePolicy(){

    }

    public AutomobilePolicy(Long automobilePolicyId, String automobileMake, String automobileModel, int automobileYear, String vin, String drivingLicenseNumber, AutomobileUsage automobileUsage, int mileage, String licensePlateNumber, boolean safetyFeatures, String username) {
        this.automobilePolicyId = automobilePolicyId;
        this.automobileMake = automobileMake;
        this.automobileModel = automobileModel;
        this.automobileYear = automobileYear;
        this.vin = vin;
        this.drivingLicenseNumber = drivingLicenseNumber;
        this.automobileUsage = automobileUsage;
        this.mileage = mileage;
        this.licensePlateNumber = licensePlateNumber;
        this.safetyFeatures = safetyFeatures;
        this.username = username;
    }

    public AutomobilePolicy toBean(AutomobilePolicyRequest vPolicy) {

        this.automobileMake = vPolicy.getAutomobileMake();
        this.automobileModel = vPolicy.getAutomobileModel();
        this.automobileYear = vPolicy.getAutomobileYear();
        this.vin = vPolicy.getVin();
        this.drivingLicenseNumber = vPolicy.getDrivingLicenseNumber();
        this.automobileUsage = vPolicy.getAutomobileUsage();
        this.mileage = vPolicy.getMileage();
        this.licensePlateNumber = vPolicy.getLicensePlateNumber();
        this.safetyFeatures = vPolicy.isSafetyFeatures();
        this.username = vPolicy.getUsername();

        return this;

    }

    public AutomobilePolicyRequest toBeanDto(){

        AutomobilePolicyRequest vp = new AutomobilePolicyRequest(this.getAutomobileMake(),this.getAutomobileModel(),this.getAutomobileYear(),this.getVin(),this.getDrivingLicenseNumber(),this.getAutomobileUsage(),this.getMileage(),this.getLicensePlateNumber(),this.isSafetyFeatures(), this.getUsername());

        return vp;
    }


}
