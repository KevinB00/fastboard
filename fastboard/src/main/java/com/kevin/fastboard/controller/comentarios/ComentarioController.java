package com.kevin.fastboard.controller.comentarios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kevin.fastboard.controller.dto.ComentarioRequest;
import com.kevin.fastboard.controller.dto.ComentarioResponse;
import com.kevin.fastboard.entity.ComentarioEntity;
import com.kevin.fastboard.service.comentarios.IComentarioService;

import utils.JwtUtils;

@RestController
@RequestMapping("/comentarios")
public class ComentarioController {

    @Autowired
    private IComentarioService comentarioService;

    @Autowired
    private JwtUtils jwtUtil;


    @PostMapping("/create")
    public ResponseEntity<ComentarioEntity> createComentario(@RequestHeader("Authorization") String token, @RequestBody ComentarioRequest comentario) throws Exception {

        ComentarioEntity nuevoComentario = comentarioService.createComentario(comentario.getComentario(), comentario.getEmail(), comentario.getTareaid());

        if (nuevoComentario == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(nuevoComentario);
        }
    }

    @GetMapping("/tarea/{id}")
    public ResponseEntity<List<ComentarioResponse>> getComentarios(@RequestHeader("Authorization") String token, @PathVariable Integer id) throws Exception {
        List<ComentarioResponse> comentarios = comentarioService.getComentarios(id);
        if (comentarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(comentarios);
        }
    }
}
