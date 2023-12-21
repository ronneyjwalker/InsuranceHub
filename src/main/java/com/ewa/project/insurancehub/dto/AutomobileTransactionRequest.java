package com.ewa.project.insurancehub.dto;

import com.ewa.project.insurancehub.entity.AutomobileUsage;
import com.ewa.project.insurancehub.entity.Customer;
import lombok.Getter;
import lombok.Setter;
import com.ewa.project.insurancehub.entity.AutomobilePolicy;
import com.ewa.project.insurancehub.entity.Transaction;

import java.util.Date;

@Getter
@Setter
public class AutomobileTransactionRequest {

    private Long automobilePolicyId;
    private String vehicleMake;
    private String vehicleModel;
    private int vehicleYear;
    private String vin;
    private String drivingLicenseNumber;
    private AutomobileUsage automobileUsage;
    private int mileage;
    private String licensePlateNumber;
    private boolean safetyFeatures;
    private Date date;
    private String paymentAmt;
    private String paymentMethod;
    private int policyID;
    private Customer mappingCust;

    public AutomobileTransactionRequest(Long automobilePolicyId, String vehicleMake, String vehicleModel, int vehicleYear, String vin, String drivingLicenseNumber, int mileage, String licensePlateNumber, boolean safteyFeatures, Date date,String paymentAmt, String paymentMethod, int policyID)
    {
        this.automobilePolicyId = automobilePolicyId;
        this.vehicleMake = vehicleMake;
        this.vehicleModel = vehicleModel;
        this.vehicleYear = vehicleYear;
        this.vin = vin;
        this.drivingLicenseNumber = drivingLicenseNumber;
        this.mileage = mileage;
        this.licensePlateNumber = licensePlateNumber;
        this.safetyFeatures = safetyFeatures;
        this.date = date;
        this.paymentAmt = paymentAmt;
        this.paymentMethod = paymentMethod;
        this.policyID = policyID;
        this.mappingCust = mappingCust;
    }




    }



