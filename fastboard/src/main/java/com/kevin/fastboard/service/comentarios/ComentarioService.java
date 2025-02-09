package com.kevin.fastboard.service.comentarios;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.controller.dto.ComentarioResponse;
import com.kevin.fastboard.entity.ComentarioEntity;
import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.repository.ComentarioRepository;
import com.kevin.fastboard.repository.UsuarioRepository;

@Service
public class ComentarioService implements IComentarioService {

    @Autowired
    ComentarioRepository comentarioRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public ComentarioEntity createComentario(String comentario, String email, Integer tareaid) {
        try {
            UsuarioEntity user = usuarioRepository.findByEmail(email);
            ComentarioEntity nuevoComentario = new ComentarioEntity();
            nuevoComentario.setUsuarioid(user.getId());
            nuevoComentario.setTexto(comentario);
            nuevoComentario.setFecha_comentario(LocalDate.now());
            nuevoComentario.setTareaid(tareaid);
            return comentarioRepository.save(nuevoComentario);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<ComentarioResponse> getComentarios(Integer id) {
        try {
            List<ComentarioEntity> comentarios = comentarioRepository.findByTareaid(id);
            if (comentarios.isEmpty()) {
                return null;
            } else {
                List<ComentarioResponse> comentariosResponse = comentarios.stream().map(comentario -> {
                    ComentarioResponse comentarioResponse = new ComentarioResponse(
                            comentario.getTexto(),
                            usuarioRepository.findById(comentario.getUsuarioid()).get().getEmail());
                    return comentarioResponse;
                }).toList();
                return comentariosResponse;
            }
        } catch (Exception e) {
            return null;
        }
    }
}
