package com.kevin.fastboard.service.user;

import com.kevin.fastboard.entities.Usuario;

public interface IUsuarioService {
   Usuario registrar(String nuevoUsuario);
    Usuario login(String login);
}
