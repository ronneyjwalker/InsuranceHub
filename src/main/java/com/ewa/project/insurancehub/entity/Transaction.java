package com.ewa.project.insurancehub.entity;



import com.ewa.project.insurancehub.dto.AutomobilePolicyRequest;
import com.ewa.project.insurancehub.dto.HomePolicyRequest;
import com.ewa.project.insurancehub.dto.LifePolicyRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "Transaction")
@Getter
@Setter
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionID;

    @NotBlank
    @Size(max = 50)
    private Date date;

    @NotBlank
    @Size(max = 50)
    private double paymentAmt;

    @NotBlank
    @Size(max = 120)
    private String paymentMethod;

    @NotBlank
    @Size(max = 20)
   private String username;

    public Transaction(){

    }

    public Transaction(Long transactionID, Date date, double paymentAmt, String paymentMethod) {
        this.transactionID = transactionID;
        this.date = date;
        this.paymentAmt = paymentAmt;
        this.paymentMethod = paymentMethod;

    }

    public Transaction toBean(LifePolicyRequest hPolicy) {

        this.date = hPolicy.getDate();
        this.paymentAmt = hPolicy.getPaymentAmount();
        this.paymentMethod = hPolicy.getPaymentMethod();
        this.username = hPolicy.getUsername();
        return this;

    }

    public Transaction toBean(AutomobilePolicyRequest vPolicy) {

        this.date = vPolicy.getDate();
        this.paymentAmt = vPolicy.getPaymentAmount();
        this.paymentMethod = vPolicy.getPaymentMethod();
        this.username = vPolicy.getUsername();
           return this;

    }


    public Transaction toBean(HomePolicyRequest homePolicy) {
        this.date = homePolicy.getDate();
        this.paymentAmt = homePolicy.getPaymentAmount();
        this.paymentMethod = homePolicy.getPaymentMethod();
        this.username = homePolicy.getUsername();
        return this;
    }
}
