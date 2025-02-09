package com.kevin.fastboard.controller.dto;

import lombok.Data;

@Data
public class ComentarioRequest {
    private String comentario;
    private String email;
    private Integer tareaid;
}
