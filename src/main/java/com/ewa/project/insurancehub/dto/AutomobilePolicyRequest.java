package com.ewa.project.insurancehub.dto;


import com.ewa.project.insurancehub.entity.AutomobileUsage;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AutomobilePolicyRequest {



        private String automobileMake;

        private String automobileModel;

        private int automobileYear;

        private String vin;

        private String drivingLicenseNumber;

        private AutomobileUsage automobileUsage;

        private int mileage;

        private String licensePlateNumber;

        private boolean safetyFeatures;

        private Date date;

        private double paymentAmount;

        private String paymentMethod;

        private String username;

//        private Customer customer;

        public AutomobilePolicyRequest(String automobileMake, String automobileModel, int automobileYear, String vin, String drivingLicenseNumber, AutomobileUsage automobileUsage, int mileage, String licensePlateNumber, boolean safetyFeatures, String username) {
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
}
