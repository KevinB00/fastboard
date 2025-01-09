package com.kevin.fastboard.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.entities.Usuario;
import com.kevin.fastboard.repository.UsuarioRepository;

@Service
public class UserService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void registrar(String entity) {
        Usuario user = new Usuario();
        user.setNombre(entity);
        user.setApellido(entity);
        user.setEmail(entity);
        user.setContrasenya(passwordEncoder.encode(entity));
        usuarioRepository.save(user);
    }
}
