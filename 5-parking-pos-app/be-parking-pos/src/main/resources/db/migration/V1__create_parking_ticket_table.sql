CREATE TABLE IF NOT EXISTS parking_ticket (
    id UUID PRIMARY KEY NOT NULL,
    license_plate VARCHAR(255) NOT NULL,
    check_in_time TIMESTAMP NOT NULL,
    check_out_time TIMESTAMP,
    total_price DECIMAL(10, 2),
    status VARCHAR(50) NOT NULL
);