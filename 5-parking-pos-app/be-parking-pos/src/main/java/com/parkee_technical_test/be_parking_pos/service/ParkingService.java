package com.parkee_technical_test.be_parking_pos.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkee_technical_test.be_parking_pos.model.ParkingTicket;
import com.parkee_technical_test.be_parking_pos.model.ParkingTicketStatus;
import com.parkee_technical_test.be_parking_pos.repository.ParkingTicketRepository;

@Service
public class ParkingService {

    @Autowired
    private ParkingTicketRepository parkingTicketRepository;

    public Optional<ParkingTicket> checkIn(String licensePlate) {
        Optional<ParkingTicket> existingTicket = parkingTicketRepository.findByLicensePlateAndStatus(licensePlate,
                ParkingTicketStatus.parked);

        if (existingTicket.isPresent()) {
            return Optional.empty();
        }

        ParkingTicket newTicket = new ParkingTicket();
        newTicket.setLicensePlate(licensePlate);
        newTicket.setCheckInTime(LocalDateTime.now());
        newTicket.setStatus(ParkingTicketStatus.parked);

        return Optional.of(parkingTicketRepository.save(newTicket));
    }
}
