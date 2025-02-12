package com.kevin.fastboard.controller.auth.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CreateProjectRequest {
    private String title;
    private String description;
    private LocalDate fechaFin;
}
