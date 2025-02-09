package com.kevin.fastboard.controller.dto;

public class ComentarioResponse {
    private String comentario;
    private String email;

    public ComentarioResponse(String comentario, String email) {
        this.comentario = comentario;
        this.email = email;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
