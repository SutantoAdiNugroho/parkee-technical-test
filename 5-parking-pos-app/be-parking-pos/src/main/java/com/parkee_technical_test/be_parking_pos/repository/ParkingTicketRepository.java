package com.parkee_technical_test.be_parking_pos.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parkee_technical_test.be_parking_pos.model.ParkingTicket;
import com.parkee_technical_test.be_parking_pos.model.ParkingTicketStatus;

@Repository
public interface ParkingTicketRepository extends JpaRepository<ParkingTicket, UUID> {

    Optional<ParkingTicket> findByLicensePlateAndStatus(String licensePlate, ParkingTicketStatus status);
}
