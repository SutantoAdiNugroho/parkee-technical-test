package com.parkee_technical_test.be_parking_pos.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApiErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String path;
}