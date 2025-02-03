package com.kevin.fastboard.controller.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PasoRequest {

    private String nombre;
    private LocalDate fecha_prevista;
    private Integer tareaid;
}
