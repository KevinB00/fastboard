package com.kevin.fastboard.controller.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TareaRequest {
    private String nombre;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String[] etiquetas;
    private Integer idLista;
}
