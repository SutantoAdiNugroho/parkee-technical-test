package com.parkee_technical_test.be_parking_pos.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkee_technical_test.be_parking_pos.dto.CheckInRequest;
import com.parkee_technical_test.be_parking_pos.dto.CheckOutRequest;
import com.parkee_technical_test.be_parking_pos.model.ParkingTicket;
import com.parkee_technical_test.be_parking_pos.model.ParkingTicketStatus;
import com.parkee_technical_test.be_parking_pos.repository.ParkingTicketRepository;

@Service
public class ParkingService {

    @Autowired
    private ParkingTicketRepository parkingTicketRepository;

    public Optional<ParkingTicket> checkIn(CheckInRequest request) {
        Optional<ParkingTicket> existingTicket = this.getTicketStatus(request.getLicensePlate());

        if (existingTicket.isPresent()) {
            return Optional.empty();
        }

        ParkingTicket newTicket = new ParkingTicket();
        newTicket.setLicensePlate(request.getLicensePlate());
        newTicket.setVehicleType(request.getVehicleType());
        newTicket.setCheckInTime(LocalDateTime.now());
        newTicket.setStatus(ParkingTicketStatus.parked);

        return Optional.of(parkingTicketRepository.save(newTicket));
    }

    public Optional<ParkingTicket> getTicketStatus(String licensePlate) {
        Optional<ParkingTicket> existingTicket = parkingTicketRepository.findByLicensePlateAndStatus(
                licensePlate, ParkingTicketStatus.parked);

        if (existingTicket.isEmpty()) {
            return Optional.empty();
        }

        ParkingTicket ticket = existingTicket.get();

        // get check-in time and current time
        LocalDateTime checkinTime = ticket.getCheckInTime();
        LocalDateTime currentTime = LocalDateTime.now();
        Duration duration = Duration.between(checkinTime, currentTime);

        long totalMinutes = duration.toMinutes();

        long totalHours;
        if (totalMinutes <= 59) {
            // 0 - 59 minutes is counted as 1 hour
            totalHours = 1;
        } else {
            // rounding to nearest hour
            totalHours = totalMinutes / 60;
            long remainingMinutes = totalMinutes % 60;

            // if remaining minutes more than 30 minutes, hour increases by 1
            // example:
            // 1 hour 10 minutes -> 1 hour
            // 1 hour 45 minutes -> 2 hours
            if (remainingMinutes > 30) {
                totalHours++;
            }
        }

        double totalPrice = totalHours * 3000.0;
        ticket.setTotalPrice(totalPrice);

        return Optional.of(ticket);
    }

    public Optional<ParkingTicket> checkOut(CheckOutRequest request) {
        Optional<ParkingTicket> existingTicket = this.getTicketStatus(request.getLicensePlate());
        if (existingTicket.isEmpty()) {
            return Optional.empty();
        }

        ParkingTicket ticket = existingTicket.get();
        LocalDateTime checkoutTime = LocalDateTime.now();

        ticket.setCheckOutTime(checkoutTime);
        ticket.setStatus(ParkingTicketStatus.paid);
        ticket.setPaymentType(request.getPaymentType());

        return Optional.of(parkingTicketRepository.save(ticket));
    }
}
