package com.kevin.fastboard.service.comentarios;

import java.util.List;

import com.kevin.fastboard.controller.dto.ComentarioResponse;
import com.kevin.fastboard.entity.ComentarioEntity;

public interface IComentarioService {

    ComentarioEntity createComentario(String comentario, String email, Integer tareaid);

    List<ComentarioResponse> getComentarios(Integer id);

}
