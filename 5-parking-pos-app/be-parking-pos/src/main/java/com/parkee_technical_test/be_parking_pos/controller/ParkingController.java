package com.parkee_technical_test.be_parking_pos.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkee_technical_test.be_parking_pos.dto.CheckInRequest;
import com.parkee_technical_test.be_parking_pos.model.ParkingTicket;
import com.parkee_technical_test.be_parking_pos.service.ParkingService;

@RestController
@RequestMapping("/api/tickets")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @PostMapping("/check-in")
    public ResponseEntity<?> checkIn(@RequestBody CheckInRequest body) {
        Optional<ParkingTicket> newTicket = parkingService.checkIn(body.getLicensePlate());

        if (newTicket.isPresent()) {
            return new ResponseEntity<>(newTicket.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Nomor plat " + body.getLicensePlate() + " sudah terdaftar dan belum selesai",
                    HttpStatus.CONFLICT);
        }
    }
}
