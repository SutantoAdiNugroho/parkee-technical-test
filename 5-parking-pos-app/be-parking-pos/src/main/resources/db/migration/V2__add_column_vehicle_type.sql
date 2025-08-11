ALTER TABLE parking_ticket
ADD COLUMN vehicle_type VARCHAR(20) NOT NULL;

ALTER TABLE parking_ticket
ADD COLUMN payment_type VARCHAR(20) NULL;