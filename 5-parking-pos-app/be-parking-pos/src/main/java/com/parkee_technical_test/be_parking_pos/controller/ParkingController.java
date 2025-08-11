package com.parkee_technical_test.be_parking_pos.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkee_technical_test.be_parking_pos.dto.ApiResponse;
import com.parkee_technical_test.be_parking_pos.dto.CheckInRequest;
import com.parkee_technical_test.be_parking_pos.dto.CheckOutRequest;
import com.parkee_technical_test.be_parking_pos.exception.ConflictException;
import com.parkee_technical_test.be_parking_pos.exception.NotFoundException;
import com.parkee_technical_test.be_parking_pos.model.ParkingTicket;
import com.parkee_technical_test.be_parking_pos.service.ParkingService;

@RestController
@RequestMapping("/api/tickets")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @PostMapping("/check-in")
    public ResponseEntity<ApiResponse<ParkingTicket>> checkIn(@RequestBody CheckInRequest body) {
        Optional<ParkingTicket> newTicket = parkingService.checkIn(body);

        if (newTicket.isPresent()) {
            ApiResponse<ParkingTicket> response = new ApiResponse<>(HttpStatus.OK.value(), newTicket.get());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new ConflictException("Nomor plat " + body.getLicensePlate() + " sudah terdaftar dan belum selesai");
        }
    }

    @PostMapping("/check-out")
    public ResponseEntity<ApiResponse<ParkingTicket>> checkOut(@RequestBody CheckOutRequest body) {
        Optional<ParkingTicket> finishTicket = parkingService.checkOut(body);

        if (finishTicket.isPresent()) {
            ApiResponse<ParkingTicket> response = new ApiResponse<>(HttpStatus.OK.value(), finishTicket.get());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new NotFoundException("Nomor plat " + body.getLicensePlate() + " tidak ditemukan");
        }
    }

    @GetMapping("/{licensePlate}/status")
    public ResponseEntity<ApiResponse<ParkingTicket>> getTicketStatus(@PathVariable String licensePlate) {
        Optional<ParkingTicket> ticket = parkingService.getTicketStatus(licensePlate);

        if (ticket.isPresent()) {
            ApiResponse<ParkingTicket> response = new ApiResponse<>(HttpStatus.OK.value(), ticket.get());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new NotFoundException("Tiket untuk plat nomor " + licensePlate + " tidak ditemukan");
        }
    }
}
