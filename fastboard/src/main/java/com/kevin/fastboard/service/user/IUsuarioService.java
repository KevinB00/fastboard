package com.kevin.fastboard.service.user;

import com.kevin.fastboard.entity.UsuarioEntity;

public interface IUsuarioService {
   UsuarioEntity registrar(String nuevoUsuario);
    UsuarioEntity login(String login);
}
