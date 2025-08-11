package com.parkee_technical_test.be_parking_pos.dto;

import com.parkee_technical_test.be_parking_pos.model.VehicleType;

import lombok.Data;

@Data
public class CheckInRequest {
    private String licensePlate;
    private VehicleType vehicleType;
}
