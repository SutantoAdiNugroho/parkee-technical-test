package com.parkee_technical_test.be_parking_pos.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int status;
    private T data;
}
