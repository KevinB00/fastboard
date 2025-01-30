package com.kevin.fastboard.service.user;

import com.kevin.fastboard.controller.dto.RegisterRequest;
import com.kevin.fastboard.entity.UsuarioEntity;

public interface IUsuarioService {
    UsuarioEntity registrar(RegisterRequest registerRequest);

    UsuarioEntity login(String email, String contrasenya);

    String getNombreUsuarioById(Integer usuarioId);
}
