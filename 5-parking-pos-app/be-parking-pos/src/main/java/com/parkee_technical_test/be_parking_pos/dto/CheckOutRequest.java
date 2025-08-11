package com.parkee_technical_test.be_parking_pos.dto;

import com.parkee_technical_test.be_parking_pos.model.PaymentType;

import lombok.Data;

@Data
public class CheckOutRequest {
    private String licensePlate;
    private PaymentType paymentType;
}
